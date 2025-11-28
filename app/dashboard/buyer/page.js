'use client';

import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { useGetOrdersQuery } from '@/lib/redux/features/ordersApi';
import { useGetWishlistQuery } from '@/lib/redux/features/wishlistApi';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Heart, LogOut, MessageSquare, Package, Settings, ShoppingBag, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function BuyerDashboard() {
  // RTK Query hooks
  const { data: wishlistData = [] } = useGetWishlistQuery();
  const { data: ordersData, isLoading: loadingOrders } = useGetOrdersQuery('buyer', {
    pollingInterval: 30000, // Poll every 30 seconds for real-time updates
  });

  const orders = ordersData?.orders || [];
  const wishlist = wishlistData;

  // Calculate stats from orders data
  const total = ordersData?.pagination?.total || orders.length;
  const inProgress = orders.filter(o => 
    ['pending', 'processing', 'shipped'].includes(o.status)
  ).length;
  const completed = orders.filter(o => 
    o.status === 'delivered'
  ).length;

  const stats = { total, inProgress, completed };
  const loading = loadingOrders;

  const getStatusBadge = (status) => {
    const styles = {
      'pending': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
      'processing': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: Package },
      'shipped': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: TrendingUp },
      'delivered': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle },
      'cancelled': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: LogOut }
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
              <h1 className="text-2xl font-bold text-gray-900 font-heading">My Dashboard</h1>
              <p className="text-gray-500 text-sm">Welcome back, Buyer</p>
            </div>
            <Link href="/">
              <Button variant="primary" className="px-5 py-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Browse Products
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.total}</h3>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.inProgress}</h3>
                <p className="text-gray-500 text-sm font-medium">In Progress</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{wishlist?.length || 0}</h3>
                <p className="text-gray-500 text-sm font-medium">Saved Items</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.completed}</h3>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                <Link href="/dashboard/buyer/orders" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                  View All Orders
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-12 text-center text-gray-500">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    Loading orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No orders yet</p>
                    <p className="text-sm">Start shopping to see your orders here</p>
                  </div>
                ) : (
                  orders.map((order) => {
                    const statusInfo = getStatusBadge(order.status);
                    const StatusIcon = statusInfo.icon;
                    const firstItem = order.items?.[0];
                    
                    return (
                      <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex gap-5">
                          <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden border border-gray-200">
                            {/* Placeholder for product image if available */}
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                              <Package className="w-8 h-8" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                  {firstItem?.title || 'Order'}
                                  {order.items?.length > 1 && <span className="text-gray-500 font-normal text-sm ml-2">+{order.items.length - 1} more</span>}
                                </h3>
                                <p className="text-sm text-gray-500">Sold by <span className="font-medium text-gray-700">{order.sellerId?.businessName || order.sellerId?.name}</span></p>
                              </div>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${statusInfo.bg} ${statusInfo.text} border ${statusInfo.border}`}>
                                <StatusIcon className="w-3.5 h-3.5" />
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">#{order.orderId}</span>
                                <span>•</span>
                                <span>{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-900">৳{order.totalAmount?.toLocaleString()}</span>
                                <Link href={`/dashboard/buyer/orders/${order._id}`}>
                                  <Button variant="outline" size="sm" className="hover:bg-white">
                                    Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/dashboard/buyer/messages" className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 transition-colors group border border-transparent hover:border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors text-blue-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-700 group-hover:text-blue-700 block transition-colors">Messages</span>
                    <span className="text-xs text-gray-500">Check your inbox</span>
                  </div>
                </Link>
                <Link href="/dashboard/buyer/saved" className="flex items-center gap-4 p-3 rounded-xl hover:bg-rose-50 transition-colors group border border-transparent hover:border-rose-100">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center group-hover:bg-rose-200 transition-colors text-rose-600">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-700 group-hover:text-rose-700 block transition-colors">Saved Items</span>
                    <span className="text-xs text-gray-500">View your wishlist</span>
                  </div>
                </Link>
                <Link href="/dashboard/buyer/settings" className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-50 transition-colors group border border-transparent hover:border-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors text-purple-600">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-700 group-hover:text-purple-700 block transition-colors">Settings</span>
                    <span className="text-xs text-gray-500">Manage account</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-black/10 rounded-full blur-xl"></div>
              
              <h3 className="text-lg font-bold mb-2 relative z-10">Need Help?</h3>
              <p className="text-sm text-white/90 mb-6 relative z-10 leading-relaxed">
                Our support team is available 24/7 to assist you with any questions or issues.
              </p>
              <button className="bg-white text-primary px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors w-full shadow-sm relative z-10">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>

        {/* Saved Items Section */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-heading flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              Saved Items
            </h2>
            <Link href="/wishlist" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              View All
            </Link>
          </div>
          {wishlist && wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.slice(0, 4).map((item) => (
                <ProductCard 
                  key={item._id} 
                  product={{
                    id: item.productId._id,
                    title: item.productId.title,
                    price: item.productId.price,
                    image: item.productId.images?.[0] || item.productId.image,
                    rating: item.productId.rating,
                    reviews: item.productId.reviewCount
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-900 font-medium mb-1">No saved items yet</p>
              <p className="text-gray-500 text-sm mb-6">Items you love will appear here</p>
              <Link href="/products">
                <Button variant="primary">Start Shopping</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
