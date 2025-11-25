/**
 * Navbar Component - BizConnect
 * Premium, Spacious, Fiverr-Inspired Layout
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: "Food & Beverage", icon: "🍔", type: "product" },
    { name: "Fashion & Apparel", icon: "👗", type: "product" },
    { name: "Handmade Crafts", icon: "🎨", type: "product" },
    { name: "Electronics", icon: "📱", type: "product" },
    { name: "Home & Living", icon: "🏠", type: "product" },
    { name: "Beauty & Care", icon: "💄", type: "product" },
    { name: "Agriculture", icon: "🌾", type: "product" },
    { name: "Graphics & Design", icon: "🎨", type: "service" },
    { name: "Digital Marketing", icon: "📢", type: "service" },
    { name: "Web Development", icon: "💻", type: "service" },
    { name: "Content Writing", icon: "✍️", type: "service" },
    { name: "Video & Animation", icon: "🎬", type: "service" },
    { name: "Business Consulting", icon: "📊", type: "service" },
  ];

  const serviceCategories = categories.filter(cat => cat.type === 'service');
  const productCategories = categories.filter(cat => cat.type === 'product');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-body">
      {/* 1. Top Bar (Subtle & Clean) */}
      <div className="bg-gray-50 border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-6 py-2.5">
          <div className="flex justify-between items-center text-xs font-medium text-gray-500">
            <div className="flex gap-6">
              <span>Welcome to BizConnect</span>
              <span>Helpline: <span className="text-primary">16xxx</span></span>
            </div>
            <div className="flex gap-6 items-center">
              <select className="bg-transparent border-none outline-none cursor-pointer hover:text-primary transition-colors">
                <option>English</option>
                <option>বাংলা</option>
              </select>
              <select className="bg-transparent border-none outline-none cursor-pointer hover:text-primary transition-colors">
                <option>BDT (৳)</option>
                <option>USD ($)</option>
              </select>
              <div className="h-3 w-px bg-gray-300"></div>
              <Link href="/login" className="hover:text-primary transition-colors">Sign In</Link>
              <Link href="/register" className="text-primary hover:text-primary-dark transition-colors">Join as Seller</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Spacious) */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 min-w-max group">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-primary/30 transition-all">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 tracking-tight leading-none font-heading">
                BizConnect
              </span>
              <span className="text-[10px] text-gray-500 tracking-widest uppercase font-semibold mt-0.5">SME Marketplace</span>
            </div>
          </Link>

          {/* Search Bar (Wide & Modern) */}
          <div className="hidden md:flex flex-1 max-w-3xl relative">
            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden hover:border-primary transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary h-12 shadow-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="What service or product are you looking for?"
                  className="w-full h-full px-5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="border-l border-gray-200 bg-gray-50 px-4 flex items-center">
                <select className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer h-full">
                  <option>All Categories</option>
                  <option>Products</option>
                  <option>Services</option>
                </select>
              </div>
              <button className="bg-primary text-white px-8 hover:bg-primary-dark transition-colors font-bold text-sm">
                Search
              </button>
            </div>
          </div>

          {/* Icons (Clean) */}
          <div className="flex items-center gap-8">
            <Link href="/wishlist" className="relative group flex flex-col items-center gap-1">
              <div className="relative p-1">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              <span className="text-[10px] font-medium text-gray-500 group-hover:text-primary transition-colors">Saved</span>
            </Link>
            
            <Link href="/messages" className="relative group flex flex-col items-center gap-1">
              <div className="relative p-1">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
              </div>
              <span className="text-[10px] font-medium text-gray-500 group-hover:text-primary transition-colors">Chat</span>
            </Link>

            <Link href="/cart" className="relative group flex flex-col items-center gap-1">
              <div className="relative p-1">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">2</span>
              </div>
              <span className="text-[10px] font-medium text-gray-500 group-hover:text-primary transition-colors">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar (Clean & Separated) */}
      <div className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-10">
            {/* Browse Categories Button */}
            <div className="relative group py-4">
              <button className="flex items-center gap-3 text-sm font-bold text-gray-800 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Browse Categories
                <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu - Organized by Products & Services */}
              <div className="absolute top-full left-0 w-[500px] bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  {/* Products Column */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Products
                    </h3>
                    <ul className="space-y-1">
                      {productCategories.map((cat, idx) => (
                        <li key={idx}>
                          <Link href={`/products/${cat.name.toLowerCase().replace(/ /g, '-')}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors">
                            <span className="text-base opacity-80">{cat.icon}</span>
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Services Column */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Services
                    </h3>
                    <ul className="space-y-1">
                      {serviceCategories.map((cat, idx) => (
                        <li key={idx}>
                          <Link href={`/services/${cat.name.toLowerCase().replace(/ /g, '-')}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors">
                            <span className="text-base opacity-80">{cat.icon}</span>
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Menu Links */}
            <nav className="flex items-center gap-8 overflow-x-auto">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Home</Link>
              <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Products</Link>
              <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Services</Link>
              <Link href="/vendors" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Verified Sellers</Link>
              <Link href="/community" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Community</Link>
            </nav>

            <div className="ml-auto hidden lg:block text-sm font-medium text-primary bg-primary/5 px-4 py-2 rounded-full">
              Free Shipping on Orders ৳5000+
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
