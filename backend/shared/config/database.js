/**
 * MongoDB Connection Configuration
 * Singleton pattern for serverless environments
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Register all models to prevent MissingSchemaError in serverless environments
 */
async function registerModels() {
  // Import all models to ensure they're registered
  // Using dynamic imports to avoid circular dependencies
  try {
    await Promise.all([
      import('../models/User'),
      import('../models/Product'),
      import('../models/Service'),
      import('../models/Order'),
      import('../models/ServiceOrder'),
      import('../models/Review'),
      import('../models/Cart'),
      import('../models/Wishlist'),
      import('../models/Notification'),
    ]);
  } catch (error) {
    console.warn('[MongoDB] Some models failed to register:', error.message);
  }
}

async function connectDB() {
  if (cached.conn) {
    console.log('[MongoDB] Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('[MongoDB] Creating new connection...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (mongoose) => {
      console.log('[MongoDB] Connected successfully');
      // Register all models after connection
      await registerModels();
      console.log('[MongoDB] Models registered');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('[MongoDB] Connection failed:', e.message);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
