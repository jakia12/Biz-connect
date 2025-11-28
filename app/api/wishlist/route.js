import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Product from '@/backend/shared/models/Product';
import Wishlist from '@/backend/shared/models/Wishlist';
import { getServerSession } from 'next-auth';

/**
 * GET /api/wishlist
 * Fetch user's wishlist items
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const wishlistItems = await Wishlist.find({ userId: session.user.id })
      .populate({
        path: 'productId',
        populate: { path: 'sellerId', select: 'name businessName verified' }
      })
      .sort({ addedAt: -1 });

    // Filter out items where product was deleted
    const validItems = wishlistItems.filter(item => item.productId);

    return Response.json({
      success: true,
      wishlist: validItems,
      count: validItems.length
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return Response.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wishlist
 * Add product to wishlist
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { productId } = await request.json();

    if (!productId) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 });
    }


    // Check if product or service exists
    const product = await Product.findById(productId);
    
    // If not a product, check if it's a service
    if (!product) {
      const Service = (await import('@/backend/shared/models/Service')).default;
      const service = await Service.findById(productId);
      if (!service) {
        return Response.json({ error: 'Product or service not found' }, { status: 404 });
      }
    }

    // Check if already in wishlist
    const existing = await Wishlist.findOne({
      userId: session.user.id,
      productId
    });

    if (existing) {
      return Response.json({
        success: true,
        message: 'Product already in wishlist',
        alreadyExists: true
      });
    }

    // Add to wishlist
    const wishlistItem = await Wishlist.create({
      userId: session.user.id,
      productId
    });

    return Response.json({
      success: true,
      message: 'Added to wishlist',
      wishlistItem
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return Response.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/wishlist?productId=xxx
 * Remove product from wishlist
 */
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const result = await Wishlist.findOneAndDelete({
      userId: session.user.id,
      productId
    });

    if (!result) {
      return Response.json({ error: 'Item not found in wishlist' }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Removed from wishlist'
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return Response.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}
