/**
 * Seller API Route - Individual Seller
 * Fetch single seller details
 */

import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';

/**
 * GET /api/sellers/[id]
 * Fetch single seller details
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    // In Next.js 15, params is a Promise that needs to be awaited
    const { id } = await params;
    
    console.log('Fetching seller with ID:', id);
    console.log('ID type:', typeof id);
    console.log('ID length:', id?.length);

    // Validate ObjectId format
    if (!id || id.length !== 24) {
      console.error('Invalid ObjectId format:', id);
      return Response.json(
        { error: 'Invalid seller ID format' },
        { status: 400 }
      );
    }

    // Fetch seller
    const seller = await User.findOne({
      _id: id,
      role: 'seller'
    })
      .select('name email businessName businessCategory businessDescription businessAddress profileImage rating reviewCount totalOrders createdAt')
      .lean();

    console.log('Seller found:', seller ? 'Yes' : 'No');
    if (seller) {
      console.log('Seller details:', { name: seller.name, email: seller.email });
    }

    if (!seller) {
      return Response.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      seller,
    });
  } catch (error) {
    console.error('Error fetching seller:', error);
    return Response.json(
      { error: 'Failed to fetch seller', details: error.message },
      { status: 500 }
    );
  }
}
