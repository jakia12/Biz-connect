/**
 * Buyer Reviews API Route
 * Submit product reviews
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import Product from '@/backend/shared/models/Product';
import Review from '@/backend/shared/models/Review';
import { getServerSession } from 'next-auth';

/**
 * POST /api/buyer/reviews
 * Submit a review for a purchased product
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
    const { orderId, productId, rating, comment, images } = body;

    // Validate required fields
    if (!orderId || !productId || !rating || !comment) {
      return Response.json(
        { error: 'Order ID, Product ID, rating, and comment are required' },
        { status: 400 }
      );
    }

    // Verify order exists and belongs to buyer
    const order = await Order.findOne({
      _id: orderId,
      buyerId: session.user.id,
    });

    if (!order) {
      return Response.json(
        { error: 'Order not found or access denied' },
        { status: 404 }
      );
    }

    // Verify order is delivered
    if (order.status !== 'delivered') {
      return Response.json(
        { error: 'Can only review delivered orders' },
        { status: 400 }
      );
    }

    // Verify product is in the order
    const productInOrder = order.items.some(
      item => item.productId.toString() === productId
    );

    if (!productInOrder) {
      return Response.json(
        { error: 'Product not found in this order' },
        { status: 400 }
      );
    }

    // Get product to find seller ID
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if review already exists for this product in this order
    const existingReview = await Review.findOne({
      orderId,
      productId,
      buyerId: session.user.id,
    });

    if (existingReview) {
      return Response.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }

    // Create review
    const review = await Review.create({
      orderId,
      productId,
      buyerId: session.user.id,
      sellerId: product.sellerId,
      rating,
      comment,
      images: images || [],
      isVerifiedPurchase: true,
    });

    // Update seller's rating and review count
    const User = (await import('@/backend/shared/models/User')).default;
    
    const stats = await Review.aggregate([
      { $match: { sellerId: product.sellerId } },
      {
        $group: {
          _id: '$sellerId',
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      await User.findByIdAndUpdate(product.sellerId, {
        rating: Math.round(stats[0].avgRating * 10) / 10, // Round to 1 decimal
        reviewCount: stats[0].totalReviews,
      });
    }

    return Response.json(
      {
        success: true,
        message: 'Review submitted successfully',
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting review:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return Response.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Handle duplicate review error
    if (error.code === 11000) {
      return Response.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to submit review', details: error.message },
      { status: 500 }
    );
  }
}
