import connectDB from '@/backend/shared/config/database';
import Review from '@/backend/shared/models/Review';

/**
 * GET /api/services/[id]/reviews
 * Fetch reviews for a specific service
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const skip = (page - 1) * limit;

    // Find reviews for this service (using productId field for serviceId)
    const reviews = await Review.find({ productId: id })
      .populate('buyerId', 'name profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalReviews = await Review.countDocuments({ productId: id });

    // Calculate rating stats
    const stats = await Review.aggregate([
      { $match: { productId: new (await import('mongoose')).default.Types.ObjectId(id) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          stars: {
            $push: '$rating'
          }
        }
      }
    ]);

    const ratingDistribution = {
      5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    };

    if (stats.length > 0) {
      stats[0].stars.forEach(rating => {
        const rounded = Math.round(rating);
        if (ratingDistribution[rounded] !== undefined) {
          ratingDistribution[rounded]++;
        }
      });
    }

    return Response.json({
      success: true,
      reviews: reviews.map(review => ({
        ...review,
        buyer: review.buyerId // Map buyerId to buyer for frontend consistency
      })),
      stats: {
        average: stats[0]?.avgRating || 0,
        total: totalReviews,
        distribution: ratingDistribution
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalReviews / limit),
        hasMore: skip + reviews.length < totalReviews
      }
    });

  } catch (error) {
    console.error('Error fetching service reviews:', error);
    return Response.json(
      { error: 'Failed to fetch reviews', details: error.message },
      { status: 500 }
    );
  }
}
