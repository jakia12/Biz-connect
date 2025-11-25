/**
 * Verified Sellers Page
 * Showcase of top-rated and verified sellers on BizConnect
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function VerifiedSellersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fashion', 'Electronics', 'Handmade', 'Services', 'Food'];

  // Mock Verified Sellers Data
  const sellers = [
    {
      id: 1,
      name: "Creative Studio BD",
      category: "Services",
      rating: 4.9,
      reviews: 128,
      location: "Dhanmondi, Dhaka",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop",
      cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
      badges: ["Top Rated", "Verified"],
      description: "Professional design studio specializing in branding and digital marketing."
    },
    {
      id: 2,
      name: "Organic Foods Ltd",
      category: "Food",
      rating: 4.8,
      reviews: 342,
      location: "Sylhet",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
      cover: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop",
      badges: ["Verified", "Eco-Friendly"],
      description: "Direct from farm to table. We provide the best organic vegetables and fruits."
    },
    {
      id: 3,
      name: "Tech Gadgets Pro",
      category: "Electronics",
      rating: 4.7,
      reviews: 89,
      location: "Gulshan, Dhaka",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
      cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
      badges: ["Verified"],
      description: "Your one-stop shop for the latest gadgets and tech accessories."
    },
    {
      id: 4,
      name: "Artisan Crafts",
      category: "Handmade",
      rating: 5.0,
      reviews: 56,
      location: "Chittagong",
      image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
      cover: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=400&fit=crop",
      badges: ["Verified", "Handmade"],
      description: "Unique handmade crafts and home decor items made with love."
    },
    {
      id: 5,
      name: "Fashion Hub",
      category: "Fashion",
      rating: 4.6,
      reviews: 210,
      location: "Uttara, Dhaka",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      cover: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop",
      badges: ["Verified"],
      description: "Trendy fashion apparel for men and women. Stay stylish with us."
    },
    {
      id: 6,
      name: "Digital Solutions",
      category: "Services",
      rating: 4.8,
      reviews: 150,
      location: "Mirpur, Dhaka",
      image: "https://images.unsplash.com/photo-1572044162444-ad6021194360?w=400&h=400&fit=crop",
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      badges: ["Verified", "Expert"],
      description: "Web development and SEO services to grow your business online."
    }
  ];

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          seller.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || seller.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Verified Sellers</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Connect with our most trusted and top-rated business partners. Quality and reliability guaranteed.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex shadow-lg">
              <div className="flex-1 flex items-center px-4 border-r border-gray-200">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search for sellers..." 
                  className="w-full outline-none text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="px-2">
                <Button variant="primary">Search</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSellers.map((seller) => (
              <div key={seller.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group">
                {/* Cover Image */}
                <div className="h-32 bg-gray-200 relative">
                  <Image src={seller.cover} alt="Cover" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>

                {/* Profile Info */}
                <div className="px-6 pb-6 relative">
                  <div className="flex justify-between items-end -mt-10 mb-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white">
                      <Image src={seller.image} alt={seller.name} fill className="object-cover" />
                    </div>
                    <div className="flex gap-1 mb-1">
                      {seller.badges.map((badge, idx) => (
                        <span key={idx} className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                          badge === 'Verified' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                    {seller.name}
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {seller.location}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {seller.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-gray-900">{seller.rating}</span>
                      <span className="text-gray-500 text-sm">({seller.reviews})</span>
                    </div>
                    <Link href={`/seller/${seller.id}`}>
                      <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white hover:border-primary">
                        Visit Store
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gray-900 rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
               </svg>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Are you a Top Rated Seller?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our exclusive network of verified sellers and get access to premium features, higher visibility, and more customers.
              </p>
              <Link href="/register">
                <Button variant="primary" size="lg" className="px-8">Become a Verified Seller</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
