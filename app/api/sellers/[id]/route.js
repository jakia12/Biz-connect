/**
 * Seller API Route - Individual Seller
 * Fetch single seller details
 */

import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';

/**
 * GET /api/sellers/[id]
 * Fetch single seller details
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    // In Next.js 15, params is a Promise that needs to be awaited
    const { id } = await params;
    
    console.log('Fetching seller with ID:', id);
    console.log('ID type:', typeof id);
    console.log('ID length:', id?.length);

    // Validate ObjectId format
    if (!id || id.length !== 24) {
      console.error('Invalid ObjectId format:', id);
      return Response.json(
        { error: 'Invalid seller ID format' },
        { status: 400 }
      );
    }

    // Parallelize queries
    const mongoose = require('mongoose');
    const sellerObjectId = new mongoose.Types.ObjectId(id);

    const [user, sellerProfile, reviewStats] = await Promise.all([
      // 1. Fetch User
      User.findOne({ _id: id, role: 'seller' })
        .select('name email profileImage createdAt')
        .lean(),

      // 2. Fetch Seller Profile
      (async () => {
        const SellerProfile = (await import('@/backend/shared/models/SellerProfile')).default;
        return SellerProfile.findOne({ userId: id }).lean();
      })(),

      // 3. Aggregate Reviews
      (async () => {
        const Review = (await import('@/backend/shared/models/Review')).default;
        const stats = await Review.aggregate([
          { $match: { sellerId: sellerObjectId } },
          {
            $group: {
              _id: null,
              avgRating: { $avg: '$rating' },
              totalReviews: { $sum: 1 }
            }
          }
        ]);
        return stats[0] || { avgRating: 0, totalReviews: 0 };
      })()
    ]);

    if (!user) {
      return Response.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    // Merge data
    const sellerData = {
      ...user,
      // Prefer SellerProfile data, fallback to User data (if any legacy fields existed)
      businessName: sellerProfile?.businessName || user.name,
      businessCategory: sellerProfile?.category,
      businessDescription: sellerProfile?.description,
      businessAddress: sellerProfile?.location || sellerProfile?.district,
      // Use dynamic stats
      rating: Math.round(reviewStats.avgRating * 10) / 10,
      reviewCount: reviewStats.totalReviews,
      // Include other profile fields
      businessType: sellerProfile?.businessType,
      businessHours: sellerProfile?.businessHours,
      taxId: sellerProfile?.taxId,
      website: sellerProfile?.website,
      isVerified: sellerProfile?.verified || false,
    };

    return Response.json({
      success: true,
      seller: sellerData,
    });
  } catch (error) {
    console.error('Error fetching seller:', error);
    return Response.json(
      { error: 'Failed to fetch seller', details: error.message },
      { status: 500 }
    );
  }
}
