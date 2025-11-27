/**
 * Conversation Model
 * Represents a conversation between a buyer and seller
 */

import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    participants: {
      buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    lastMessage: {
      content: String,
      senderId: mongoose.Schema.Types.ObjectId,
      timestamp: Date,
    },
    unreadCount: {
      buyer: { type: Number, default: 0 },
      seller: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ConversationSchema.index({ 'participants.buyer': 1, 'participants.seller': 1 });
ConversationSchema.index({ updatedAt: -1 });

// Prevent model recompilation in development
export default mongoose.models.Conversation || 
  mongoose.model('Conversation', ConversationSchema);
