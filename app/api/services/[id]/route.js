import dbConnect from '@/backend/shared/config/database';
import Service from '@/backend/shared/models/Service';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    const service = await Service.findById(id)
      .populate('sellerId', 'name email profileImage isVerified')
      .lean();
    
    if (!service) {
      return Response.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return Response.json({
      success: true,
      service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}
