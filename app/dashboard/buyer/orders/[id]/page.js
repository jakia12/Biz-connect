/**
 * Buyer Order Detail Page
 * Detailed view of a specific order
 */

'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderDetailPage({ params }) {
  // Mock data - in a real app, fetch based on params.id
  const order = {
    id: "ORD-7829",
    date: "Oct 24, 2023",
    status: "In Progress",
    total: 1500,
    paymentMethod: "Bkash",
    shippingAddress: "House 12, Road 5, Dhanmondi, Dhaka",
    seller: {
      name: "Creative Studio BD",
      email: "contact@creativestudio.bd",
      phone: "+880 1712 345678",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=100&h=100&fit=crop"
    },
    items: [
      { 
        id: 1,
        title: "Professional Business Logo Design", 
        price: 1500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=200&fit=crop"
      }
    ],
    timeline: [
      { status: "Order Placed", date: "Oct 24, 10:30 AM", completed: true },
      { status: "Payment Confirmed", date: "Oct 24, 10:35 AM", completed: true },
      { status: "Processing", date: "Oct 24, 11:00 AM", completed: true },
      { status: "Shipped / Delivered", date: "Pending", completed: false },
    ]
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/dashboard/buyer/orders" className="hover:text-primary">My Orders</Link>
            <span>/</span>
            <span>{order.id}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Order Details</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Invoice</Button>
          <Link href="/messages">
            <Button variant="primary">Contact Seller</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Order Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">৳{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="text-xl font-bold text-primary">৳{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-6">Order Status</h3>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-8 relative">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 bg-white ${
                      step.completed ? 'border-primary bg-primary text-white' : 'border-gray-300'
                    }`}>
                      {step.completed && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-bold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </h4>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6">
          
          {/* Shipping Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Shipping Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-gray-500">Address</span>
                <span className="font-medium text-gray-900">{order.shippingAddress}</span>
              </div>
              <div>
                <span className="block text-gray-500">Payment Method</span>
                <span className="font-medium text-gray-900">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Seller Information</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 relative overflow-hidden">
                <Image src={order.seller.image} alt={order.seller.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{order.seller.name}</h4>
                <Link href="/seller/1" className="text-xs text-primary hover:underline">View Profile</Link>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {order.seller.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {order.seller.phone}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
