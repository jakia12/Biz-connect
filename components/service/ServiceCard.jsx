'use client';

import { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from '@/lib/redux/features/wishlistApi';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ServiceCard({ service, className = '' }) {
  const {
    _id,
    id,
    title,
    coverImage,
    images,
    packages,
    seller,
    rating = 0,
    reviews = 0,
    category
  } = service;

  const serviceId = _id || id;
  const { data: session } = useSession();
  const router = useRouter();

  // RTK Query hooks for wishlist
  const { data: wishlistData = [] } = useGetWishlistQuery();
  const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] = useRemoveFromWishlistMutation();

  const isTogglingWishlist = isAddingToWishlist || isRemovingFromWishlist;
  
  // Check if service is in wishlist
  const inWishlist = wishlistData.some(item => 
    item.productId?._id === serviceId || item.productId === serviceId
  );

  // Determine display image
  const displayImage = coverImage || images?.[0] || '/images/placeholder-service.jpg';
  
  // Determine starting price
  const startingPrice = packages?.[0]?.price || 0;

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      toast.error('Please login to save items');
      return;
    }
    
    try {
      if (inWishlist) {
        await removeFromWishlist(serviceId).unwrap();
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(serviceId).unwrap();
        toast.success('Added to wishlist');
      }
    } catch (error) {
      if (!inWishlist && error?.data?.alreadyExists) {
        toast.error('Already in wishlist');
      } else {
        toast.error('Failed to update wishlist');
      }
    }
  };

  return (
    <motion.div 
      className={`group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
      whileHover={{ y: -4 }}
    >
      <Link href={`/services/${serviceId}`} className="block h-full flex flex-col">
        {/* Service Image */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          <Image
            src={displayImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Wishlist Button */}
          {/* <button
            onClick={handleWishlistClick}
            disabled={isTogglingWishlist}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
            />
          </button> */}

          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full">
              {category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Seller Info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              {seller?.profileImage ? (
                <Image 
                  src={seller.profileImage} 
                  alt={seller.name || 'Seller'} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <User className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
              )}
            </div>
            <span className="text-sm font-medium text-gray-900 truncate">
              {seller?.name || seller?.businessName || 'Verified Seller'}
            </span>
            {seller?.verified && (
              <span className="text-blue-500" title="Verified Seller">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-900">{rating || '5.0'}</span>
            <span className="text-sm text-gray-500">({reviews || 0})</span>
          </div>

          {/* Footer: Price & Action */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Starting at</span>
              <span className="text-lg font-bold text-gray-900">৳{startingPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
