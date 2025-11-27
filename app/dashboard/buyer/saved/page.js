/**
 * Buyer Saved Items Page
 * Wishlist/favorites page - Connected to API
 */

'use client';

import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SavedItemsPage() {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedItems();
  }, []);

  const fetchSavedItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/buyer/saved');
      const data = await response.json();

      if (data.success) {
        setSavedItems(data.savedItems);
      } else {
        toast.error(data.error || 'Failed to fetch saved items');
      }
    } catch (error) {
      console.error('Error fetching saved items:', error);
      toast.error('Failed to fetch saved items');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await fetch(`/api/buyer/saved/${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Removed from saved items');
        // Remove from local state
        setSavedItems(prev => prev.filter(item => item.productId._id !== productId));
      } else {
        toast.error(data.error || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const handleClearAll = async () => {
    if (!confirm(`Remove all ${savedItems.length} items from your wishlist?`)) {
      return;
    }

    // Remove all items one by one
    try {
      await Promise.all(
        savedItems.map(item => 
          fetch(`/api/buyer/saved/${item.productId._id}`, { method: 'DELETE' })
        )
      );
      toast.success('All items removed');
      setSavedItems([]);
    } catch (error) {
      console.error('Error clearing saved items:', error);
      toast.error('Failed to clear all items');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Saved Items</h1>
          <p className="text-gray-600 mt-1">
            {loading ? 'Loading...' : `${savedItems.length} items in your wishlist`}
          </p>
        </div>
        {savedItems.length > 0 && (
          <Button variant="outline" onClick={handleClearAll}>Clear All</Button>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-600 mt-4">Loading saved items...</p>
        </div>
      ) : /* Empty State */
      savedItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Saved Items Yet</h3>
          <p className="text-gray-600 mb-6">Start adding products and services you love!</p>
          <Link href="/browse">
            <Button variant="primary">Browse Marketplace</Button>
          </Link>
        </div>
      ) : (
        /* Saved Items Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedItems.map((item) => (
            <div key={item._id} className="relative">
              <ProductCard 
                product={{
                  ...item.productId,
                  seller: item.productId.sellerId,
                  image: item.productId.images?.[0] || 'https://via.placeholder.com/400',
                }} 
              />
              <button
                onClick={() => handleRemove(item.productId._id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
