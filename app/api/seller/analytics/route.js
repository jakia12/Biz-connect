/**
 * Seller Analytics API Route
 * Fetch analytics and statistics for seller dashboard
 */


import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import Product from '@/backend/shared/models/Product';
import Review from '@/backend/shared/models/Review';
import { getServerSession } from 'next-auth';

/**
 * GET /api/seller/analytics
 * Fetch comprehensive analytics for the logged-in seller
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

    const sellerId = session.user.id;

    // Get date range (default: last 30 days)
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Convert sellerId to ObjectId for MongoDB queries
    const mongoose = require('mongoose');
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

    // Product Statistics
    const productStats = await Product.aggregate([
      { $match: { sellerId: sellerObjectId } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          activeProducts: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] },
          },
          totalViews: { $sum: '$views' },
          totalSales: { $sum: '$salesCount' },
        },
      },
    ]);

    // Order Statistics
    const orderStats = await Order.aggregate([
      { $match: { sellerId: sellerObjectId, createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
          },
          confirmedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] },
          },
          shippedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'shipped'] }, 1, 0] },
          },
          deliveredOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] },
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] },
          },
        },
      },
    ]);

    // Revenue by Date (for charts)
    const revenueByDate = await Order.aggregate([
      { $match: { sellerId: sellerObjectId, createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Top Selling Products
    const topProducts = await Product.find({ sellerId: sellerObjectId })
      .sort({ salesCount: -1 })
      .limit(5)
      .select('title salesCount price images')
      .lean();

    // Review Statistics
    const reviewStats = await Review.aggregate([
      { $match: { sellerId: sellerObjectId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    // Recent Orders
    const recentOrders = await Order.find({ sellerId: sellerObjectId })
      .populate('buyerId', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderId totalAmount status createdAt')
      .lean();

    return Response.json({
      success: true,
      analytics: {
        products: productStats[0] || {
          totalProducts: 0,
          activeProducts: 0,
          totalViews: 0,
          totalSales: 0,
        },
        orders: orderStats[0] || {
          totalOrders: 0,
          totalRevenue: 0,
          pendingOrders: 0,
          confirmedOrders: 0,
          shippedOrders: 0,
          deliveredOrders: 0,
          cancelledOrders: 0,
        },
        reviews: reviewStats[0] || {
          averageRating: 0,
          totalReviews: 0,
        },
        revenueByDate,
        topProducts,
        recentOrders,
        dateRange: {
          from: startDate,
          to: new Date(),
          days,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching seller analytics:', error);
    return Response.json(
      { error: 'Failed to fetch analytics', details: error.message },
      { status: 500 }
    );
  }
}
