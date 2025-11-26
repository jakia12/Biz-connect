/**
 * Orders API Route
 * Create new orders (buyer placing orders)
 */

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import Product from '@/backend/shared/models/Product';
import { getServerSession } from 'next-auth';

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

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      processedItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        sellerId: product.sellerId,
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

    // Get seller ID (assuming single seller per order for now)
    const sellerId = processedItems[0].sellerId;

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
      paymentMethod: paymentMethod || 'cash_on_delivery',
      paymentStatus: 'pending',
      status: 'pending',
    });

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
