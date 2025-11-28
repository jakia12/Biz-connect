/**
 * ServiceOrder Model
 * For tracking orders of services/gigs
 */

import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  files: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  deliveredAt: {
    type: Date,
    default: Date.now
  }
});

const RevisionSchema = new mongoose.Schema({
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RequirementAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String
  },
  files: [{
    filename: String,
    url: String
  }]
});

const ServiceOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    // Package details
    selectedPackage: {
      name: {
        type: String,
        required: true,
        enum: ['Basic', 'Standard', 'Premium']
      },
      price: {
        type: Number,
        required: true
      },
      deliveryTime: {
        type: Number,
        required: true
      },
      revisions: {
        type: Number,
        required: true
      },
      features: [String]
    },
    
    // Requirements from buyer
    requirements: [RequirementAnswerSchema],
    
    // Order status
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'delivered', 'revision', 'completed', 'cancelled'],
      default: 'pending'
    },
    
    // Payment
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'bkash', 'nagad', 'rocket', 'cod'],
      required: true
    },
    
    // Delivery
    deliveries: [DeliverySchema],
    
    // Revisions
    revisions: [RevisionSchema],
    revisionsUsed: {
      type: Number,
      default: 0
    },
    
    // Dates
    startedAt: Date,
    deliveredAt: Date,
    completedAt: Date,
    cancelledAt: Date,
    
    // Expected delivery date
    expectedDeliveryDate: {
      type: Date,
      required: true
    },
    
    // Cancellation
    cancellationReason: String,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Generate unique order ID
ServiceOrderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    const count = await mongoose.model('ServiceOrder').countDocuments();
    this.orderId = `SO-${Date.now()}-${(count + 1).toString().padStart(5, '0')}`;
  }
  next();
});

// Calculate expected delivery date
ServiceOrderSchema.pre('save', function(next) {
  if (this.isNew && !this.expectedDeliveryDate) {
    const deliveryDays = this.selectedPackage.deliveryTime;
    this.expectedDeliveryDate = new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000);
  }
  next();
});

// Indexes
ServiceOrderSchema.index({ buyerId: 1, status: 1 });
ServiceOrderSchema.index({ sellerId: 1, status: 1 });

const ServiceOrder = mongoose.models.ServiceOrder || mongoose.model('ServiceOrder', ServiceOrderSchema);

export default ServiceOrder;
