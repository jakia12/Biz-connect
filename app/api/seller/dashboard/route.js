/**
 * Seller Dashboard API
 * Aggregated stats for the seller dashboard
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import Product from '@/backend/shared/models/Product';
import Review from '@/backend/shared/models/Review';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    // Parallelize queries for performance
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

    const [
      todayOrdersCount,
      weeklyRevenueResult,
      totalProducts,
      reviewStatsResult
    ] = await Promise.all([
      // 1. Today's Orders
      Order.countDocuments({
        sellerId: sellerObjectId,
        createdAt: { $gte: today }
      }),

      // 2. Weekly Revenue
      Order.aggregate([
        {
          $match: {
            sellerId: sellerObjectId,
            createdAt: { $gte: lastWeek },
            status: { $nin: ['cancelled', 'refunded'] } // Exclude cancelled/refunded
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]),

      // 3. Total Active Products
      Product.countDocuments({
        sellerId: sellerObjectId,
        status: 'active'
      }),

      // 4. Review Stats (Calculate on-the-fly)
      Review.aggregate([
        { $match: { sellerId: sellerObjectId } },
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$rating' },
            totalReviews: { $sum: 1 }
          }
        }
      ])
    ]);

    const weeklyRevenue = weeklyRevenueResult[0]?.total || 0;
    const reviewStats = reviewStatsResult[0] || { avgRating: 0, totalReviews: 0 };

    return Response.json({
      success: true,
      stats: {
        todayOrders: todayOrdersCount,
        weeklyRevenue,
        totalProducts,
        avgRating: Math.round((reviewStats.avgRating || 0) * 10) / 10, // Round to 1 decimal
        totalReviews: reviewStats.totalReviews || 0
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return Response.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
