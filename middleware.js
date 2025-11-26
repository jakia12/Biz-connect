import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Get the origin from the request
  const origin = request.headers.get('origin');
  
  // List of allowed origins (your frontend URLs)
  const allowedOrigins = [
    'https://biz-connect-2k5u.vercel.app', // Production deployment
    'http://localhost:3000', // Local development
    'http://localhost:3001', // Alternative local port
  ];

  // Check if the origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: response.headers,
    });
  }

  return response;
}

// Apply middleware to API routes only
export const config = {
  matcher: '/api/:path*',
};
