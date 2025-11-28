/**
 * Top Product Sellers Component
 * Displays verified sellers offering products
 */

'use client';

import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Package, Star, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';

export default function TopProductSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductSellers();
  }, []);

  const fetchProductSellers = async () => {
    try {
      setLoading(true);
      // Fetch sellers with product-related categories
      const response = await fetch('/api/sellers?limit=4&type=product');
      const data = await response.json();
      
      if (data.success) {
        setSellers(data.sellers);
      }
    } catch (error) {
      console.error('Error fetching product sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex items-center justify-between mb-12"
          variants={fadeInUp}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold text-gray-900 font-heading">Verified Product Sellers</h2>
            </div>
            <p className="text-gray-600 text-lg">Quality wholesale products from trusted suppliers</p>
          </div>
          <Link href="/verified-sellers?type=product">
            <Button variant="outline" className="flex items-center gap-2">
              View All Product Sellers
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex gap-2 mb-3">
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sellers.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {sellers.map((seller) => (
              <motion.div 
                key={seller._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-100"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <Link href={`/seller/${seller._id}`}>
                  <div className="relative h-48">
                    <Image 
                      src={seller.profileImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop'}
                      alt={seller.businessName || seller.name}
                      fill
                      className="object-cover"
                    />
                    {seller.isVerified && (
                      <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{seller.businessName || seller.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{seller.businessCategory || 'Product Supplier'}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-900">{seller.rating?.toFixed(1) || '0.0'}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({seller.reviewCount || 0} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Zap className="w-4 h-4 text-primary" />
                      {seller.totalOrders || 0} orders completed
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No product suppliers found at the moment.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
