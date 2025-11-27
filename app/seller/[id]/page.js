/**
 * Public Seller Profile
 * Showcase seller's business, products/services, and reviews
 */

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SellerProfilePage({ params }) {
  const unwrappedParams = use(params);
  const sellerId = unwrappedParams.id;

  const [activeTab, setActiveTab] = useState('products');
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    fetchSellerData();
  }, [sellerId]);

  const fetchSellerData = async () => {
    try {
      setLoading(true);
      setProductsLoading(true);

      console.log('Fetching seller with ID:', sellerId);

      // Fetch seller info
      const sellerResponse = await fetch(`/api/sellers/${sellerId}`);
      const sellerData = await sellerResponse.json();

      console.log('Seller response:', sellerData);

      if (sellerData.success) {
        setSeller(sellerData.seller);
      } else {
        console.error('Seller fetch failed:', sellerData.error);
        toast.error(sellerData.error || 'Failed to load seller information');
      }

      // Fetch seller's products
      const productsResponse = await fetch(`/api/products?sellerId=${sellerId}&limit=100`);
      const productsData = await productsResponse.json();

      console.log('Products response:', productsData);

      if (productsData.success) {
        setProducts(productsData.products);
      }
    } catch (error) {
      console.error('Error fetching seller data:', error);
      toast.error('Failed to load seller information');
    } finally {
      setLoading(false);
      setProductsLoading(false);
    }
  };

  const reviews = [
    {
      id: 1,
      user: "Karim Ahmed",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent work! Very professional and delivered on time. Highly recommended!",
      product: "Logo Design"
    },
    {
      id: 2,
      user: "Samia Rahman",
      rating: 4,
      date: "1 week ago",
      comment: "Good quality design. Communication was smooth throughout the project.",
      product: "Business Card"
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-body">
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 font-body">
        <Navbar />
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Seller Not Found</h1>
          <Link href="/verified-sellers">
            <Button variant="primary">Browse Sellers</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Profile Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-end gap-6 -mt-16 pb-6">
            <div className="relative w-32 h-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden flex-shrink-0">
              {seller.profileImage ? (
                <Image src={seller.profileImage} alt={seller.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-white text-4xl font-bold">
                  {seller.name?.charAt(0) || seller.businessName?.charAt(0) || 'S'}
                </div>
              )}
            </div>
            <div className="flex-1 pt-20">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 font-heading flex items-center gap-2">
                    {seller.businessName || seller.name}
                    {seller.isVerified && (
                      <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-gray-900">{seller.rating?.toFixed(1) || '4.5'}</span>
                      <span>({seller.reviewCount || 0} reviews)</span>
                    </div>
                    <span>•</span>
                    <span>{seller.totalOrders || 0} sales</span>
                    {seller.businessAddress && (
                      <>
                        <span>•</span>
                        <span>📍 {seller.businessAddress}</span>
                      </>
                    )}
                  </div>
                </div>
                <Link href="/messages">
                  <Button variant="primary" className="px-6 py-3">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Contact Seller
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: About & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{seller.businessDescription || 'Quality products and services'}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium text-gray-900">{new Date(seller.createdAt).getFullYear()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Products</span>
                  <span className="font-medium text-gray-900">{products.length}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Quality</span>
                    <span className="text-sm font-bold text-gray-900">4.9/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Communication</span>
                    <span className="text-sm font-bold text-gray-900">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '96%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Delivery</span>
                    <span className="text-sm font-bold text-gray-900">5.0/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Products & Reviews */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <div className="flex gap-8 px-6">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`py-4 border-b-2 font-medium transition-colors ${
                      activeTab === 'products'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Products ({products.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 border-b-2 font-medium transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Reviews ({seller.reviewCount || 0})
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'products' && (
              productsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                      <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                  <p className="text-gray-600">This seller hasn't listed any products</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={{
                        ...product,
                        id: product._id,
                        image: product.images?.[0] || 'https://via.placeholder.com/400',
                        seller: { name: seller.businessName || seller.name, verified: seller.isVerified },
                      }}
                    />
                  ))}
                </div>
              )
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
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
                        <p className="text-sm text-gray-600 mt-1">For: {review.product}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
