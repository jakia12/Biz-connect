/**
 * Admin Dashboard Layout
 * Wraps all admin dashboard pages with sidebar
 */

import { authOptions } from '@/backend/shared/config/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== 'admin') {
    redirect('/dashboard/buyer');
  }

  return (
    <DashboardLayout role="admin">
      {children}
    </DashboardLayout>
  );
}
