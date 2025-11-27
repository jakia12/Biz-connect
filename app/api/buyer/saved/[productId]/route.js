/**
 * Buyer Delete Saved Item API Route
 * Remove a product from saved items
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import SavedItem from '@/backend/shared/models/SavedItem';
import { getServerSession } from 'next-auth';

/**
 * DELETE /api/buyer/saved/[productId]
 * Remove a saved product
 */
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'buyer') {
      return Response.json(
        { error: 'Unauthorized. Buyer access required.' },
        { status: 401 }
      );
    }

    await connectDB();

    const savedItem = await SavedItem.findOneAndDelete({
      userId: session.user.id,
      productId: params.productId,
    });

    if (!savedItem) {
      return Response.json(
        { error: 'Saved item not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: 'Product removed from saved items',
    });
  } catch (error) {
    console.error('Error removing saved item:', error);
    return Response.json(
      { error: 'Failed to remove saved item', details: error.message },
      { status: 500 }
    );
  }
}
