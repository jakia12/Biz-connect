/**
 * Review Model
 * Mongoose schema for product and seller reviews
 */

import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order ID is required'],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Buyer ID is required'],
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller ID is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      minlength: [10, 'Comment must be at least 10 characters'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 5;
        },
        message: 'Cannot upload more than 5 review images',
      },
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: true,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: [0, 'Helpful count cannot be negative'],
    },
    sellerResponse: {
      type: String,
      trim: true,
    },
    sellerResponseDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Ensure one review per product per order
ReviewSchema.index({ orderId: 1, productId: 1 }, { unique: true });

// Index for faster queries
ReviewSchema.index({ productId: 1, createdAt: -1 });
ReviewSchema.index({ sellerId: 1, createdAt: -1 });
ReviewSchema.index({ buyerId: 1 });
ReviewSchema.index({ rating: 1 });

// Prevent model recompilation in development
export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
