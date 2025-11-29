/**
 * Utility to ensure Mongoose models are properly registered in serverless environments
 * This prevents MissingSchemaError in Vercel deployments
 */

import mongoose from 'mongoose';

/**
 * Get a registered Mongoose model safely
 * @param {string} modelName - Name of the model
 * @param {Function} modelImport - The imported model
 * @returns {mongoose.Model} The registered model
 */
export function getModel(modelName, modelImport) {
  return mongoose.models[modelName] || modelImport;
}

/**
 * Ensure all common models are registered
 * Call this at the start of API routes that use multiple models
 */
export async function ensureModelsRegistered() {
  // Import all models to ensure they're registered
  const models = [
    () => import('@/backend/shared/models/User'),
    () => import('@/backend/shared/models/Product'),
    () => import('@/backend/shared/models/Service'),
    () => import('@/backend/shared/models/Order'),
    () => import('@/backend/shared/models/ServiceOrder'),
    () => import('@/backend/shared/models/Review'),
    () => import('@/backend/shared/models/Cart'),
    () => import('@/backend/shared/models/Wishlist'),
    () => import('@/backend/shared/models/Notification'),
  ];

  // Import all models in parallel
  await Promise.all(models.map(importFn => importFn().catch(() => {})));
}
