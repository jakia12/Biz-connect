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

    if (search) {
      // Text search on title, description, and tags
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Fetch products with seller info
    const products = await Product.find(query)
      .populate('sellerId', 'name verified')
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .lean();

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
