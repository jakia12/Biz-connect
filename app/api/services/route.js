/**
 * Public Services API Route
 * Browse all services (public access, no authentication required)
 */

import connectDB from '@/backend/shared/config/database';
import Service from '@/backend/shared/models/Service';

/**
 * GET /api/services
 * Fetch all active services with filtering, sorting, and pagination
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Filters
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sellerId = searchParams.get('sellerId'); // Add seller filter
    
    // Sorting
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') === 'asc' ? 1 : -1;

    // Build query - only show active services
    const query = { status: 'active' };

    if (category && category !== 'All' && category !== 'all') {
      query.category = category;
    }

    if (subcategory) {
      query.subcategory = subcategory;
    }

    if (minPrice || maxPrice) {
      // Check price of the basic package (index 0)
      query['packages.0.price'] = {};
      if (minPrice) query['packages.0.price'].$gte = parseFloat(minPrice);
      if (maxPrice) query['packages.0.price'].$lte = parseFloat(maxPrice);
    }

    if (search) {
      // Text search on title, description, and tags
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Filter by seller if provided
    if (sellerId) {
      query.sellerId = sellerId;
    }

    // Fetch services with seller info
    const services = await Service.find(query)
      .populate('sellerId', 'name verified profileImage')
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .lean();

    // Transform data to match frontend expectations if needed
    // For example, mapping sellerId to seller object
    const transformedServices = services.map(service => ({
      ...service,
      seller: service.sellerId, // Map populated sellerId to seller
      price: service.packages?.[0]?.price || 0, // Use basic package price
      image: service.coverImage, // Map coverImage to image
    }));

    const totalServices = await Service.countDocuments(query);

    // Get unique categories for filters
    const categories = await Service.distinct('category', { status: 'active' });

    return Response.json({
      success: true,
      services: transformedServices,
      categories,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalServices / limit),
        totalServices,
        hasMore: skip + services.length < totalServices,
      },
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return Response.json(
      { error: 'Failed to fetch services', details: error.message },
      { status: 500 }
    );
  }
}
