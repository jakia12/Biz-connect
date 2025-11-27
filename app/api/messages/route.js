/**
 * Messages API Routes
 * Buyer-seller communication system
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Message from '@/backend/shared/models/Message';
import { getServerSession } from 'next-auth';

/**
 * GET /api/messages
 * Fetch user's conversations/messages
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const conversationWith = searchParams.get('with'); // Filter by specific user

    let query = {
      $or: [
        { senderId: session.user.id },
        { receiverId: session.user.id },
      ],
    };

    if (conversationWith) {
      query = {
        $or: [
          { senderId: session.user.id, receiverId: conversationWith },
          { senderId: conversationWith, receiverId: session.user.id },
        ],
      };
    }

    const messages = await Message.find(query)
      .populate('senderId', 'name email role')
      .populate('receiverId', 'name email role')
      .populate('productId', 'title images')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    // Group messages by conversation
    const conversations = {};
    messages.forEach(msg => {
      const otherUser = msg.senderId._id.toString() === session.user.id 
        ? msg.receiverId 
        : msg.senderId;
      const key = otherUser._id.toString();

      if (!conversations[key]) {
        conversations[key] = {
          user: otherUser,
          messages: [],
          unreadCount: 0,
          lastMessage: msg,
        };
      }

      conversations[key].messages.push(msg);
      
      // Count unread messages (received by current user and not read)
      if (msg.receiverId._id.toString() === session.user.id && !msg.isRead) {
        conversations[key].unreadCount++;
      }
    });

    return Response.json({
      success: true,
      conversations: Object.values(conversations),
      messages: conversationWith ? messages.reverse() : [], // If filtering, return ordered messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return Response.json(
      { error: 'Failed to fetch messages', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/messages
 * Send a new message
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { receiverId, message, productId } = body;

    if (!receiverId || !message) {
      return Response.json(
        { error: 'Receiver ID and message are required' },
        { status: 400 }
      );
    }

    const senderId = session.user.id;
    const senderRole = session.user.role;

    // Import Conversation model
    const Conversation = (await import('@/backend/shared/models/Conversation')).default;

    // Determine buyer and seller IDs
    const buyerId = senderRole === 'buyer' ? senderId : receiverId;
    const sellerId = senderRole === 'seller' ? senderId : receiverId;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      'participants.buyer': buyerId,
      'participants.seller': sellerId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: { buyer: buyerId, seller: sellerId },
        lastMessage: {
          content: message,
          senderId,
          timestamp: new Date(),
        },
        unreadCount: {
          buyer: senderRole === 'seller' ? 1 : 0,
          seller: senderRole === 'buyer' ? 1 : 0,
        },
      });
    } else {
      // Update conversation
      conversation.lastMessage = {
        content: message,
        senderId,
        timestamp: new Date(),
      };
      
      // Increment unread count for receiver
      if (senderRole === 'buyer') {
        conversation.unreadCount.seller += 1;
      } else {
        conversation.unreadCount.buyer += 1;
      }
      
      await conversation.save();
    }

    // Create message with conversationId
    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId,
      receiverId,
      content: message,
      productId: productId || null,
      isRead: false,
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate('senderId', 'name email role profileImage businessName')
      .populate('receiverId', 'name email role profileImage businessName')
      .populate('productId', 'title images')
      .lean();

    return Response.json(
      {
        success: true,
        message: 'Message sent successfully',
        data: populatedMessage,
        conversationId: conversation._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    return Response.json(
      { error: 'Failed to send message', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/messages/[id]
 * Mark message as read
 */
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { messageIds } = body; // Array of message IDs to mark as read

    if (!messageIds || !Array.isArray(messageIds)) {
      return Response.json(
        { error: 'Message IDs array is required' },
        { status: 400 }
      );
    }

    await Message.updateMany(
      {
        _id: { $in: messageIds },
        receiverId: session.user.id, // Only mark own received messages
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    return Response.json({
      success: true,
      message: 'Messages marked as read',
    });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return Response.json(
      { error: 'Failed to update messages', details: error.message },
      { status: 500 }
    );
  }
}
