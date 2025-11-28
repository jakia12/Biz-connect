/**
 * ProductCard Component - Marketplace Standard
 * Compact, data-rich, square aspect ratio
 */

'use client';

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductCard({ product, className = '', type = 'product' }) {
  const {
    id,
    _id,
    title,
    price,
    originalPrice,
    discount,
    image,
    rating,
    reviews,
    sold,
    badge
  } = product;

  const productId = id || _id;
  const { data: session } = useSession();
  const router = useRouter();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, cart } = useCart();
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Check if product is already in cart
  const isInCart = cart?.items?.some(item => 
    item.productId?._id === productId || item.productId === productId
  );
  
  const inWishlist = isInWishlist(productId);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTogglingWishlist(true);
    await toggleWishlist(productId);
    setIsTogglingWishlist(false);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart) {
      toast.error('Item already in cart');
      return;
    }
    
    setIsAddingToCart(true);
    
    // Prepare product data for cart
    const productData = {
      title,
      price,
      image,
    };
    
    // Add to cart using CartContext
    const success = await addToCart(productId, 1, productData);
    
    setIsAddingToCart(false);
  };

  const handleOrderNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error('Please login to order now');
      router.push('/login');
      return;
    }

    // Redirect to checkout or order page for service
    // For now, we'll assume a direct checkout route for services
    router.push(`/checkout?serviceId=${productId}`);
  };

  // Calculate discount if not provided but original price exists
  const discountPercent = discount || (originalPrice ? `-${Math.round(((originalPrice - price) / originalPrice) * 100)}%` : null);

  const isService = type === 'service';

  return (
    <motion.div 
      className={`group bg-white border border-gray-100 rounded-md overflow-hidden ${className}`}
      whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link href={`/${isService ? 'services' : 'products'}/${productId}`} className="block">
        {/* Product Image - Square 1:1 */}
        <div className="relative w-full aspect-square bg-gray-100">
          <Image
            src={image || '/images/placeholder-product.jpg'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            disabled={isTogglingWishlist}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-20 disabled:opacity-50"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? (
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
          
          {/* Discount Badge */}
          {discountPercent && (
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-bl-md z-10">
              {discountPercent}
            </div>
          )}

          {/* Special Badge (e.g. Hot, New) */}
          {badge && (
            <div className="absolute top-0 left-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-br-md z-10 uppercase">
              {badge.text}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-3">
          {/* Title */}
          <h3 className="text-sm text-gray-700 line-clamp-2 mb-2 h-10 group-hover:text-primary transition-colors" title={title}>
            {title}
          </h3>

          {/* Price Section */}
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-orange-500">৳{price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-xs text-gray-400 line-through">৳{originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          {/* Rating & Sold */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{rating || '4.5'}</span>
            </div>
            <span>{sold ? `${sold} Sold` : `${reviews || 0} Reviews`}</span>
          </div>

          {/* Action Button */}
          {isService ? (
            <motion.button
              onClick={handleOrderNow}
              className="mt-3 w-full py-2.5 px-4 rounded-md flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-sm bg-primary hover:bg-primary/90 text-white hover:shadow-md"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.02 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="w-4 h-4" />
              <span>Order Now</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={handleAddToCart}
              disabled={isInCart || isAddingToCart}
              className={`mt-3 w-full py-2.5 px-4 rounded-md flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-sm ${
                isInCart 
                  ? 'bg-green-500 text-white cursor-not-allowed' 
                  : isAddingToCart
                  ? 'bg-gray-400 text-white cursor-wait'
                  : 'bg-primary hover:bg-primary/90 text-white hover:shadow-md'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileHover={!isInCart && !isAddingToCart ? { scale: 1.02 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>
                {isInCart ? 'Added to Cart' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </span>
            </motion.button>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
