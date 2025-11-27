/**
 * Notification Helper Functions
 * Create notifications for various events
 */

import Notification from '@/backend/shared/models/Notification';

export async function createOrderNotification(sellerId, orderId, orderNumber) {
  try {
    await Notification.create({
      userId: sellerId,
      type: 'order',
      title: 'New Order Received',
      message: `You have received a new order #${orderNumber}`,
      link: `/dashboard/seller/orders/${orderId}`,
      metadata: { orderId, orderNumber },
    });
  } catch (error) {
    console.error('Error creating order notification:', error);
  }
}

export async function createOrderStatusNotification(buyerId, orderId, orderNumber, newStatus) {
  try {
    const statusMessages = {
      confirmed: 'Your order has been confirmed',
      processing: 'Your order is being processed',
      shipped: 'Your order has been shipped',
      delivered: 'Your order has been delivered',
      cancelled: 'Your order has been cancelled',
    };

    await Notification.create({
      userId: buyerId,
      type: 'order_status',
      title: 'Order Status Update',
      message: `Order #${orderNumber}: ${statusMessages[newStatus] || 'Status updated'}`,
      link: `/dashboard/buyer/orders/${orderId}`,
      metadata: { orderId, orderNumber, status: newStatus },
    });
  } catch (error) {
    console.error('Error creating order status notification:', error);
  }
}

export async function createMessageNotification(receiverId, senderId, senderName) {
  try {
    await Notification.create({
      userId: receiverId,
      type: 'message',
      title: 'New Message',
      message: `You have a new message from ${senderName}`,
      link: '/messages',
      metadata: { senderId, senderName },
    });
  } catch (error) {
    console.error('Error creating message notification:', error);
  }
}

export async function createReviewNotification(sellerId, productId, productTitle, rating) {
  try {
    await Notification.create({
      userId: sellerId,
      type: 'review',
      title: 'New Review Received',
      message: `Your product "${productTitle}" received a ${rating}-star review`,
      link: `/dashboard/seller/reviews`,
      metadata: { productId, productTitle, rating },
    });
  } catch (error) {
    console.error('Error creating review notification:', error);
  }
}
