/**
 * Product Details Page - Premium Design
 * Shows product information with sleek UI and allows buyers to place orders
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { useAddToCartMutation, useGetCartQuery } from '@/lib/redux/features/cartApi';
import { useGetProductByIdQuery } from '@/lib/redux/features/productsApi';
import { useAddToWishlistMutation, useGetWishlistQuery } from '@/lib/redux/features/wishlistApi';
import { Heart, RotateCcw, Share2, ShieldCheck, ShoppingCart, Star, TruckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // RTK Query hooks
  const { data: productData, isLoading: loading, error } = useGetProductByIdQuery(productId);
  const { data: cartData } = useGetCartQuery();
  const { data: wishlistData } = useGetWishlistQuery();
  const [addToCart, { isLoading: addingToCart }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: addingToWishlist }] = useAddToWishlistMutation();

  const product = productData?.product;
  const reviews = productData?.reviews || [];
  const reviewStats = productData?.reviewStats || null;
  const cart = cartData?.cart;

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart({ productId: product._id, quantity, productData: product }).unwrap();
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error?.data?.error || 'Failed to add to cart');
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    
    try {
      await addToWishlist(product._id).unwrap();
      toast.success('Added to wishlist');
    } catch (error) {
      if (error?.data?.alreadyExists) {
        toast.error('Already in wishlist');
      } else {
        toast.error(error?.data?.error || 'Failed to add to wishlist');
      }
    }
  };

  const handleBuyNow = () => {
    toast.success('Proceeding to checkout...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-200 aspect-square rounded-2xl"></div>
              <div>
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
              Browse Products
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || ['https://via.placeholder.com/600'];

  const isInCart = cart?.items?.some(item => 
    item.productId._id === product._id || item.productId === product._id
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} on BizConnect!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src={images[selectedImage] || 'https://via.placeholder.com/600'}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.comparePrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {Math.round((product.comparePrice - product.price) / product.comparePrice * 100)}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.slice(0, 5).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary shadow-md scale-105' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image 
                      src={img || 'https://via.placeholder.com/600'} 
                      alt={`${product.title} ${idx + 1}`} 
                      fill 
                      className="object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Category */}
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                {product.category}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">{product.title}</h1>
            </div>

            {/* Rating & Sales */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(reviewStats?.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{reviewStats?.averageRating?.toFixed(1) || '0.0'}</span>
                <span className="text-gray-500">({reviewStats?.totalReviews || 0} reviews)</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">{product.salesCount || 0}</span> sold
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-primary">৳{product.price?.toLocaleString()}</span>
                {product.comparePrice && (
                  <span className="text-2xl text-gray-400 line-through">৳{product.comparePrice.toLocaleString()}</span>
                )}
              </div>
              {product.comparePrice && (
                <p className="text-green-600 font-semibold text-lg">
                  You save ৳{(product.comparePrice - product.price).toLocaleString()}!
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              {product.stock > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-700">In Stock</span>
                  <span className="text-gray-500">({product.stock} units available)</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-red-700">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-bold text-lg"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="w-20 text-center py-3 outline-none font-bold text-lg"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-500">Maximum: {product.stock}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {isInCart ? (
                <Link href="/cart" className="flex-1">
                  <button
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Go to Cart
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-primary text-primary rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              )}
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:-translate-y-0.5"
              >
                Buy Now
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-3">
              <button 
                onClick={handleAddToWishlist}
                disabled={addingToWishlist}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">{addingToWishlist ? 'Saving...' : 'Save'}</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TruckIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders ৳5000+</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">7 Days Return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviewStats && reviewStats.totalReviews > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
            
            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-200">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">{reviewStats.averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(reviewStats.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{reviewStats.totalReviews} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="md:col-span-2 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviewStats.distribution[star] || 0;
                  const percentage = reviewStats.totalReviews > 0 ? (count / reviewStats.totalReviews) * 100 : 0;
                  
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-12">{star} star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-yellow-400 h-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {review.buyerId?.name?.charAt(0) || 'U'}
                    </div>
                    
                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900">{review.buyerId?.name || 'Anonymous'}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            {review.isVerifiedPurchase && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                <ShieldCheck className="w-3 h-3" />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Reviews State */}
        {reviewStats && reviewStats.totalReviews === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 mb-16 text-center">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600">Be the first to review this product!</p>
          </div>
        )}

        {/* Seller Info Card */}
        {product.sellerId && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Seller Information</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark overflow-hidden flex-shrink-0 shadow-lg">
                  {product.sellerId.profileImage ? (
                    <Image src={product.sellerId.profileImage} alt={product.sellerId.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                      {product.sellerId.name?.charAt(0) || product.sellerId.businessName?.charAt(0) || 'S'}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {product.sellerId.businessName || product.sellerId.name}
                  </h4>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-gray-900">{product.sellerId.rating?.toFixed(1) || '4.5'}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{product.sellerId.reviewCount || 0} reviews</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={`/seller/${product.sellerId._id}`}>
                  <button className="px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                    Visit Store
                  </button>
                </Link>
                <Link href={`/dashboard/buyer/messages?seller=${product.sellerId._id}`}>
                  <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 shadow-md">
                    Contact Seller
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
