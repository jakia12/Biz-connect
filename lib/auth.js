/**
 * Authentication Utilities
 * Helper functions for server-side auth
 */

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

/**
 * Get the current session on the server
 * Use in Server Components and API Routes
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Require authentication
 * Throws error if user is not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
  
  return session;
}

/**
 * Require specific role
 * Throws error if user doesn't have the required role
 */
export async function requireRole(role) {
  const session = await requireAuth();
  
  if (session.user.role !== role) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  
  return session;
}

/**
 * Check if user is authenticated (returns boolean)
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Get current user from session
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}
