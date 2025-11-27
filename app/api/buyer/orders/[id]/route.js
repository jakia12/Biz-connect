/**
 * Buyer Single Order API Route
 * Fetch details of a single order
 */

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import { getServerSession } from 'next-auth';

/**
 * GET /api/buyer/orders/[id]
 * Fetch a single order by ID
 */
export async function GET(request, { params }) {
  try {
    // Unwrap the params Promise
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json(
        { error: 'Unauthorized. Buyer access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const order = await Order.findOne({
      _id: id,
      buyerId: session.user.id,
    })
      .populate('sellerId', 'name email phone')
      .populate('items.productId', 'title')
      .lean();

    if (!order) {
      return Response.json(
        { error: 'Order not found or access denied' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return Response.json(
      { error: 'Failed to fetch order', details: error.message },
      { status: 500 }
    );
  }
}
