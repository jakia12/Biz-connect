/**
 * SellerProfile Model
 * Extended profile information for sellers
 */

import mongoose from 'mongoose';

const SellerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    businessType: {
      type: String,
      enum: ['product', 'service', 'both'],
      required: [true, 'Business type is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    district: {
      type: String,
      required: [true, 'District is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [50, 'Description must be at least 50 characters'],
      maxlength: [500, 'Description must be less than 500 characters'],
    },
    businessHours: {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
    logo: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    taxId: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    bankAccount: {
      type: String,
      default: '',
    },
    // Verification fields
    verificationStatus: {
      type: String,
      enum: ['idle', 'pending', 'approved', 'rejected'],
      default: 'idle',
    },
    verificationDocuments: {
      type: [String],
      default: [],
    },
    verificationMessage: {
      type: String,
      default: '',
    },
    rejectionReason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
export default mongoose.models.SellerProfile || 
  mongoose.model('SellerProfile', SellerProfileSchema);
