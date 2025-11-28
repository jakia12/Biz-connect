/**
 * Services Marketplace Page
 * Premium design with advanced filtering and beautiful UI
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ServiceCard from '@/components/service/ServiceCard';
import { staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch services on mount and when filters change
  useEffect(() => {
    fetchServices();
  }, [selectedCategory, currentPage, sortBy, searchQuery]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        sort: sortBy === 'price-low' ? 'price' : sortBy === 'price-high' ? 'price' : 'rating',
        order: sortBy === 'price-low' ? 'asc' : 'desc'
      });

      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/services?${params}`);
      const data = await response.json();

      if (data.success) {
        setServices(data.services);
        setCategories(['all', ...data.categories]);
        setPagination(data.pagination);
      } else {
        toast.error('Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchServices();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    // Update URL without reload
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  const categoryIcons = {
    'Graphics & Design': '🎨',
    'Web Development': '💻',
    'Digital Marketing': '📢',
    'Content Writing': '✍️',
    'Video & Animation': '🎬',
    'Business Consulting': '💼',
    'all': '🎯'
  };

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors"
              >
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
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{categoryIcons[cat] || '✨'}</span>
                <span className="capitalize">{cat === 'all' ? 'All Services' : cat}</span>
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
                <span className="font-bold text-gray-900">{pagination?.totalServices || 0}</span> services available
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
              {loading ? (
                // Skeleton loading
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
                ))
              ) : services.length > 0 ? (
                services.map((service) => {
                  console.log('Rendering service:', service);
                  return (
                    <div key={service._id} className="mb-6">
                      <ServiceCard service={service} />
                    </div>
                  );
                })
              ) : (
                <div className="col-span-3 text-center py-10">
                  <div className="text-gray-400 mb-4 text-6xl">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === page 
                        ? 'bg-primary text-white' 
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Loading component for Suspense fallback
function ServicesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 font-heading">Find the Perfect Service</h1>
            <p className="text-xl opacity-90 mb-8">Loading services...</p>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Wrap with Suspense to handle useSearchParams
export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesLoading />}>
      <ServicesContent />
    </Suspense>
  );
}
