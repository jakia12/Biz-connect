/**
 * Buyer Saved Items Page
 * Wishlist/favorites page - Connected to API
 */

'use client';

import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SavedItemsPage() {
  const { wishlist, loading, removeFromWishlist } = useWishlist();

  const handleRemove = async (productId) => {
    const success = await removeFromWishlist(productId);
    // Toast is already shown in the context
  };

  const handleClearAll = async () => {
    if (!confirm(`Remove all ${wishlist.length} items from your wishlist?`)) {
      return;
    }

    // Remove all items one by one
    try {
      await Promise.all(
        wishlist.map(item => 
          removeFromWishlist(item.productId?._id || item.productId)
        )
      );
      toast.success('All items removed');
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
            {loading ? 'Loading...' : `${wishlist.length} items in your wishlist`}
          </p>
        </div>
        {wishlist.length > 0 && (
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
      wishlist.length === 0 ? (
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
          {wishlist.map((item) => {
            const product = item.productId;
            const productId = product?._id || product;
            
            return (
              <div key={item._id} className="relative">
                <ProductCard 
                  product={{
                    id: productId,
                    ...product,
                    seller: product?.sellerId,
                    image: product?.images?.[0] || 'https://via.placeholder.com/400',
                  }} 
                />
                <button
                  onClick={() => handleRemove(productId)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors group z-30"
                >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
