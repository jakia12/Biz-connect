/**
 * User Profile API Route
 * Fetch and update user profile information
 */

import { authOptions } from '@/backend/shared/config/auth';
import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';
import { getServerSession } from 'next-auth';

/**
 * GET /api/user/profile
 * Fetch current user's profile information
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { error: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(session.user.id)
      .select('-password')
      .lean();

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // If user is a seller, fetch seller profile
    let sellerProfile = null;
    if (user.role === 'seller') {
      const SellerProfile = (await import('@/backend/shared/models/SellerProfile')).default;
      sellerProfile = await SellerProfile.findOne({ userId: user._id }).lean();
    }

    return Response.json({
      success: true,
      user: {
        ...user,
        sellerProfile: sellerProfile || null
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return Response.json(
      { error: 'Failed to fetch profile', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile
 * Update current user's profile information
 */
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { error: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { 
      name, 
      phone, 
      address, 
      businessName, 
      description,
      // Extra seller fields
      businessType,
      category,
      location,
      district,
      businessHoursFrom,
      businessHoursTo,
      taxId,
      website,
      bankAccount
    } = body;

    // Build update object based on user role
    const updateData = {};
    
    // Always update name and phone if provided
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;

    // Add seller-specific fields to User model (for backward compatibility)
    if (session.user.role === 'seller') {
      if (businessName !== undefined) updateData.businessName = businessName;
      if (description !== undefined) updateData.businessDescription = description;
      if (address !== undefined) updateData.businessAddress = address;
    } else {
      // For buyers, use address field
      if (address !== undefined) updateData.businessAddress = address;
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update SellerProfile if role is seller
    let sellerProfile = null;
    if (session.user.role === 'seller') {
      const SellerProfile = (await import('@/backend/shared/models/SellerProfile')).default;
      
      const sellerUpdateData = {};
      if (businessName !== undefined) sellerUpdateData.businessName = businessName;
      if (description !== undefined) sellerUpdateData.description = description;
      if (businessType !== undefined) sellerUpdateData.businessType = businessType;
      if (category !== undefined) sellerUpdateData.category = category;
      if (location !== undefined) sellerUpdateData.location = location;
      if (district !== undefined) sellerUpdateData.district = district;
      
      // Handle business hours
      if (businessHoursFrom !== undefined || businessHoursTo !== undefined) {
        sellerUpdateData.businessHours = {};
        if (businessHoursFrom !== undefined) sellerUpdateData['businessHours.from'] = businessHoursFrom;
        if (businessHoursTo !== undefined) sellerUpdateData['businessHours.to'] = businessHoursTo;
      }

      if (taxId !== undefined) sellerUpdateData.taxId = taxId;
      if (website !== undefined) sellerUpdateData.website = website;
      if (bankAccount !== undefined) sellerUpdateData.bankAccount = bankAccount;

      sellerProfile = await SellerProfile.findOneAndUpdate(
        { userId: session.user.id },
        { $set: sellerUpdateData },
        { new: true, upsert: true } // Create if doesn't exist
      );
    }

    return Response.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        ...user.toObject(),
        sellerProfile
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return Response.json(
      { error: 'Failed to update profile', details: error.message },
      { status: 500 }
    );
  }
}
