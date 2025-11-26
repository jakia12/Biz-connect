/**
 * Centralized Zod Validation Schemas
 * All form validation schemas for the BizConnect application
 */

import { z } from 'zod';

// ============================================================================
// COMMON FIELD SCHEMAS
// ============================================================================

const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .refine((email) => {
    // More permissive email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, 'Please enter a valid email address');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^(\+880|880|0)?1[3-9]\d{8}$/, 'Please enter a valid Bangladesh phone number');

const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .or(z.literal(''))
  .optional();

const nameSchema = z
  .string()
  .min(1, 'This field is required')
  .min(2, 'Must be at least 2 characters')
  .max(50, 'Must be less than 50 characters');

// ============================================================================
// AUTHENTICATION SCHEMAS
// ============================================================================

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

// Buyer Registration Schema
export const buyerRegistrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

// Seller Registration - Step 1 (Account Info)
export const sellerRegistrationStep1Schema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Seller Registration - Step 2 (Business Info)
export const sellerRegistrationStep2Schema = z.object({
  businessName: z
    .string()
    .min(1, 'Business name is required')
    .min(3, 'Business name must be at least 3 characters')
    .max(100, 'Business name must be less than 100 characters'),
  businessType: z.enum(['product', 'service', 'both'], {
    errorMap: () => ({ message: 'Please select a business type' }),
  }),
  category: z.string().min(1, 'Please select a category'),
  location: z.string().min(1, 'Location is required'),
  district: z.string().min(1, 'District is required'),
});

// Seller Registration - Step 3 (Description)
export const sellerRegistrationStep3Schema = z.object({
  description: z
    .string()
    .min(1, 'Business description is required')
    .min(50, 'Description must be at least 50 characters')
    .max(500, 'Description must be less than 500 characters'),
  businessHoursFrom: z.string().min(1, 'Opening time is required'),
  businessHoursTo: z.string().min(1, 'Closing time is required'),
  logo: z.any().optional(),
});

// Complete Seller Registration Schema (all steps combined)
export const sellerRegistrationSchema = sellerRegistrationStep1Schema
  .merge(sellerRegistrationStep2Schema)
  .merge(sellerRegistrationStep3Schema);

// ============================================================================
// CONTACT FORM SCHEMA
// ============================================================================

export const contactSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

// ============================================================================
// SELLER SETUP SCHEMAS
// ============================================================================

// Seller Setup - Step 1 (Basic Info)
export const sellerSetupStep1Schema = z.object({
  businessName: z
    .string()
    .min(1, 'Business name is required')
    .min(3, 'Business name must be at least 3 characters'),
  businessType: z.string().min(1, 'Please select a business type'),
  category: z.string().min(1, 'Please select a category'),
});

// Seller Setup - Step 2 (Business Details)
export const sellerSetupStep2Schema = z.object({
  description: z
    .string()
    .min(1, 'Business description is required')
    .min(50, 'Description must be at least 50 characters')
    .max(500, 'Description must be less than 500 characters'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  phone: phoneSchema,
  website: urlSchema,
});

// Seller Setup - Step 3 (Verification)
export const sellerSetupStep3Schema = z.object({
  tradeLicense: z.any().optional(),
  taxId: z.string().optional(),
  bankAccount: z.string().optional(),
});

// ============================================================================
// PRODUCT SCHEMAS
// ============================================================================

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  category: z.string().min(1, 'Please select a category'),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than 0')
    .max(1000000000, 'Price is too high'),
  stock: z
    .number({ invalid_type_error: 'Stock must be a number' })
    .int('Stock must be a whole number')
    .nonnegative('Stock cannot be negative'),
  images: z.any().optional(),
  tags: z.array(z.string()).optional(),
});

// ============================================================================
// SETTINGS SCHEMAS
// ============================================================================

// Seller Settings Schema
export const sellerSettingsSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(1, 'Address is required'),
  description: z.string().min(1, 'Description is required'),
});

// Buyer Settings Schema
export const buyerSettingsSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(1, 'Address is required'),
});

// Password Change Schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ['newPassword'],
});

// ============================================================================
// REVIEW SCHEMA
// ============================================================================

export const reviewSchema = z.object({
  rating: z
    .number({ invalid_type_error: 'Please select a rating' })
    .int()
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating must be at most 5 stars'),
  comment: z
    .string()
    .min(1, 'Review comment is required')
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must be less than 1000 characters'),
  images: z.any().optional(),
});
