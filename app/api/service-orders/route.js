import { authOptions } from '@/backend/shared/config/auth';
import dbConnect from '@/backend/shared/config/database';
import Notification from '@/backend/shared/models/Notification';
import Service from '@/backend/shared/models/Service';
import ServiceOrder from '@/backend/shared/models/ServiceOrder';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  try {
    console.log('[ServiceOrder API] Starting service order creation...');
    await dbConnect();
    console.log('[ServiceOrder API] Database connected');
    
    const session = await getServerSession(authOptions);
    console.log('[ServiceOrder API] Session:', session?.user?.email);
    
    if (!session || !session.user) {
      console.log('[ServiceOrder API] Unauthorized - no session');
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('[ServiceOrder API] Request body:', JSON.stringify(body, null, 2));
    
    const { serviceId, packageId, shippingAddress, paymentMethod, requirements } = body;

    // Validate required fields
    if (!serviceId || !packageId || !shippingAddress || !paymentMethod) {
      console.log('[ServiceOrder API] Missing required fields');
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch service
    console.log('[ServiceOrder API] Fetching service:', serviceId);
    const service = await Service.findById(serviceId).populate('sellerId');
    
    if (!service) {
      console.log('[ServiceOrder API] Service not found:', serviceId);
      return Response.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    console.log('[ServiceOrder API] Service found:', service.title);

    // Find selected package
    const selectedPackage = service.packages.id(packageId);
    if (!selectedPackage) {
      console.log('[ServiceOrder API] Package not found:', packageId);
      return Response.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }
    
    console.log('[ServiceOrder API] Package found:', selectedPackage.name);

    // Create service order
    console.log('[ServiceOrder API] Creating service order...');
    const serviceOrder = await ServiceOrder.create({
      buyerId: session.user.id,
      sellerId: service.sellerId._id,
      serviceId: service._id,
      packageId: selectedPackage._id,
      packageDetails: {
        name: selectedPackage.name,
        price: selectedPackage.price,
        deliveryTime: selectedPackage.deliveryTime,
        revisions: selectedPackage.revisions,
        features: selectedPackage.features
      },
      totalAmount: selectedPackage.price,
      shippingAddress,
      paymentMethod,
      requirements: requirements || {},
      status: 'pending'
    });
    
    console.log('[ServiceOrder API] Service order created:', serviceOrder._id);

    // Create notifications for both buyer and seller
    console.log('[ServiceOrder API] Creating notifications...');
    await Notification.create({
      userId: session.user.id,
      type: 'order',
      title: 'Service Order Placed',
      message: `Your order for "${service.title}" has been placed successfully`,
      link: `/dashboard/buyer/orders`,
      metadata: { orderId: serviceOrder._id, serviceId: service._id }
    });

    await Notification.create({
      userId: service.sellerId._id,
      type: 'order',
      title: 'New Service Order',
      message: `You have a new order for "${service.title}"`,
      link: `/dashboard/seller/orders`,
      metadata: { orderId: serviceOrder._id, serviceId: service._id }
    });
    
    console.log('[ServiceOrder API] Notifications created successfully');

    return Response.json({
      success: true,
      order: serviceOrder
    });
  } catch (error) {
    console.error('[ServiceOrder API] ERROR:', error);
    console.error('[ServiceOrder API] Error stack:', error.stack);
    return Response.json(
      { success: false, error: 'Failed to create service order', details: error.message },
      { status: 500 }
    );
  }
}
