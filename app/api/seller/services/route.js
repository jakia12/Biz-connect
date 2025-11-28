/**
 * Seller Services API
 * Manage services for authenticated sellers
 */


import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import Service from '@/backend/shared/models/Service';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * GET /api/seller/services
 * Fetch all services for the authenticated seller
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'seller') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query = { sellerId: session.user.id };
    if (status && status !== 'all') {
      query.status = status;
    }

    // Fetch services
    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalServices = await Service.countDocuments(query);

    // Get stats
    const stats = await Service.aggregate([
      { $match: { sellerId: session.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusCounts = {
      all: totalServices,
      draft: 0,
      active: 0,
      paused: 0
    };

    stats.forEach(stat => {
      statusCounts[stat._id] = stat.count;
    });

    return NextResponse.json({
      success: true,
      services,
      stats: statusCounts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalServices / limit),
        totalServices,
        hasMore: skip + services.length < totalServices
      }
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/seller/services
 * Create a new service
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'seller') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'category', 'subcategory', 'description', 'packages', 'coverImage'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate packages
    if (!Array.isArray(data.packages) || data.packages.length === 0 || data.packages.length > 3) {
      return NextResponse.json(
        { error: 'Service must have between 1 and 3 packages' },
        { status: 400 }
      );
    }

    // Create service
    const service = await Service.create({
      ...data,
      sellerId: session.user.id
    });

    return NextResponse.json({
      success: true,
      service,
      message: 'Service created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating service:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create service', details: error.message },
      { status: 500 }
    );
  }
}
