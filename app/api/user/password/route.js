/**
 * Password Change API Route
 * Update user password
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

/**
 * PATCH /api/user/password
 * Change user password
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
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return Response.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    // Find user with password field
    const user = await User.findById(session.user.id);

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return Response.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return Response.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Error updating password:', error);
    return Response.json(
      { error: 'Failed to update password', details: error.message },
      { status: 500 }
    );
  }
}
