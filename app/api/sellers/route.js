/**
 * Sellers API Route
 * Fetch verified sellers with filtering and search
 */

import connectDB from '@/backend/shared/config/database';
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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Build query - fetch all sellers (verification filter removed for now)
    const query = { 
      role: 'seller'
    };

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
