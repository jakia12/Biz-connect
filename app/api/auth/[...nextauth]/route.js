/**
 * NextAuth Configuration
 * Using JWT strategy for session management
 */

import { authOptions } from '@/backend/shared/config/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

// Export for App Router
export { handler as GET, handler as POST };

