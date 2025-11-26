/**
 * Seller Analytics Page
 * View sales and performance analytics - Connected to API
 */

'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SellerAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30'); // days

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/seller/analytics?days=${dateRange}`);
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
      } else {
        toast.error(data.error || 'Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-600 ml-4">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your sales and performance</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ৳{analytics?.orders?.totalRevenue?.toLocaleString() || 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">{analytics?.dateRange?.days || dateRange} days</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Orders</p>
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">{analytics?.orders?.totalOrders || 0}</p>
          <p className="text-sm text-gray-500 mt-1">
            {analytics?.orders?.deliveredOrders || 0} delivered
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Products</p>
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">{analytics?.products?.totalProducts || 0}</p>
          <p className="text-sm text-gray-500 mt-1">
            {analytics?.products?.activeProducts || 0} active
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Average Rating</p>
            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {analytics?.reviews?.averageRating || '0.0'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {analytics?.reviews?.totalReviews || 0} reviews
          </p>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Order Status</h3>
          <div className="space-y-3">
            {[
              { label: 'Pending', value: analytics?.orders?.pendingOrders || 0, color: 'bg-yellow-500' },
              { label: 'Confirmed', value: analytics?.orders?.confirmedOrders || 0, color: 'bg-blue-500' },
              { label: 'Shipped', value: analytics?.orders?.shippedOrders || 0, color: 'bg-indigo-500' },
              { label: 'Delivered', value: analytics?.orders?.deliveredOrders || 0, color: 'bg-green-500' },
              { label: 'Cancelled', value: analytics?.orders?.cancelledOrders || 0, color: 'bg-red-500' },
            ].map((status) => (
              <div key={status.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                  <span className="text-gray-700">{status.label}</span>
                </div>
                <span className="font-bold text-gray-900">{status.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Product Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Views</span>
              <span className="font-bold text-gray-900">{analytics?.products?.totalViews?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Sales</span>
              <span className="font-bold text-gray-900">{analytics?.products?.totalSales || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Average per Product</span>
              <span className="font-bold text-gray-900">
                {analytics?.products?.totalProducts > 0 
                  ? Math.round((analytics?.products?.totalSales || 0) / analytics.products.totalProducts)
                  : 0
                } sales
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">Top Selling Products</h3>
        {analytics?.topProducts?.length > 0 ? (
          <div className="space-y-3">
            {analytics.topProducts.map((product, idx) => (
              <div key={product._id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">#{idx + 1}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{product.title}</h4>
                    <p className="text-sm text-gray-500">৳{product.price?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{product.salesCount} sales</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No sales data yet</p>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Recent Orders</h3>
        {analytics?.recentOrders?.length > 0 ? (
          <div className="space-y-3">
            {analytics.recentOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-mono text-sm font-medium text-gray-900">{order.orderId}</p>
                  <p className="text-sm text-gray-500">
                    {order.buyerId?.name} • {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">৳{order.totalAmount?.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 capitalize">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No recent orders</p>
        )}
      </div>
    </div>
  );
}
