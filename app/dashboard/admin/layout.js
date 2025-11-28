/**
 * Admin Dashboard Layout
 * Wraps all admin dashboard pages with sidebar
 */

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdminDashboardLayout({ children }) {
  return (
    <DashboardLayout role="admin">
      {children}
    </DashboardLayout>
  );
}
