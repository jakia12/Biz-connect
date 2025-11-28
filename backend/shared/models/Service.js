/**
 * Service Model (Gig)
 * For service providers to offer gig-based services with packages
 */

import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Basic', 'Standard', 'Premium']
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryTime: {
    type: Number, // in days
    required: true,
    min: 1
  },
  revisions: {
    type: Number,
    required: true,
    min: 0
  },
  features: [{
    type: String,
    required: true
  }]
});

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    maxlength: 200
  },
  answer: {
    type: String,
    required: true,
    maxlength: 500
  }
});

const RequirementSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'file', 'multiple-choice'],
    default: 'text'
  },
  required: {
    type: Boolean,
    default: true
  },
  options: [String] // For multiple-choice
});

const ServiceSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [80, 'Title must be less than 80 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    subcategory: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [100, 'Description must be at least 100 characters'],
      maxlength: [2000, 'Description must be less than 2000 characters']
    },
    tags: [{
      type: String,
      maxlength: 20
    }],
    
    // Packages
    packages: {
      type: [PackageSchema],
      validate: {
        validator: function(packages) {
          return packages.length >= 1 && packages.length <= 3;
        },
        message: 'Service must have between 1 and 3 packages'
      }
    },
    
    // Media
    coverImage: {
      type: String,
      required: [true, 'Cover image is required']
    },
    gallery: [{
      type: String
    }],
    videoUrl: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/.test(v);
        },
        message: 'Invalid video URL'
      }
    },
    
    // Requirements & FAQs
    requirements: [RequirementSchema],
    faqs: [FAQSchema],
    
    // Stats
    views: {
      type: Number,
      default: 0
    },
    orders: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    
    // Status
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'deleted'],
      default: 'draft'
    },
    
    // SEO
    slug: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  {
    timestamps: true
  }
);

// Generate slug before saving
// Generate slug before saving
ServiceSchema.pre('save', async function() {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + this._id.toString().slice(-6);
  }
});

// Indexes for performance
ServiceSchema.index({ sellerId: 1, status: 1 });
ServiceSchema.index({ category: 1, status: 1 });
ServiceSchema.index({ rating: -1, orders: -1 });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

export default Service;
