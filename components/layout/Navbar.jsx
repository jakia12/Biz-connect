/**
 * Enhanced Navbar Component with Smart Search
 * Fiverr-like search with autocomplete suggestions
 */

'use client';

import { useGetCartQuery } from '@/lib/redux/features/cartApi';
import { useGetWishlistQuery } from '@/lib/redux/features/wishlistApi';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import NotificationBell from '../ui/NotificationBell';

export default function Navbar() {
  const router = useRouter();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const { data: cartData } = useGetCartQuery();
  const { data: wishlistData = [] } = useGetWishlistQuery();
  const { data: session } = useSession();
  
  const cart = cartData?.cart;
  const wishlistCount = wishlistData.length;

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

  // Popular search keywords
  const popularKeywords = [
    { text: "logo design", type: "service", category: "Graphics & Design" },
    { text: "web development", type: "service", category: "Web Development" },
    { text: "seo services", type: "service", category: "Digital Marketing" },
    { text: "content writing", type: "service", category: "Content Writing" },
    { text: "video editing", type: "service", category: "Video & Animation" },
    { text: "handmade jewelry", type: "product", category: "Handmade Crafts" },
    { text: "organic food", type: "product", category: "Food & Beverage" },
    { text: "fashion clothing", type: "product", category: "Fashion & Apparel" },
    { text: "electronics gadgets", type: "product", category: "Electronics" },
    { text: "home decor", type: "product", category: "Home & Living" },
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      
      // Filter categories (all types)
      const categoryMatches = categories
        .filter(cat => cat.name.toLowerCase().includes(query))
        .map(cat => ({
          type: 'category',
          text: cat.name,
          icon: cat.icon,
          itemType: cat.type,
        }));

      // Filter keywords (all types)
      const keywordMatches = popularKeywords
        .filter(kw => kw.text.toLowerCase().includes(query))
        .map(kw => ({
          type: 'keyword',
          text: kw.text,
          itemType: kw.type,
          category: kw.category,
        }));

      // Combine and limit results
      const combined = [...categoryMatches, ...keywordMatches].slice(0, 8);
      setSuggestions(combined);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) return;

    const searchParams = new URLSearchParams();
    searchParams.set('search', query.trim());

    // Default to products page for general search
    router.push(`/products?${searchParams.toString()}`);

    setShowSuggestions(false);
    setSearchQuery('');
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'category') {
      // Navigate to category page
      const categorySlug = suggestion.text.toLowerCase().replace(/ /g, '-');
      if (suggestion.itemType === 'product') {
        router.push(`/products?category=${encodeURIComponent(suggestion.text)}`);
      } else {
        router.push(`/services?category=${encodeURIComponent(suggestion.text)}`);
      }
    } else {
      // Navigate with search query
      handleSearch(suggestion.text, suggestion.itemType + 's');
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={index} className="font-bold text-primary">{part}</strong>
      ) : (
        part
      )
    );
  };

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
              
              {session ? (
                <div className="relative group z-50">
                  <button className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
                    {session.user.name || 'User'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-bold text-gray-900 truncate">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    
                    <Link href={`/dashboard/${session.user.role}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                      Dashboard
                    </Link>
                    
                    <Link href={`/dashboard/${session.user.role}/orders`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                      {session.user.role === 'seller' ? 'Manage Orders' : 'My Orders'}
                    </Link>
                    
                    <Link 
                      href={`/dashboard/${session.user.role}/${session.user.role === 'seller' ? 'profile' : 'settings'}`} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      Profile
                    </Link>
                    
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login" className="hover:text-primary transition-colors">Sign In</Link>
                  <Link href="/register" className="text-primary hover:text-primary-dark transition-colors">Join as Seller</Link>
                </>
              )}
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

          {/* Search Bar with Autocomplete */}
          <div className="hidden md:flex flex-1 max-w-3xl relative" ref={searchRef}>
            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden hover:border-primary transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary h-12 shadow-sm">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="What service or product are you looking for?"
                  className="w-full h-full px-5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button 
                onClick={() => handleSearch()}
                className="bg-primary text-white px-8 hover:bg-primary-dark transition-colors font-bold text-sm"
              >
                Search
              </button>
            </div>

            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-500 px-3 py-2">Suggestions</p>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 group"
                    >
                      {suggestion.type === 'category' ? (
                        <>
                          <span className="text-xl">{suggestion.icon}</span>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              {highlightMatch(suggestion.text, searchQuery)}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{suggestion.itemType}</p>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              {highlightMatch(suggestion.text, searchQuery)}
                            </p>
                            <p className="text-xs text-gray-500">in {suggestion.category}</p>
                          </div>
                          <span className="text-xs text-gray-400 capitalize">{suggestion.itemType}</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Icons (Clean) */}
          <div className="flex items-center gap-8">
            {/* Role Switcher - Only show if user is logged in */}
            {session && (
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.role === 'seller' ? 'Seller Mode' : session.user.role === 'admin' ? 'Admin Mode' : 'Buyer Mode'}
                  </span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-xl border border-gray-100 rounded-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">Switch to</p>
                    
                    {/* Always show buyer dashboard - everyone can browse/buy */}
                    {session.user.role !== 'buyer' && (
                      <Link 
                        href="/dashboard/buyer"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <div>
                          <div className="font-medium">Buyer Dashboard</div>
                          <div className="text-xs text-gray-500">Browse & purchase</div>
                        </div>
                      </Link>
                    )}

                    {/* Only show seller dashboard if user is a seller or admin */}
                    {session.user.role === 'seller' && session.user.role !== 'seller' && (
                      <Link 
                        href="/dashboard/seller"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <div className="font-medium">Seller Dashboard</div>
                          <div className="text-xs text-gray-500">Manage your business</div>
                        </div>
                      </Link>
                    )}

                    {/* Only show admin dashboard if user is admin */}
                    {session.user.role === 'admin' && (
                      <>
                        <Link 
                          href="/dashboard/seller"
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <div className="font-medium">Seller Dashboard</div>
                            <div className="text-xs text-gray-500">Manage your business</div>
                          </div>
                        </Link>
                        <Link 
                          href="/dashboard/admin"
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <div>
                            <div className="font-medium">Admin Dashboard</div>
                            <div className="text-xs text-gray-500">Platform management</div>
                          </div>
                        </Link>
                      </>
                    )}

                    {/* Message if no other dashboards available */}
                    {session.user.role === 'buyer' && (
                      <div className="px-3 py-4 text-center">
                        <p className="text-xs text-gray-500 mb-2">Want to sell on BizConnect?</p>
                        <Link 
                          href="/register?role=seller"
                          className="text-xs font-medium text-primary hover:text-primary-dark"
                        >
                          Create Seller Account →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Link href="/dashboard/buyer/saved" className="relative group flex flex-col items-center gap-1">
              <div className="relative p-1">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium text-gray-500 group-hover:text-primary transition-colors">Saved</span>
            </Link>
            


            {/* Notification Bell */}
          

            <Link href="/cart" className="relative group flex flex-col items-center gap-1">
              <div className="relative p-1">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cart?.itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {cart.itemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium text-gray-500 group-hover:text-primary transition-colors">Cart</span>
            </Link>
              <NotificationBell />
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
                          <Link href={`/products?category=${encodeURIComponent(cat.name)}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors">
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
                          <Link href={`/services?category=${encodeURIComponent(cat.name)}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors">
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
              <Link href="/verified-sellers" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Verified Sellers</Link>
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
