/**
 * Services Marketplace Page
 * Premium design with advanced filtering and beautiful UI
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('recommended');

  const categories = [
    { id: 'all', name: 'All Services', icon: '🎯', count: 1250 },
    { id: 'design', name: 'Graphics & Design', icon: '🎨', count: 450 },
    { id: 'development', name: 'Web Development', icon: '💻', count: 320 },
    { id: 'marketing', name: 'Digital Marketing', icon: '📢', count: 280 },
    { id: 'writing', name: 'Content Writing', icon: '✍️', count: 200 },
  ];

  const services = [
    {
      id: 1,
      title: "Professional Business Logo Design",
      price: 1500,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 120,
      seller: { name: "Creative Studio BD", verified: true, level: "Top Rated" },
      badge: { text: "Best Seller", variant: "success" },
      deliveryTime: "2 days"
    },
    {
      id: 2,
      title: "E-commerce Website Development",
      price: 25000,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      rating: 5.0,
      reviews: 45,
      seller: { name: "Tech Pro BD", verified: true, level: "Top Rated" },
      badge: { text: "Featured", variant: "info" },
      deliveryTime: "7 days"
    },
    {
      id: 3,
      title: "Digital Marketing Package - SEO & Social Media",
      price: 8000,
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 89,
      seller: { name: "Marketing Experts", verified: true, level: "Level 2" },
      deliveryTime: "3 days"
    },
    {
      id: 4,
      title: "Professional Content Writing - 1000 Words",
      price: 500,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      seller: { name: "Writers Hub", verified: true, level: "Level 1" },
      deliveryTime: "1 day"
    },
    {
      id: 5,
      title: "Mobile App UI/UX Design",
      price: 12000,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 78,
      seller: { name: "Design Masters", verified: true, level: "Top Rated" },
      badge: { text: "New", variant: "warning" },
      deliveryTime: "5 days"
    },
    {
      id: 6,
      title: "Video Editing & Animation Services",
      price: 3500,
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 92,
      seller: { name: "Video Pro BD", verified: true, level: "Level 2" },
      deliveryTime: "4 days"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Hero Section with Search */}
      <motion.section 
        className="relative bg-gradient-to-r from-primary via-primary-dark to-primary text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-6 font-heading">Find the Perfect Service</h1>
            <p className="text-xl opacity-90 mb-8">Browse thousands of professional services from verified sellers</p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search for any service..."
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
                    max="50000" 
                    className="w-full accent-primary"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>৳0</span>
                    <span>৳50,000+</span>
                  </div>
                </div>
              </div>

              {/* Seller Level */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Seller Level</h4>
                <div className="space-y-2">
                  {['Top Rated', 'Level 2', 'Level 1', 'New Seller'].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Time */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Delivery Time</h4>
                <div className="space-y-2">
                  {['24 Hours', 'Up to 3 days', 'Up to 7 days', 'Anytime'].map((time) => (
                    <label key={time} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-gray-700">{time}</span>
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

          {/* Services Grid */}
          <motion.div 
            className="lg:col-span-3"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">{services.length}</span> services available
              </p>
              <div className="flex items-center gap-4">
                {/* Sort */}
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
                </select>

                {/* View Mode */}
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

            {/* Services Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {services.map((service) => (
                <motion.div key={service.id} variants={fadeInUp}>
                  <ProductCard product={service} />
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
