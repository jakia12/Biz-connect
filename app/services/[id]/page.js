'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ServiceReviews from '@/components/service/ServiceReviews';
import Button from '@/components/ui/Button';
import { useGetServiceByIdQuery } from '@/lib/redux/features/servicesApi';
import { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from '@/lib/redux/features/wishlistApi';
import { Check, Clock, Heart, RefreshCw, Star, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const { data: serviceData, isLoading, error } = useGetServiceByIdQuery(id);
  const service = serviceData?.service;

  const [selectedPackage, setSelectedPackage] = useState(0); // 0: Basic, 1: Standard, 2: Premium
  
  // Wishlist hooks
  const { data: wishlistData = [] } = useGetWishlistQuery();
  const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] = useRemoveFromWishlistMutation();

  const inWishlist = wishlistData.some(item => 
    item.productId?._id === id || item.productId === id
  );

  const isTogglingWishlist = isAddingToWishlist || isRemovingFromWishlist;

  const handleWishlistClick = async () => {
    if (!session) {
      toast.error('Please login to save items');
      router.push('/login');
      return;
    }

    try {
      if (inWishlist) {
        await removeFromWishlist(id).unwrap();
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(id).unwrap();
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  const handleOrderNow = () => {
    if (!session) {
      toast.error('Please login to order');
      router.push('/login');
      return;
    }
    // Navigate to checkout with service ID and selected package
    const pkg = service.packages[selectedPackage];
    router.push(`/checkout?serviceId=${id}&package=${pkg.name.toLowerCase()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button variant="primary">Browse Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentPackage = service.packages[selectedPackage];

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/services" className="hover:text-primary">Services</Link>
          <span>/</span>
          <Link href={`/services?category=${service.category}`} className="hover:text-primary">{service.category}</Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-xs">{service.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                    {service.seller?.profileImage ? (
                      <Image src={service.seller.profileImage} alt={service.seller.name} fill className="object-cover" />
                    ) : (
                      <User className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{service.seller?.name || 'Verified Seller'}</span>
                  {service.seller?.verified && (
                    <span className="text-blue-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">{service.rating || '5.0'}</span>
                  <span className="text-gray-500">({service.reviews || 0} reviews)</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={service.coverImage || service.images?.[0] || '/images/placeholder-service.jpg'}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Thumbnails (if multiple images) */}
              {service.images?.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {service.images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary">
                      <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Gig</h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {service.description}
              </div>
            </div>

            {/* About Seller */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">About The Seller</h2>
              <div className="flex items-start gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  {service.seller?.profileImage ? (
                    <Image src={service.seller.profileImage} alt={service.seller.name} fill className="object-cover" />
                  ) : (
                    <User className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.seller?.name}</h3>
                  <p className="text-gray-600 mb-4">{service.seller?.bio || 'Professional service provider on BizConnect.'}</p>
                  <Link href={`/dashboard/buyer/messages?seller=${service.sellerId || service.seller?._id}`}>
                    <Button variant="outline" size="sm">Contact Me</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <ServiceReviews serviceId={id} />
          </div>

          {/* Right Column: Packages & Action */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Packages Card */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                {/* Tabs */}
                <div className="grid grid-cols-3 border-b border-gray-200">
                  {['Basic', 'Standard', 'Premium'].map((pkgName, idx) => {
                    const pkg = service.packages.find(p => p.name === pkgName);
                    const isAvailable = !!pkg;
                    return (
                      <button
                        key={pkgName}
                        onClick={() => isAvailable && setSelectedPackage(idx)}
                        disabled={!isAvailable}
                        className={`py-4 text-sm font-bold transition-colors ${
                          selectedPackage === idx
                            ? 'bg-white text-primary border-b-2 border-primary'
                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                        } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {pkgName}
                      </button>
                    );
                  })}
                </div>

                {/* Package Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 text-lg">{currentPackage?.title || `${service.packages[selectedPackage]?.name} Package`}</h3>
                    <span className="text-2xl font-bold text-gray-900">৳{currentPackage?.price.toLocaleString()}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 min-h-[3rem]">
                    {currentPackage?.description || 'Includes essential features to get you started.'}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{currentPackage?.deliveryTime} Days Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                      <span>{currentPackage?.revisions} Revisions</span>
                    </div>
                    {currentPackage?.features?.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button onClick={handleOrderNow} variant="primary" className="w-full mb-3 py-3 text-lg">
                    Continue (৳{currentPackage?.price.toLocaleString()})
                  </Button>
                  
                  <button 
                    onClick={handleWishlistClick}
                    disabled={isTogglingWishlist}
                    className="w-full py-2 flex items-center justify-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                    {inWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-sm text-gray-600 font-medium">
                  <span className="text-primary">🔒 SSL Secure Payment</span>
                  <br />
                  Your information is protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
