/**
 * Seller Dashboard API
 * Aggregated stats for the seller dashboard
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Order from '@/backend/shared/models/Order';
import Product from '@/backend/shared/models/Product';
import User from '@/backend/shared/models/User';
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
    const [
      todayOrdersCount,
      weeklyRevenueResult,
      totalProducts,
      sellerProfile
    ] = await Promise.all([
      // 1. Today's Orders
      Order.countDocuments({
        sellerId,
        createdAt: { $gte: today }
      }),

      // 2. Weekly Revenue
      Order.aggregate([
        {
          $match: {
            sellerId: { $eq: new User()._id.constructor(sellerId) }, // Ensure ObjectId
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
        sellerId,
        status: 'active'
      }),

      // 4. Seller Profile (for Rating & Reviews)
      User.findById(sellerId).select('rating reviewCount')
    ]);

    const weeklyRevenue = weeklyRevenueResult[0]?.total || 0;

    return Response.json({
      success: true,
      stats: {
        todayOrders: todayOrdersCount,
        weeklyRevenue,
        totalProducts,
        avgRating: sellerProfile?.rating || 0,
        totalReviews: sellerProfile?.reviewCount || 0
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
