/**
 * Cart API Routes
 * Manage shopping cart items
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Cart from '@/backend/shared/models/Cart';
import Product from '@/backend/shared/models/Product';
import { getServerSession } from 'next-auth';

/**
 * GET /api/cart
 * Fetch user's cart
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    let cart = await Cart.findOne({ userId: session.user.id })
      .populate('items.productId', 'title price images stock status')
      .lean();

    if (!cart) {
      // Create empty cart if doesn't exist
      cart = await Cart.create({ userId: session.user.id, items: [] });
    }

    // Filter out products that no longer exist or are inactive
    const validItems = cart.items.filter(
      item => item.productId && item.productId.status === 'active'
    );

    return Response.json({
      success: true,
      cart: {
        ...cart,
        items: validItems,
        total: validItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: validItems.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return Response.json(
      { error: 'Failed to fetch cart', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cart
 * Add item to cart
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return Response.json({ error: 'Product ID required' }, { status: 400 });
    }

    // Verify product exists and is active
    const product = await Product.findById(productId);
    if (!product || product.status !== 'active') {
      return Response.json({ error: 'Product not available' }, { status: 404 });
    }

    if (product.stock < quantity) {
      return Response.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: session.user.id });
    if (!cart) {
      cart = new Cart({ userId: session.user.id, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      if (existingItem.quantity > product.stock) {
        return Response.json({ error: 'Quantity exceeds stock' }, { status: 400 });
      }
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();

    // Populate and return
    cart = await Cart.findById(cart._id)
      .populate('items.productId', 'title price images stock')
      .lean();

    return Response.json({
      success: true,
      message: 'Added to cart',
      cart,
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return Response.json(
      { error: 'Failed to add to cart', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/cart
 * Update cart item quantity
 */
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { productId, quantity } = await request.json();

    if (!productId || !quantity) {
      return Response.json(
        { error: 'Product ID and quantity required' },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId: session.user.id });
    if (!cart) {
      return Response.json({ error: 'Cart not found' }, { status: 404 });
    }

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (!item) {
      return Response.json({ error: 'Item not in cart' }, { status: 404 });
    }

    // Verify stock
    const product = await Product.findById(productId);
    if (quantity > product.stock) {
      return Response.json({ error: 'Quantity exceeds stock' }, { status: 400 });
    }

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'title price images stock')
      .lean();

    return Response.json({
      success: true,
      message: 'Cart updated',
      cart: updatedCart,
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    return Response.json(
      { error: 'Failed to update cart', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cart
 * Remove item from cart or clear cart
 */
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    const cart = await Cart.findOne({ userId: session.user.id });
    if (!cart) {
      return Response.json({ error: 'Cart not found' }, { status: 404 });
    }

    if (productId) {
      // Remove specific item
      cart.items = cart.items.filter(
        item => item.productId.toString() !== productId
      );
    } else {
      // Clear entire cart
      cart.items = [];
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'title price images stock')
      .lean();

    return Response.json({
      success: true,
      message: productId ? 'Item removed' : 'Cart cleared',
      cart: updatedCart,
    });
  } catch (error) {
    console.error('Error deleting from cart:', error);
    return Response.json(
      { error: 'Failed to delete from cart', details: error.message },
      { status: 500 }
    );
  }
}
