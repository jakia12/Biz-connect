import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import SellerProfile from '@/backend/shared/models/SellerProfile';
import { getServerSession } from 'next-auth';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }

    await connectDB();

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'pending';

    // Build query
    const query = { verificationStatus: status };

    // Fetch verification requests with user details
    const verificationRequests = await SellerProfile.find(query)
      .populate('userId', 'name email phone')
      .sort({ updatedAt: -1 })
      .lean();

    return Response.json({
      success: true,
      data: verificationRequests,
      count: verificationRequests.length
    });

  } catch (error) {
    console.error('Fetch verifications error:', error);
    return Response.json({ error: 'Failed to fetch verification requests' }, { status: 500 });
  }
}
