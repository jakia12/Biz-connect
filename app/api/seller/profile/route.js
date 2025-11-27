/**
 * Seller Profile API Routes
 * Get and update seller profile information
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';
import { getServerSession } from 'next-auth';

/**
 * GET /api/seller/profile
 * Get seller's profile information
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

    const seller = await User.findById(session.user.id)
      .select('-password')
      .lean();

    if (!seller) {
      return Response.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      seller,
    });
  } catch (error) {
    console.error('Error fetching seller profile:', error);
    return Response.json(
      { error: 'Failed to fetch profile', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/seller/profile
 * Update seller's profile information
 */
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    
    // Fields that can be updated
    const allowedFields = [
      'name',
      'phone',
      'businessName',
      'businessType',
      'businessAddress',
      'businessDescription',
      'taxId',
      'bankAccount',
      'website',
      'logo',
    ];

    // Filter only allowed fields
    const updates = {};
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    const seller = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!seller) {
      return Response.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: 'Profile updated successfully',
      seller,
    });
  } catch (error) {
    console.error('Error updating seller profile:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return Response.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to update profile', details: error.message },
      { status: 500 }
    );
  }
}
