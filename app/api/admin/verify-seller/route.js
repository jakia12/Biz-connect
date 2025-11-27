/**
 * Admin API - Verify Seller
 * Temporarily allows verifying sellers (should be protected in production)
 */

import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';

/**
 * POST /api/admin/verify-seller
 * Verify a seller by email
 */
export async function POST(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return Response.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find and update the seller
    const seller = await User.findOneAndUpdate(
      { email, role: 'seller' },
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!seller) {
      return Response.json(
        { error: 'Seller not found with this email' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: `Seller ${seller.name} has been verified`,
      seller: {
        name: seller.name,
        email: seller.email,
        isVerified: seller.isVerified,
      },
    });
  } catch (error) {
    console.error('Error verifying seller:', error);
    return Response.json(
      { error: 'Failed to verify seller', details: error.message },
      { status: 500 }
    );
  }
}
