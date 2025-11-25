/**
 * Browse Page
 * Product/Service listing with filters and search
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { useState } from 'react';

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('newest');

  // Mock data
  const products = [
    {
      id: 1,
      title: "Professional Business Logo Design",
      price: 1500,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 120,
      seller: { name: "Creative Studio BD", verified: true },
      badge: { text: "Service", variant: "info" },
      category: "design"
    },
    {
      id: 2,
      title: "Premium Cotton T-Shirts (Bulk 100pcs)",
      price: 15000,
      originalPrice: 20000,
      discount: "-25%",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 56,
      seller: { name: "Garments Direct", verified: true },
      category: "fashion"
    },
    {
      id: 3,
      title: "E-commerce Website Development",
      price: 25000,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      rating: 5.0,
      reviews: 45,
      seller: { name: "Tech Pro BD", verified: true },
      badge: { text: "Service", variant: "info" },
      category: "development"
    },
    {
      id: 4,
      title: "Organic Honey 1kg (Wholesale)",
      price: 800,
      originalPrice: 1000,
      discount: "-20%",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 112,
      seller: { name: "Sundarban Mart", verified: true },
      category: "food"
    },
    {
      id: 5,
      title: "Social Media Marketing Package",
      price: 8000,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 89,
      seller: { name: "Digital Marketer", verified: true },
      badge: { text: "Service", variant: "info" },
      category: "marketing"
    },
    {
      id: 6,
      title: "Eco-Friendly Packaging Boxes (100pcs)",
      price: 1200,
      image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 34,
      seller: { name: "Pack It Up", verified: true },
      category: "packaging"
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: 156 },
    { id: 'design', name: 'Graphics & Design', count: 45 },
    { id: 'development', name: 'Web Development', count: 32 },
    { id: 'marketing', name: 'Digital Marketing', count: 28 },
    { id: 'fashion', name: 'Fashion & Apparel', count: 23 },
    { id: 'food', name: 'Food & Beverage', count: 18 },
    { id: 'packaging', name: 'Packaging', count: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Browse All</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 text-lg mb-6">Filters</h3>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 text-sm mb-4">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-xs ${selectedCategory === cat.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 text-sm mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 text-sm mb-4">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button key={rating} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span>& Up</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Seller Type */}
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-4">Seller Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                    <span className="text-sm text-gray-700">Verified Sellers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                    <span className="text-sm text-gray-700">Top Rated</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                    <span className="text-sm text-gray-700">Fast Delivery</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-heading">Browse All Products & Services</h1>
                  <p className="text-gray-600 mt-1">Showing {products.length} results</p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 outline-none focus:border-primary"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
