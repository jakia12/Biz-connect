/**
 * Seller Orders API Routes
 * Fetch orders for seller's products
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import { getServerSession } from 'next-auth';

/**
 * GET /api/seller/orders
 * Fetch all orders for the logged-in seller
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
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query = { sellerId: session.user.id };
    if (status) {
      query.status = status;
    }

    // Fetch orders with buyer info
    const orders = await Order.find(query)
      .populate('buyerId', 'name email phone')
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
    console.error('Error fetching seller orders:', error);
    return Response.json(
      { error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}
