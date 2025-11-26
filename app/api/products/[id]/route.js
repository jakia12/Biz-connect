/**
 * Single Product API Route
 * Get details of a single product (public access)
 */

import connectDB from '@/backend/shared/config/database';
import Product from '@/backend/shared/models/Product';
import Review from '@/backend/shared/models/Review';

/**
 * GET /api/products/[id]
 * Fetch a single product by ID with reviews
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    // Fetch product with seller info
    const product = await Product.findById(params.id)
      .populate('sellerId', 'name email verified phone')
      .lean();

    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await Product.findByIdAndUpdate(params.id, { $inc: { views: 1 } });

    // Fetch reviews for this product
    const reviews = await Review.find({ productId: params.id })
      .populate('buyerId', 'name image')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Calculate review statistics
    const reviewStats = await Review.aggregate([
      { $match: { productId: product._id } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          5: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } },
          4: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
          3: { $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] } },
          2: { $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] } },
          1: { $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] } },
        },
      },
    ]);

    const stats = reviewStats[0] || {
      averageRating: 0,
      totalReviews: 0,
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    // Get related products (same category, excluding current)
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      status: 'active',
    })
      .populate('sellerId', 'name verified')
      .limit(4)
      .lean();

    return Response.json({
      success: true,
      product: {
        ...product,
        views: (product.views || 0) + 1, // Return incremented view count
      },
      reviews,
      reviewStats: {
        averageRating: stats.averageRating ? parseFloat(stats.averageRating.toFixed(1)) : 0,
        totalReviews: stats.totalReviews,
        distribution: {
          5: stats[5] || 0,
          4: stats[4] || 0,
          3: stats[3] || 0,
          2: stats[2] || 0,
          1: stats[1] || 0,
        },
      },
      relatedProducts,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json(
      { error: 'Failed to fetch product', details: error.message },
      { status: 500 }
    );
  }
}
