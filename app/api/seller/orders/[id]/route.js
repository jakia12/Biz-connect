/**
 * Seller Single Order API Routes
 * Fetch and update individual orders
 */

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import { createOrderStatusNotification } from '@/lib/notifications';
import { getServerSession } from 'next-auth';

/**
 * GET /api/seller/orders/[id]
 * Fetch a single order by ID
 */
export async function GET(request, { params }) {
  try {
    // Unwrap the params Promise
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const order = await Order.findOne({
      _id: id,
      sellerId: session.user.id,
    })
      .populate('buyerId', 'name email phone')
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

/**
 * PATCH /api/seller/orders/[id]
 * Update order status and tracking info
 */
export async function PATCH(request, { params }) {
  try {
    // Unwrap the params Promise
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { status, trackingNumber, estimatedDelivery, notes } = body;

    // Find order and verify ownership
    const order = await Order.findOne({
      _id: id,
      sellerId: session.user.id,
    });

    if (!order) {
      return Response.json(
        { error: 'Order not found or access denied' },
        { status: 404 }
      );
    }

    // Update allowed fields
    if (status) {
      order.status = status;
      
      // Auto-update delivery timestamp
      if (status === 'delivered') {
        order.deliveredAt = new Date();
      }

      // Notify buyer of status change
      await createOrderStatusNotification(
        order.buyerId,
        order._id,
        order.orderId,
        status
      );
    }
    
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (estimatedDelivery) order.estimatedDelivery = new Date(estimatedDelivery);
    if (notes) order.notes = notes;

    await order.save();

    return Response.json({
      success: true,
      message: 'Order updated successfully',
      order,
    });
  } catch (error) {
    console.error('Error updating order:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return Response.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to update order', details: error.message },
      { status: 500 }
    );
  }
}
