import { authOptions } from '@/backend/shared/config/auth';
import dbConnect from '@/backend/shared/config/database';
import Service from '@/backend/shared/models/Service';
import ServiceOrder from '@/backend/shared/models/ServiceOrder';
import { createNotification } from '@/lib/notifications';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId, packageId, shippingAddress, paymentMethod, requirements } = body;

    // Validate required fields
    if (!serviceId || !packageId || !shippingAddress || !paymentMethod) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch service
    const service = await Service.findById(serviceId).populate('sellerId');
    if (!service) {
      return Response.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    // Find selected package
    const selectedPackage = service.packages.id(packageId);
    if (!selectedPackage) {
      return Response.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    // Create service order
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

    // Create notifications for both buyer and seller
    await createNotification({
      userId: session.user.id,
      type: 'order',
      title: 'Service Order Placed',
      message: `Your order for "${service.title}" has been placed successfully`,
      link: `/dashboard/buyer/orders/${serviceOrder._id}`
    });

    await createNotification({
      userId: service.sellerId._id,
      type: 'order',
      title: 'New Service Order',
      message: `You have a new order for "${service.title}"`,
      link: `/dashboard/seller/orders/${serviceOrder._id}`
    });

    return Response.json({
      success: true,
      order: serviceOrder
    });
  } catch (error) {
    console.error('Error creating service order:', error);
    return Response.json(
      { success: false, error: 'Failed to create service order' },
      { status: 500 }
    );
  }
}
