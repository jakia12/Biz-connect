'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    DollarSign,
    MessageSquare,
    Package,
    Plus,
    Settings,
    ShoppingBag,
    Star,
    TrendingUp,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayOrders: 0,
    weeklyRevenue: 0,
    totalProducts: 0,
    avgRating: 0,
    totalReviews: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch Stats and Orders in parallel
      const [statsResponse, ordersResponse] = await Promise.all([
        fetch('/api/seller/dashboard'),
        fetch('/api/orders?limit=5')
      ]);

      const statsData = await statsResponse.json();
      const ordersData = await ordersResponse.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }

      if (ordersData.success) {
        setOrders(ordersData.orders || []);
      } else {
        // Only show error if orders failed, but stats might have succeeded
        console.error('Failed to fetch orders:', ordersData.error);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
      completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
      delivered: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
    };
    return styles[status] || styles.pending;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-body">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 backdrop-blur-xl bg-white/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-heading">Seller Dashboard</h1>
              <p className="text-gray-500 text-sm">Overview of your business performance</p>
            </div>
            <Link href="/dashboard/seller/products/add">
              <Button variant="primary" className="px-5 py-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <motion.div 
        className="container mx-auto px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Today's Orders */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShoppingBag className="w-24 h-24 text-blue-600" />
            </div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1 relative z-10">{stats.todayOrders}</h3>
            <p className="text-gray-500 text-sm font-medium relative z-10">Today's Orders</p>
          </motion.div>

          {/* Weekly Revenue */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign className="w-24 h-24 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +15%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1 relative z-10">৳{stats.weeklyRevenue.toLocaleString()}</h3>
            <p className="text-gray-500 text-sm font-medium relative z-10">Weekly Revenue</p>
          </motion.div>

          {/* Total Products */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Package className="w-24 h-24 text-purple-600" />
            </div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <Link href="/dashboard/seller/products" className="text-xs font-bold text-purple-600 hover:bg-purple-50 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1 relative z-10">{stats.totalProducts}</h3>
            <p className="text-gray-500 text-sm font-medium relative z-10">Active Products</p>
          </motion.div>

          {/* Average Rating */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Star className="w-24 h-24 text-amber-500" />
            </div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                {stats.totalReviews} reviews
              </span>
            </div>
            <div className="flex items-baseline gap-2 relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.avgRating}</h3>
              <span className="text-sm text-gray-400">/ 5.0</span>
            </div>
            <p className="text-gray-500 text-sm font-medium relative z-10">Average Rating</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                <Link href="/dashboard/seller/orders" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                  View All Orders
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Buyer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                          Loading orders...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium mb-2">No orders yet</p>
                          <p className="text-sm">Orders from buyers will appear here</p>
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => {
                        const firstItem = order.items?.[0];
                        const statusInfo = getStatusBadge(order.status);
                        
                        return (
                          <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">#{order.orderId}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                  <Package className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-gray-900">
                                  {firstItem?.title || 'Order'}
                                  {order.items?.length > 1 && <span className="text-gray-500 font-normal ml-1">+{order.items.length - 1}</span>}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                                  {order.buyerId?.name?.charAt(0) || 'U'}
                                </div>
                                {order.buyerId?.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">৳{order.totalAmount?.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              <Link href={`/dashboard/seller/orders/${order._id}`}>
                                <Button variant="outline" size="sm" className="hover:bg-white hover:text-primary hover:border-primary transition-colors">
                                  View
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/dashboard/seller/products/add" className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors group border border-transparent hover:border-primary/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors text-primary">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">Add New Product</span>
                </Link>
                <Link href="/dashboard/seller/messages" className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 transition-colors group border border-transparent hover:border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors text-blue-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-700 group-hover:text-blue-700 block transition-colors">Messages</span>
                    <span className="text-xs text-gray-500">3 unread</span>
                  </div>
                </Link>
                <Link href="/dashboard/seller/profile" className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-50 transition-colors group border border-transparent hover:border-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors text-purple-600">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-purple-700 transition-colors">Edit Profile</span>
                </Link>
              </div>
            </div>

            {/* Performance Tips */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-black/10 rounded-full blur-xl"></div>
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <h3 className="text-lg font-bold">Pro Tip</h3>
              </div>
              <p className="text-sm text-white/90 mb-6 relative z-10 leading-relaxed">
                Products with high-quality images get <span className="font-bold text-white">3x more orders</span>. Upload clear photos today!
              </p>
              <button className="bg-white text-primary px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors w-full shadow-sm relative z-10">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
