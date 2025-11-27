/**
 * Seller Reviews API Route
 * Fetch reviews for seller's products
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Review from '@/backend/shared/models/Review';
import { getServerSession } from 'next-auth';

/**
 * GET /api/seller/reviews
 * Fetch all reviews for the logged-in seller's products
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const rating = searchParams.get('rating'); // Filter by rating
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query = { sellerId: session.user.id };
    if (rating) {
      query.rating = parseInt(rating);
    }

    // Fetch reviews with buyer and product info
    const reviews = await Review.find(query)
      .populate('buyerId', 'name image')
      .populate('productId', 'title images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalReviews = await Review.countDocuments(query);

    // Calculate average rating
    const ratingStats = await Review.aggregate([
      { $match: { sellerId: session.user.id } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingBreakdown: {
            $push: '$rating',
          },
        },
      },
    ]);

    // Calculate rating distribution
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (ratingStats.length > 0) {
      ratingStats[0].ratingBreakdown.forEach((r) => {
        ratingDistribution[r] = (ratingDistribution[r] || 0) + 1;
      });
    }

    return Response.json({
      success: true,
      reviews,
      stats: {
        averageRating: ratingStats[0]?.averageRating?.toFixed(1) || 0,
        totalReviews: ratingStats[0]?.totalReviews || 0,
        ratingDistribution,
      },
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
