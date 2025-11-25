/**
 * Product/Service Detail Page
 * Individual item view with full details
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Mock data
  const product = {
    id: 1,
    title: "Professional Business Logo Design",
    price: 1500,
    originalPrice: 2000,
    discount: "-25%",
    rating: 4.9,
    reviews: 120,
    sold: 450,
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop",
    ],
    seller: {
      name: "Creative Studio BD",
      verified: true,
      rating: 4.9,
      responseTime: "2 hours",
      memberSince: "2022",
      totalSales: 1200
    },
    category: "Graphics & Design",
    deliveryTime: "3-5 days",
    description: "Get a professional, unique logo design for your business. Our experienced designers will create a custom logo that perfectly represents your brand identity.",
    features: [
      "Unlimited revisions",
      "Source files included",
      "Commercial use rights",
      "Fast delivery",
      "Professional designers"
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "Karim Ahmed",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent work! Very professional and delivered on time. Highly recommended!",
      helpful: 12
    },
    {
      id: 2,
      user: "Samia Rahman",
      rating: 4,
      date: "1 week ago",
      comment: "Good quality design. Communication was smooth throughout the project.",
      helpful: 8
    },
  ];

  const relatedProducts = [
    {
      id: 2,
      title: "Business Card Design",
      price: 800,
      image: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 67,
      seller: { name: "Design Pro", verified: true }
    },
    {
      id: 3,
      title: "Social Media Graphics Pack",
      price: 1200,
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 45,
      seller: { name: "Creative Hub", verified: true }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/browse" className="hover:text-primary">{product.category}</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Main Image */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mt-6">
              <div className="border-b border-gray-200">
                <div className="flex gap-8 px-6">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-4 border-b-2 font-medium transition-colors ${
                      activeTab === 'description'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 border-b-2 font-medium transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Reviews ({product.reviews})
                  </button>
                  <button
                    onClick={() => setActiveTab('seller')}
                    className={`py-4 border-b-2 font-medium transition-colors ${
                      activeTab === 'seller'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    About Seller
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">What's Included</h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">{review.user}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <button className="text-sm text-gray-500 hover:text-primary">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'seller' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                      <div>
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          {product.seller.name}
                          {product.seller.verified && (
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">Member since {product.seller.memberSince}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-bold text-gray-900">{product.seller.rating} ⭐</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Response Time</p>
                        <p className="font-bold text-gray-900">{product.seller.responseTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Sales</p>
                        <p className="font-bold text-gray-900">{product.seller.totalSales}</p>
                      </div>
                    </div>
                    <Link href={`/seller/${product.seller.name}`}>
                      <Button variant="outline" className="w-full mt-4">Visit Store</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{product.sold} sold</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">৳{product.originalPrice.toLocaleString()}</span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">{product.discount}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">Delivery: {product.deliveryTime}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 h-10 border border-gray-300 rounded-lg text-center font-medium"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Button variant="primary" className="w-full justify-center py-3 font-bold shadow-colored">
                  Order Now
                </Button>
                <Button variant="outline" className="w-full justify-center py-3 font-bold">
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full justify-center py-3 font-bold">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Message Seller
                </Button>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Money-back guarantee
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure payment
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  24/7 customer support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
