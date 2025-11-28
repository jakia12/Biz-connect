/**
 * Sellers API Route
 * Fetch verified sellers with filtering and search
 */

import connectDB from '@/backend/shared/config/database';
import SellerProfile from '@/backend/shared/models/SellerProfile';
import User from '@/backend/shared/models/User';

/**
 * GET /api/sellers
 * Fetch all verified sellers with optional filtering
 */
export async function GET(request) {
  try {
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const type = searchParams.get('type'); // 'service' or 'product'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // If type filter is specified, query SellerProfile first
    let sellerUserIds = null;
    if (type) {
      const sellerProfiles = await SellerProfile.find({
        businessType: { $in: [type, 'both'] } // Include sellers who do both
      }).select('userId').lean();
      
      sellerUserIds = sellerProfiles.map(profile => profile.userId);
    }

    // Build query - fetch sellers
    const query = { 
      role: 'seller',
      isVerified: true
    };

    // Add type filter if specified
    if (sellerUserIds) {
      query._id = { $in: sellerUserIds };
    }

    // Add search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
        { businessDescription: { $regex: search, $options: 'i' } }
      ];
    }

    // Add category filter
    if (category && category !== 'All') {
      query.businessCategory = category;
    }

    // Fetch sellers
    const sellers = await User.find(query)
      .select('name email businessName businessCategory businessDescription businessAddress profileImage rating reviewCount totalOrders createdAt')
      .sort({ rating: -1, reviewCount: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalSellers = await User.countDocuments(query);

    // Get unique categories for filtering
    const categories = await User.distinct('businessCategory', { 
      role: 'seller'
    });

    return Response.json({
      success: true,
      sellers,
      categories,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalSellers / limit),
        totalSellers,
        hasMore: skip + sellers.length < totalSellers,
      },
    });
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return Response.json(
      { error: 'Failed to fetch sellers', details: error.message },
      { status: 500 }
    );
  }
}
