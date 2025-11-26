/**
 * Seller Single Product API Routes
 * Handles update and delete operations for individual products
 */

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/backend/shared/config/database';
import Product from '@/backend/shared/models/Product';
import { getServerSession } from 'next-auth';

/**
 * GET /api/seller/products/[id]
 * Fetch a single product by ID
 */
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const product = await Product.findOne({
      _id: params.id,
      sellerId: session.user.id,
    }).lean();

    if (!product) {
      return Response.json(
        { error: 'Product not found or access denied' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json(
      { error: 'Failed to fetch product', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/seller/products/[id]
 * Update a product
 */
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Find product and verify ownership
    const product = await Product.findOne({
      _id: params.id,
      sellerId: session.user.id,
    });

    if (!product) {
      return Response.json(
        { error: 'Product not found or access denied' },
        { status: 404 }
      );
    }

    // Update product
    Object.assign(product, body);
    await product.save();

    return Response.json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Error updating product:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return Response.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to update product', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/seller/products/[id]
 * Delete a product
 */
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'seller') {
      return Response.json(
        { error: 'Unauthorized. Seller access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    // Find and delete product (verify ownership)
    const product = await Product.findOneAndDelete({
      _id: params.id,
      sellerId: session.user.id,
    });

    if (!product) {
      return Response.json(
        { error: 'Product not found or access denied' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return Response.json(
      { error: 'Failed to delete product', details: error.message },
      { status: 500 }
    );
  }
}
