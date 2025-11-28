/**
 * Individual Service API
 * Manage individual service (GET, PATCH, DELETE)
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Service from '@/backend/shared/models/Service';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * GET /api/seller/services/[id]
 * Fetch single service for editing
 */
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'seller') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const service = await Service.findOne({
      _id: id,
      sellerId: session.user.id
    }).lean();

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service
    });

  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/seller/services/[id]
 * Update service
 */
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'seller') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const data = await request.json();

    // Find service and verify ownership
    const service = await Service.findOne({
      _id: id,
      sellerId: session.user.id
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Update service
    Object.assign(service, data);
    await service.save();

    return NextResponse.json({
      success: true,
      service,
      message: 'Service updated successfully'
    });

  } catch (error) {
    console.error('Error updating service:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update service', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/seller/services/[id]
 * Delete service (soft delete by setting status to 'deleted')
 */
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'seller') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    // Find service and verify ownership
    const service = await Service.findOne({
      _id: id,
      sellerId: session.user.id
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Soft delete
    service.status = 'deleted';
    await service.save();

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service', details: error.message },
      { status: 500 }
    );
  }
}
