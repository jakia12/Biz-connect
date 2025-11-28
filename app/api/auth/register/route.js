/**
 * Registration API Route
 * Handles buyer and seller registration
 */

import connectDB from '@/backend/shared/config/database';
import SellerProfile from '@/backend/shared/models/SellerProfile';
import User from '@/backend/shared/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('[Registration] Connecting to database...');
    await connectDB();
    console.log('[Registration] Database connected successfully');

    const body = await request.json();
    const { role, ...userData } = body;

    console.log('[Registration] Registration request for role:', role);

    // Validate required fields
    if (!userData.email || !userData.password) {
      console.error('[Registration] Missing required fields');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) {
      console.error('[Registration] User already exists:', userData.email);
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create user based on role
    if (role === 'buyer') {
      // Buyer registration
      const { firstName, lastName, email, phone, password } = userData;

      console.log('[Registration] Creating buyer account for:', email);
      const user = await User.create({
        name: `${firstName} ${lastName}`,
        email: email.toLowerCase(),
        phone,
        password,
        role: 'buyer',
      });

      console.log('[Registration] Buyer account created successfully:', user._id);
      return NextResponse.json(
        {
          success: true,
          message: 'Buyer account created successfully',
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        { status: 201 }
      );
    } else if (role === 'seller') {
      // Seller registration
      const {
        firstName,
        lastName,
        email,
        phone,
        password,
        businessName,
        businessType,
        category,
        location,
        district,
        description,
        businessHoursFrom,
        businessHoursTo,
        logo,
      } = userData;

      // Create user
      console.log('[Registration] Creating seller account for:', email);
      const user = await User.create({
        name: `${firstName} ${lastName}`,
        email: email.toLowerCase(),
        phone,
        password,
        role: 'seller',
        businessType: businessType || 'product', // Add businessType
      });

      console.log('[Registration] Creating seller profile for user:', user._id);
      
      // Properly handle logo - ensure it's a string or null, not an object
      const logoValue = logo && typeof logo === 'string' && logo.trim() !== '' ? logo : null;
      
      // Create seller profile
      await SellerProfile.create({
        userId: user._id,
        businessName,
        businessType,
        category,
        location,
        district,
        description,
        businessHours: {
          from: businessHoursFrom,
          to: businessHoursTo,
        },
        logo: logoValue,
      });

      console.log('[Registration] Seller account and profile created successfully');
      return NextResponse.json(
        {
          success: true,
          message: 'Seller account created successfully',
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('[Registration] Error:', error.message);
    console.error('[Registration] Stack:', error.stack);

    // Handle duplicate key error
    if (error.code === 11000) {
      console.error('[Registration] Duplicate key error');
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error('[Registration] Validation errors:', messages);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
