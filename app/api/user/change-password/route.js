/**
 * Password Change API Route
 * Update user password
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import User from '@/models/User';
import { getServerSession } from 'next-auth';

/**
 * POST /api/user/change-password
 * Change user password
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, error: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return Response.json(
        { success: false, error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return Response.json(
        { success: false, error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Find user with password field
    const user = await User.findById(session.user.id).select('+password');

    if (!user) {
      return Response.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify current password using the model method
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return Response.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    return Response.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Error updating password:', error);
    return Response.json(
      { success: false, error: 'Failed to update password', details: error.message },
      { status: 500 }
    );
  }
}
