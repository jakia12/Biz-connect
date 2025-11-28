import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import SellerProfile from '@/backend/shared/models/SellerProfile';
import { verificationRequestSchema } from '@/lib/validators/verificationSchema';
import { getServerSession } from 'next-auth';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'seller') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    
    // Validate request body
    const validation = verificationRequestSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }));
      return Response.json({ error: 'Validation failed', errors }, { status: 400 });
    }

    const { documents, message } = validation.data;

    // Find seller profile
    const sellerProfile = await SellerProfile.findOne({ userId: session.user.id });
    
    if (!sellerProfile) {
      return Response.json({ error: 'Seller profile not found' }, { status: 404 });
    }

    // Check if already verified
    if (sellerProfile.verified) {
      return Response.json({ error: 'Already verified' }, { status: 400 });
    }

    // Check if already pending
    if (sellerProfile.verificationStatus === 'pending') {
      return Response.json({ error: 'Verification request already pending' }, { status: 400 });
    }

    // Update seller profile with verification request
    sellerProfile.verificationStatus = 'pending';
    sellerProfile.verificationDocuments = documents;
    sellerProfile.verificationMessage = message;
    sellerProfile.rejectionReason = ''; // Clear any previous rejection reason
    
    await sellerProfile.save();

    return Response.json({
      success: true,
      message: 'Verification request submitted successfully',
      data: {
        verificationStatus: sellerProfile.verificationStatus,
      }
    });

  } catch (error) {
    console.error('Verification request error:', error);
    return Response.json({ error: 'Failed to submit verification request' }, { status: 500 });
  }
}
