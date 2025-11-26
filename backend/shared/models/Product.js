/**
 * Product Model
 * Mongoose schema for products listed by sellers
 */

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: 'Cannot upload more than 10 images',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Electronics',
        'Fashion',
        'Home & Garden',
        'Industrial',
        'Food & Beverage',
        'Health & Beauty',
        'Sports',
        'Automotive',
        'Construction',
        'Agriculture',
        'Textiles',
        'Other',
      ],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller ID is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    minOrderQuantity: {
      type: Number,
      default: 1,
      min: [1, 'Minimum order quantity must be at least 1'],
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'out_of_stock', 'pending'],
      default: 'active',
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Index for faster searches
ProductSchema.index({ title: 'text', description: 'text' });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ sellerId: 1, status: 1 });

// Virtual for average rating (can be populated from reviews)
ProductSchema.virtual('averageRating', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'productId',
  justOne: false,
});

// Prevent model recompilation in development
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
