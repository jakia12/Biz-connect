/**
 * Orders API Route
 * Create new orders (buyer placing orders)
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import Product from '@/backend/shared/models/Product';
import { getServerSession } from 'next-auth';

/**
 * GET /api/orders
 * Fetch orders for the current user (buyer or seller)
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    let query = {};
    if (session.user.role === 'seller') {
      query = { sellerId: session.user.id };
    } else {
      query = { buyerId: session.user.id };
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('items.productId', 'title image')
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email')
      .lean();

    const total = await Order.countDocuments(query);

    return Response.json({
      success: true,
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return Response.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json(
        { error: 'Unauthorized. Buyer access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { items, shippingAddress, paymentMethod } = body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return Response.json(
        { error: 'Order items are required' },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return Response.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    // Process items and calculate totals
    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return Response.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.status !== 'active') {
        return Response.json(
          { error: `Product "${product.title}" is not available` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return Response.json(
          { error: `Insufficient stock for "${product.title}"` },
          { status: 400 }
        );
      }

      if (!product.sellerId) {
        return Response.json(
          { error: `Product "${product.title}" has no seller assigned` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      processedItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        sellerId: product.sellerId, // Kept for reference, though not in OrderItemSchema
      });

      // Update product stock
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity, salesCount: item.quantity },
      });
    }

    // Calculate shipping and tax (simplified for now)
    const shippingCost = 50; // Flat rate
    const tax = subtotal * 0.05; // 5% tax
    const totalAmount = subtotal + shippingCost + tax;

    if (isNaN(totalAmount)) {
      return Response.json(
        { error: 'Invalid total amount calculation' },
        { status: 400 }
      );
    }

    // Get seller ID (assuming single seller per order for now)
    // TODO: Handle multi-vendor orders (split orders)
    const sellerId = processedItems[0].sellerId;

    if (!sellerId) {
       return Response.json(
        { error: 'Could not determine seller for this order' },
        { status: 400 }
      );
    }

    console.log('[Order API] Creating order with:', {
      buyerId: session.user.id,
      sellerId,
      itemCount: processedItems.length,
      totalAmount
    });

    // Create order
    const order = await Order.create({
      buyerId: session.user.id,
      sellerId,
      items: processedItems,
      subtotal,
      shippingCost,
      tax,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: 'pending',
      status: 'pending',
    });

    // Notify seller of new order
    const { createOrderNotification } = await import('@/lib/notifications');
    await createOrderNotification(sellerId, order._id, order.orderId);

    return Response.json(
      {
        success: true,
        message: 'Order placed successfully',
        order: {
          orderId: order.orderId,
          totalAmount: order.totalAmount,
          _id: order._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return Response.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}
