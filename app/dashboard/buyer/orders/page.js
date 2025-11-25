/**
 * Buyer Orders Page
 * List of all orders placed by the buyer with status and actions
 */

'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function BuyerOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const orders = [
    {
      id: "ORD-7829",
      date: "Oct 24, 2023",
      status: "In Progress",
      total: 1500,
      seller: {
        name: "Creative Studio BD",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=100&h=100&fit=crop"
      },
      items: [
        { title: "Professional Business Logo Design", quantity: 1 }
      ]
    },
    {
      id: "ORD-7828",
      date: "Oct 20, 2023",
      status: "Delivered",
      total: 15000,
      seller: {
        name: "Garments Direct",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop"
      },
      items: [
        { title: "Premium Cotton T-Shirts (Bulk 100pcs)", quantity: 1 }
      ]
    },
    {
      id: "ORD-7825",
      date: "Oct 15, 2023",
      status: "Cancelled",
      total: 800,
      seller: {
        name: "Sundarban Mart",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=100&h=100&fit=crop"
      },
      items: [
        { title: "Organic Honey 1kg", quantity: 2 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'in progress': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">My Orders</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 relative overflow-hidden">
                  <Image src={order.seller.image} alt={order.seller.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{order.seller.name}</h3>
                  <p className="text-sm text-gray-500">Order #{order.id} • {order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="font-bold text-gray-900">৳{order.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    {item.quantity}x {item.title}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/messages`}>
                  <Button variant="outline" size="sm">Contact Seller</Button>
                </Link>
                <Link href={`/dashboard/buyer/orders/${order.id}`}>
                  <Button variant="primary" size="sm">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
