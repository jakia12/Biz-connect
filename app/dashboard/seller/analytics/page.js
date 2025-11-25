/**
 * Seller Analytics Page
 * View sales analytics, performance metrics, and insights
 */

'use client';

import { useState } from 'react';

export default function SellerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7days');

  const stats = {
    totalRevenue: 125000,
    totalOrders: 156,
    avgOrderValue: 801,
    conversionRate: 3.2
  };

  const topProducts = [
    { name: 'Professional Logo Design', sales: 45, revenue: 67500 },
    { name: 'Business Card Design', sales: 32, revenue: 25600 },
    { name: 'Social Media Graphics', sales: 28, revenue: 33600 },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your business performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-green-600 font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">৳{stats.totalRevenue.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xs text-blue-600 font-medium">+8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalOrders}</h3>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs text-purple-600 font-medium">+5.1%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">৳{stats.avgOrderValue.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Avg Order Value</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs text-orange-600 font-medium">+2.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.conversionRate}%</h3>
          <p className="text-sm text-gray-600">Conversion Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-6">Revenue Overview</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 65, 45, 80, 55, 90, 70].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary-dark cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-6">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-600">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">৳{product.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-6">Traffic Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { source: 'Direct', visitors: 1250, percentage: 45 },
            { source: 'Search', visitors: 890, percentage: 32 },
            { source: 'Social', visitors: 640, percentage: 23 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.source}</span>
                <span className="text-sm text-gray-600">{item.visitors} visits</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
