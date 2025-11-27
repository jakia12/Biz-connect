/**
 * Buyer Saved Items API Routes
 * Manage buyer's saved/favorited products
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Product from '@/backend/shared/models/Product';
import SavedItem from '@/backend/shared/models/SavedItem';
import { getServerSession } from 'next-auth';

/**
 * GET /api/buyer/saved
 * Fetch all saved products for the logged-in buyer
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json(
        { error: 'Unauthorized. Buyer access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Fetch saved items with product details
    const savedItems = await SavedItem.find({ userId: session.user.id })
      .populate({
        path: 'productId',
        select: 'title price images category status sellerId',
        populate: {
          path: 'sellerId',
          select: 'name',
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalSaved = await SavedItem.countDocuments({ userId: session.user.id });

    // Filter out saved items where product was deleted
    const validSavedItems = savedItems.filter(item => item.productId);

    return Response.json({
      success: true,
      savedItems: validSavedItems,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalSaved / limit),
        totalSaved,
        hasMore: skip + savedItems.length < totalSaved,
      },
    });
  } catch (error) {
    console.error('Error fetching saved items:', error);
    return Response.json(
      { error: 'Failed to fetch saved items', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/buyer/saved
 * Save/favorite a product
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json(
        { error: 'Unauthorized. Buyer access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return Response.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if already saved
    const existing = await SavedItem.findOne({
      userId: session.user.id,
      productId,
    });

    if (existing) {
      return Response.json(
        { error: 'Product already saved' },
        { status: 400 }
      );
    }

    // Create saved item
    const savedItem = await SavedItem.create({
      userId: session.user.id,
      productId,
    });

    return Response.json(
      {
        success: true,
        message: 'Product saved successfully',
        savedItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving product:', error);

    if (error.code === 11000) {
      // Duplicate key error
      return Response.json(
        { error: 'Product already saved' },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to save product', details: error.message },
      { status: 500 }
    );
  }
}
