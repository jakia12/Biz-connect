/**
 * SavedItem Model
 * Mongoose schema for buyer's saved/favorited products
 */

import mongoose from 'mongoose';

const SavedItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Ensure user can only save a product once
SavedItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Index for faster queries
SavedItemSchema.index({ userId: 1, createdAt: -1 });

// Prevent model recompilation in development
export default mongoose.models.SavedItem || mongoose.model('SavedItem', SavedItemSchema);
