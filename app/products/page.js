/**
 * Products Marketplace Page
 * Premium design with advanced filtering and beautiful UI
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️', count: 2500 },
    { id: 'fashion', name: 'Fashion & Apparel', icon: '👗', count: 850 },
    { id: 'food', name: 'Food & Beverage', icon: '🍔', count: 620 },
    { id: 'crafts', name: 'Handmade Crafts', icon: '🎨', count: 450 },
    { id: 'electronics', name: 'Electronics', icon: '📱', count: 380 },
  ];

  const products = [
    {
      id: 1,
      title: "Premium Cotton T-Shirts (Bulk 100pcs)",
      price: 15000,
      originalPrice: 20000,
      discount: "-25%",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 56,
      seller: { name: "Garments Direct", verified: true },
      badge: { text: "Wholesale", variant: "success" },
      sold: 1200
    },
    {
      id: 2,
      title: "Organic Honey 1kg (Wholesale)",
      price: 800,
      originalPrice: 1000,
      discount: "-20%",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 112,
      seller: { name: "Sundarban Mart", verified: true },
      badge: { text: "Best Seller", variant: "warning" },
      sold: 2500
    },
    {
      id: 3,
      title: "Handmade Jute Bags (Pack of 50)",
      price: 2500,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 78,
      seller: { name: "Eco Crafts BD", verified: true },
      badge: { text: "Eco-Friendly", variant: "success" },
      sold: 890
    },
    {
      id: 4,
      title: "Fresh Vegetables Box (5kg)",
      price: 350,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop",
      rating: 4.6,
      reviews: 234,
      seller: { name: "Farm Fresh BD", verified: true },
      sold: 3400
    },
    {
      id: 5,
      title: "Leather Wallets (Bulk 20pcs)",
      price: 4500,
      originalPrice: 6000,
      discount: "-25%",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 145,
      seller: { name: "Leather Works", verified: true },
      badge: { text: "Hot Deal", variant: "danger" },
      sold: 670
    },
    {
      id: 6,
      title: "Ceramic Dinner Set (24 pieces)",
      price: 3200,
      image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 89,
      seller: { name: "Home Essentials", verified: true },
      sold: 450
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-primary via-primary-dark to-primary text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-6 font-heading">Wholesale Products</h1>
            <p className="text-xl opacity-90 mb-8">Quality products at unbeatable wholesale prices</p>
            
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search for products..."
                className="flex-1 px-6 py-4 text-gray-900 outline-none text-lg"
              />
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Pills */}
      <motion.section 
        className="bg-white border-b border-gray-200 sticky top-[73px] z-40 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-xs opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <motion.aside 
            className="lg:col-span-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-32">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Price Range</h4>
                <div className="space-y-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    className="w-full accent-primary"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>৳0</span>
                    <span>৳100,000+</span>
                  </div>
                </div>
              </div>

              {/* Discount */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Discount</h4>
                <div className="space-y-2">
                  {['50% or more', '40% or more', '30% or more', '20% or more', '10% or more'].map((discount) => (
                    <label key={discount} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-gray-700">{discount}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Seller Type */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Seller Type</h4>
                <div className="space-y-2">
                  {['Verified Sellers', 'Top Rated', 'New Sellers'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Minimum Rating</h4>
                <div className="space-y-2">
                  {[5, 4.5, 4, 3.5].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="rating" className="w-4 h-4 accent-primary" />
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-700">{rating}+</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Products Grid */}
          <motion.div 
            className="lg:col-span-3"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">{products.length}</span> products available
              </p>
              <div className="flex items-center gap-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="best-selling">Best Selling</option>
                </select>

                <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {products.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button 
                  key={page}
                  className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-primary text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
