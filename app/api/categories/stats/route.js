import connectDB from '@/backend/shared/config/database';
import Product from '@/backend/shared/models/Product';
import Service from '@/backend/shared/models/Service';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();

    // Ensure models are registered
    const ProductModel = mongoose.models.Product || Product;
    const ServiceModel = mongoose.models.Service || Service;

    // Aggregate product counts by category
    const productStats = await ProductModel.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Aggregate service counts by category
    const serviceStats = await ServiceModel.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Format stats into objects
    const productCounts = {};
    productStats.forEach(stat => {
      productCounts[stat._id] = stat.count;
    });

    const serviceCounts = {};
    serviceStats.forEach(stat => {
      serviceCounts[stat._id] = stat.count;
    });

    return Response.json({
      success: true,
      productCounts,
      serviceCounts
    });
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch stats', details: error.message },
      { status: 500 }
    );
  }
}
