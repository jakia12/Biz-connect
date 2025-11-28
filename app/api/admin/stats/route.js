import connectDB from '@/backend/shared/config/database';
import SellerProfile from '@/backend/shared/models/SellerProfile';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get users by role
    const buyersCount = await User.countDocuments({ role: 'buyer' });
    const sellersCount = await User.countDocuments({ role: 'seller' });
    
    // Get pending verifications
    const pendingVerifications = await SellerProfile.countDocuments({ verificationStatus: 'pending' });
    
    // Get total verified sellers
    const verifiedSellers = await SellerProfile.countDocuments({ verificationStatus: 'approved' });

    // Mock order stats (since Order model might not be fully set up or populated yet)
    // In a real app, you would fetch this from the Order model
    const totalOrders = 0; 
    const totalRevenue = 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        buyersCount,
        sellersCount,
        pendingVerifications,
        verifiedSellers,
        totalOrders,
        totalRevenue
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
