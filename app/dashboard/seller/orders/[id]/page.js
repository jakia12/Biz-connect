/**
 * Seller Order Details Page
 * View and manage a single order - Connected to API
 */

'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SellerOrderDetailsPage({ params }) {
  // Unwrap the params Promise
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/seller/orders/${orderId}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        toast.error(data.error || 'Failed to fetch order');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      setUpdating(true);
      const response = await fetch(`/api/seller/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Order status updated');
        setOrder(data.order);
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-purple-100 text-purple-700';
      case 'shipped': return 'bg-indigo-100 text-indigo-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-600 ml-4">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-600">Order not found</p>
          <Link href="/dashboard/seller/orders">
            <Button variant="primary" className="mt-4">Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/dashboard/seller/orders" className="hover:text-primary">Orders</Link>
          <span>/</span>
          <span>{order.orderId}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Order #{order.orderId}</h1>
            <p className="text-gray-600 mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
            {order.status?.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">৳{item.price} each</p>
                </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">৳{order.subtotal?.toLocaleString()}</span>
              </div>
              {order.shippingCost > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">৳{order.shippingCost?.toLocaleString()}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">৳{order.tax?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>৳{order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Shipping Address</h3>
            <div className="text-gray-700">
              <p className="font-medium">{order.shippingAddress?.fullName}</p>
              <p className="mt-2">{order.shippingAddress?.addressLine1}</p>
              {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
              <p>{order.shippingAddress?.country || 'Bangladesh'}</p>
              <p className="mt-2 text-primary font-medium">{order.shippingAddress?.phone}</p>
            </div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              {['confirmed', 'processing', 'shipped', 'delivered'].map(status => (
                <Button
                  key={status}
                  variant={order.status === status ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => updateOrderStatus(status)}
                  disabled={updating || order.status === status}
                >
                  Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
            
            {order.trackingNumber && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                <p className="font-mono text-sm font-medium text-gray-900">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
            <h3 className="font-bold text-blue-900 mb-2">Customer Info</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-blue-600">Name</p>
                <p className="text-blue-900 font-medium">{order.buyerId?.name || order.shippingAddress?.fullName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-blue-600">Email</p>
                <p className="text-blue-900">{order.buyerId?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-blue-600">Phone</p>
                <p className="text-blue-900">{order.buyerId?.phone || order.shippingAddress?.phone || 'N/A'}</p>
              </div>
              {/* <Link href={`/dashboard/seller/messages?buyer=${order.buyerId?._id}`} className="block mt-4">
                <Button variant="primary" size="sm" className="w-full">
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Buyer
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
