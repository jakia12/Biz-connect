/**
 * Seller Products API Routes
 * Handles CRUD operations for seller's products
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Product from '@/backend/shared/models/Product';
import { getServerSession } from 'next-auth';

/**
 * GET /api/seller/products
 * Fetch all products for the logged-in seller
 */
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // Filter by status
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query = { sellerId: session.user.id };
    if (status) {
      query.status = status;
    }

    // Fetch products
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);

    return Response.json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        hasMore: skip + products.length < totalProducts,
      },
    });
  } catch (error) {
    console.error('Error fetching seller products:', error);
    return Response.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/seller/products
 * Create a new product
 */
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Create product with seller ID
    const product = await Product.create({
      ...body,
      sellerId: session.user.id,
    });

    return Response.json(
      {
        success: true,
        message: 'Product created successfully',
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return Response.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}
