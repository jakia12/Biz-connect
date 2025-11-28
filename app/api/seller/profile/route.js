import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import SellerProfile from '@/backend/shared/models/SellerProfile';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'seller') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const sellerProfile = await SellerProfile.findOne({ userId: session.user.id });

    if (!sellerProfile) {
      return NextResponse.json(
        { success: false, error: 'Seller profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: sellerProfile
    });
  } catch (error) {
    console.error('Error fetching seller profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller profile' },
      { status: 500 }
    );
  }
}
