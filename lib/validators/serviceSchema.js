import { z } from 'zod';

export const serviceOverviewSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(80, 'Title must be less than 80 characters'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  tags: z.array(z.string()).max(5, 'Maximum 5 tags allowed').optional(),
});

export const servicePricingSchema = z.object({
  packages: z.array(z.object({
    name: z.string().min(1, 'Package name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.coerce.number().min(1, 'Price must be greater than 0'),
    deliveryTime: z.coerce.number().min(1, 'Delivery time must be at least 1 day'),
    revisions: z.coerce.number().min(0, 'Revisions cannot be negative'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
  })).min(1, 'At least one package is required'),
});

export const serviceDescriptionSchema = z.object({
  description: z.string().min(100, 'Description must be at least 100 characters').max(2000, 'Description cannot exceed 2000 characters'),
  faqs: z.array(z.object({
    question: z.string().min(5, 'Question must be at least 5 characters'),
    answer: z.string().min(5, 'Answer must be at least 5 characters'),
  })).optional(),
});

export const serviceRequirementsSchema = z.object({
  requirements: z.array(z.object({
    question: z.string().min(5, 'Question must be at least 5 characters'),
    type: z.enum(['text', 'file']),
    required: z.boolean(),
  })).optional(),
});


export const serviceGallerySchema = z.object({
  coverImage: z.string().min(1, 'Cover image is required'),
  gallery: z.array(z.string()).optional().transform(arr => arr ? arr.filter(url => url.trim() !== '') : []),
  videoUrl: z.string().url('Invalid video URL').optional().or(z.literal('')),
});

// Combined schema for final submission
export const serviceSchema = z.object({
  ...serviceOverviewSchema.shape,
  ...servicePricingSchema.shape,
  ...serviceDescriptionSchema.shape,
  ...serviceRequirementsSchema.shape,
  ...serviceGallerySchema.shape,
});
