/**
 * Public Seller Reviews API Route
 * Fetch reviews for a specific seller (public access)
 */

import connectDB from '@/backend/shared/config/database';
import Review from '@/backend/shared/models/Review';

/**
 * GET /api/sellers/[id]/reviews
 * Fetch reviews for a specific seller
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    
    // Validate ObjectId format
    if (!id || id.length !== 24) {
      return Response.json(
        { error: 'Invalid seller ID format' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query = { sellerId: id };

    // Fetch reviews with buyer and product info
    const reviews = await Review.find(query)
      .populate('buyerId', 'name image')
      .populate('productId', 'title images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalReviews = await Review.countDocuments(query);

    return Response.json({
      success: true,
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews,
        hasMore: skip + reviews.length < totalReviews,
      },
    });
  } catch (error) {
    console.error('Error fetching seller reviews:', error);
    return Response.json(
      { error: 'Failed to fetch reviews', details: error.message },
      { status: 500 }
    );
  }
}
