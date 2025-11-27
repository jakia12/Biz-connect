/**
 * Notifications API Routes
 * Manage user notifications
 */

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/backend/shared/config/database';
import Notification from '@/backend/shared/models/Notification';
import { getServerSession } from 'next-auth';

/**
 * GET /api/notifications
 * Fetch user notifications
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    const query = { userId: session.user.id };
    if (unreadOnly) {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const unreadCount = await Notification.getUnreadCount(session.user.id);

    return Response.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return Response.json(
      { error: 'Failed to fetch notifications', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/notifications
 * Mark notifications as read
 */
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { notificationId, markAll } = body;

    if (markAll) {
      // Mark all as read
      await Notification.updateMany(
        { userId: session.user.id, isRead: false },
        { $set: { isRead: true, readAt: new Date() } }
      );
    } else if (notificationId) {
      // Mark specific notification as read
      await Notification.findOneAndUpdate(
        { _id: notificationId, userId: session.user.id },
        { $set: { isRead: true, readAt: new Date() } }
      );
    } else {
      return Response.json(
        { error: 'notificationId or markAll required' },
        { status: 400 }
      );
    }

    const unreadCount = await Notification.getUnreadCount(session.user.id);

    return Response.json({
      success: true,
      message: 'Notifications marked as read',
      unreadCount,
    });
  } catch (error) {
    console.error('Error updating notifications:', error);
    return Response.json(
      { error: 'Failed to update notifications', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/notifications
 * Delete notification(s)
 */
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('id');

    if (notificationId) {
      await Notification.findOneAndDelete({
        _id: notificationId,
        userId: session.user.id,
      });
    } else {
      // Delete all read notifications
      await Notification.deleteMany({
        userId: session.user.id,
        isRead: true,
      });
    }

    return Response.json({
      success: true,
      message: 'Notification(s) deleted',
    });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    return Response.json(
      { error: 'Failed to delete notifications', details: error.message },
      { status: 500 }
    );
  }
}
