/**
 * Buyer Saved Items Page
 * Wishlist/favorites page for buyers
 */

'use client';

import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function SavedItemsPage() {
  const [savedItems] = useState([
    {
      id: 1,
      title: "Professional Business Logo Design",
      price: 1500,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 120,
      seller: { name: "Creative Studio BD", verified: true },
      badge: { text: "Service", variant: "info" }
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
      seller: { name: "Garments Direct", verified: true }
    },
    {
      id: 3,
      title: "E-commerce Website Development",
      price: 25000,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      rating: 5.0,
      reviews: 45,
      seller: { name: "Tech Pro BD", verified: true },
      badge: { text: "Service", variant: "info" }
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
      seller: { name: "Sundarban Mart", verified: true }
    },
  ]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Saved Items</h1>
          <p className="text-gray-600 mt-1">{savedItems.length} items in your wishlist</p>
        </div>
        <Button variant="outline">Clear All</Button>
      </div>

      {/* Empty State */}
      {savedItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Saved Items Yet</h3>
          <p className="text-gray-600 mb-6">Start adding products and services you love!</p>
          <Button variant="primary">Browse Marketplace</Button>
        </div>
      ) : (
        /* Saved Items Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
