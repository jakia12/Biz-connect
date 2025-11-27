/**
 * Buyer Orders API Routes
 * Handles fetching buyer's order history
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import { getServerSession } from 'next-auth';

/**
 * GET /api/buyer/orders
 * Fetch all orders for the logged-in buyer
 */
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json(
        { error: 'Unauthorized. Buyer access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query = { buyerId: session.user.id };
    if (status) {
      query.status = status;
    }

    // Fetch orders with seller info
    const orders = await Order.find(query)
      .populate('sellerId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalOrders = await Order.countDocuments(query);

    return Response.json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasMore: skip + orders.length < totalOrders,
      },
    });
  } catch (error) {
    console.error('Error fetching buyer orders:', error);
    return Response.json(
      { error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}
