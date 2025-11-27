/**
 * User Profile API Route
 * Fetch and update user profile information
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';
import { getServerSession } from 'next-auth';

/**
 * GET /api/user/profile
 * Fetch current user's profile information
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { error: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(session.user.id)
      .select('-password')
      .lean();

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return Response.json(
      { error: 'Failed to fetch profile', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile
 * Update current user's profile information
 */
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { error: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { name, phone, address, businessName, description } = body;

    // Build update object based on user role
    const updateData = {
      name,
      phone,
    };

    // Add seller-specific fields
    if (session.user.role === 'seller') {
      if (businessName) updateData.businessName = businessName;
      if (description) updateData.businessDescription = description;
      if (address) updateData.businessAddress = address;
    } else {
      // For buyers, use address field
      if (address) updateData.businessAddress = address;
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return Response.json(
      { error: 'Failed to update profile', details: error.message },
      { status: 500 }
    );
  }
}
