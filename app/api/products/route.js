/**
 * Public Products API Route
 * Browse all products (public access, no authentication required)
 */

import connectDB from '@/backend/shared/config/database';
import Product from '@/backend/shared/models/Product';

/**
 * GET /api/products
 * Fetch all active products with filtering, sorting, and pagination
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Filters
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sellerId = searchParams.get('sellerId'); // Add seller filter
    const inStock = searchParams.get('inStock');
    const maxMoq = searchParams.get('maxMoq');
    
    // Sorting
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') === 'asc' ? 1 : -1;

    // Build query - only show active products
    const query = { status: 'active' };

    if (category) {
      query.category = category;
    }

    if (subcategory) {
      query.subcategory = subcategory;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }



    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    if (maxMoq) {
      query.minOrderQuantity = { $lte: parseInt(maxMoq) };
    }

    if (search) {
      // Text search on title, description, and tags
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Filter by seller if provided
    if (sellerId) {
      query.sellerId = sellerId;
    }

    // Fetch products with seller info
    const products = await Product.find(query)
      .populate('sellerId', 'name verified')
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .lean();

    // Fetch review stats for these products
    const productIds = products.map(p => p._id);
    const Review = (await import('@/backend/shared/models/Review')).default;
    
    const reviewStats = await Review.aggregate([
      { $match: { productId: { $in: productIds } } },
      {
        $group: {
          _id: '$productId',
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    // Map stats to products
    const statsMap = {};
    reviewStats.forEach(stat => {
      statsMap[stat._id.toString()] = {
        rating: Math.round(stat.avgRating * 10) / 10,
        reviews: stat.totalReviews
      };
    });

    // Attach stats to products
    products.forEach(product => {
      const stats = statsMap[product._id.toString()] || { rating: 0, reviews: 0 };
      product.rating = stats.rating;
      product.reviews = stats.reviews;
    });

    const totalProducts = await Product.countDocuments(query);

    // Get unique categories for filters (optional metadata)
    const categories = await Product.distinct('category', { status: 'active' });

    return Response.json({
      success: true,
      products,
      categories,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        hasMore: skip + products.length < totalProducts,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}
