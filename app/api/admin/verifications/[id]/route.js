import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import SellerProfile from '@/backend/shared/models/SellerProfile';
import User from '@/backend/shared/models/User';
import { verificationActionSchema } from '@/lib/validators/verificationSchema';
import { getServerSession } from 'next-auth';

export async function PATCH(req, props) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }

    await connectDB();

    const { id } = params;
    const body = await req.json();

    // Validate request body
    const validation = verificationActionSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }));
      return Response.json({ error: 'Validation failed', errors }, { status: 400 });
    }

    const { action, rejectionReason } = validation.data;

    // Find seller profile
    const sellerProfile = await SellerProfile.findById(id);
    
    if (!sellerProfile) {
      return Response.json({ error: 'Seller profile not found' }, { status: 404 });
    }

    // Update based on action
    if (action === 'approve') {
      sellerProfile.verificationStatus = 'approved';
      sellerProfile.verified = true;
      sellerProfile.rejectionReason = '';
      
      // Sync with User model
      await User.findByIdAndUpdate(sellerProfile.userId, { isVerified: true });
      
    } else if (action === 'reject') {
      sellerProfile.verificationStatus = 'rejected';
      sellerProfile.verified = false;
      sellerProfile.rejectionReason = rejectionReason || '';
      
      // Sync with User model
      await User.findByIdAndUpdate(sellerProfile.userId, { isVerified: false });
    }

    await sellerProfile.save();

    return Response.json({
      success: true,
      message: `Verification request ${action}ed successfully`,
      data: {
        _id: sellerProfile._id,
        verificationStatus: sellerProfile.verificationStatus,
        verified: sellerProfile.verified,
        rejectionReason: sellerProfile.rejectionReason
      }
    });

  } catch (error) {
    console.error('Verification action error:', error);
    return Response.json({ error: 'Failed to process verification action' }, { status: 500 });
  }
}
