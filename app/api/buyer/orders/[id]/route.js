/**
 * Buyer Single Order API Route
 * Fetch details of a single order
 */

import { authOptions } from '@/backend/shared/config/auth';
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

import { createOrderCancellationNotification, createOrderStatusNotification } from '@/lib/notifications';

/**
 * PUT /api/buyer/orders/[id]
 * Cancel an order
 */
export async function PUT(request, { params }) {
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

    const { reason } = await request.json();

    await connectDB();

    const order = await Order.findOne({
      _id: id,
      buyerId: session.user.id,
    });

    if (!order) {
      return Response.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.status !== 'pending') {
      return Response.json(
        { error: 'Only pending orders can be cancelled' },
        { status: 400 }
      );
    }

    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.cancellationReason = reason || 'Cancelled by buyer';
    
    await order.save();

    // Send notifications
    // 1. Notify Buyer
    await createOrderStatusNotification(
      session.user.id,
      order._id,
      order.orderId,
      'cancelled'
    );

    // 2. Notify Seller
    await createOrderCancellationNotification(
      order.sellerId,
      order._id,
      order.orderId,
      order.cancellationReason
    );

    return Response.json({
      success: true,
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return Response.json(
      { error: 'Failed to cancel order', details: error.message },
      { status: 500 }
    );
  }
}
