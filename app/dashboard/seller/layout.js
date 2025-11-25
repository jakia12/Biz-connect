/**
 * Seller Dashboard Layout
 * Wraps all seller dashboard pages with sidebar
 */

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SellerDashboardLayout({ children }) {
  return (
    <DashboardLayout role="seller">
      {children}
    </DashboardLayout>
  );
}
