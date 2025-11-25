/**
 * Buyer Dashboard Layout
 * Wraps all buyer dashboard pages with sidebar
 */

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function BuyerDashboardLayout({ children }) {
  return (
    <DashboardLayout role="buyer">
      {children}
    </DashboardLayout>
  );
}
