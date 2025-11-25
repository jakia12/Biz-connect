/**
 * ProductCard Component - Marketplace Standard
 * Compact, data-rich, square aspect ratio
 */

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, className = '' }) {
  const {
    id,
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

  // Calculate discount if not provided but original price exists
  const discountPercent = discount || (originalPrice ? `-${Math.round(((originalPrice - price) / originalPrice) * 100)}%` : null);

  return (
    <div className={`group bg-white border border-gray-100 rounded-md hover:shadow-lg transition-all duration-200 overflow-hidden ${className}`}>
      <Link href={`/products/${id}`} className="block">
        {/* Product Image - Square 1:1 */}
        <div className="relative w-full aspect-square bg-gray-100">
          <Image
            src={image || '/images/placeholder-product.jpg'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          />
          
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
        </div>
      </Link>
    </div>
  );
}
