/**
 * Leave Review Page (Buyer)
 * Allow buyers to rate and review products/services
 */

'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import { reviewSchema } from '@/lib/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LeaveReviewPage({ params }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(reviewSchema),
    mode: 'onBlur',
    defaultValues: {
      rating: 0,
      comment: ''
    }
  });

  const rating = watch('rating');

  // Mock data
  const order = {
    id: "ORD-7829",
    product: {
      title: "Professional Business Logo Design",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=200&fit=crop"
    },
    seller: {
      name: "Creative Studio BD",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=100&h=100&fit=crop"
    }
  };

  const onSubmit = (data) => {
    console.log('Review submitted:', data);
    // Handle review submission
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/dashboard/buyer/orders" className="hover:text-primary">My Orders</Link>
            <span>/</span>
            <span>Leave Review</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Rate Your Experience</h1>
          <p className="text-gray-600 mt-1">Share your feedback to help other buyers</p>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
              <Image src={order.product.image} alt={order.product.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{order.product.title}</h3>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-gray-100 relative overflow-hidden">
                  <Image src={order.seller.image} alt={order.seller.name} width={24} height={24} className="object-cover" />
                </div>
                <span className="text-sm text-gray-600">{order.seller.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Rating */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Your Rating *</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue('rating', star, { shouldValidate: true })}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <svg 
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-3 text-lg font-bold text-gray-900">
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </span>
                )}
              </div>
              <input type="hidden" {...register('rating', { valueAsNumber: true })} />
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
              )}
            </div>

            {/* Review Text */}
            <FormField
              label="Your Review"
              name="comment"
              type="textarea"
              rows={6}
              placeholder="Share your experience with this product/service..."
              register={register}
              error={errors.comment}
              required
            />
            <p className="text-xs text-gray-500 mt-2 mb-8">Minimum 10 characters</p>

            {/* Quality Ratings (Optional/Visual only for now as per schema) */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Rate Specific Aspects (Optional)</label>
              <div className="space-y-4">
                {[
                  { label: 'Quality', key: 'quality' },
                  { label: 'Communication', key: 'communication' },
                  { label: 'Delivery Time', key: 'delivery' }
                ].map((aspect) => (
                  <div key={aspect.key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{aspect.label}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="transition-transform hover:scale-110 focus:outline-none"
                        >
                          <svg className="w-6 h-6 text-gray-300 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                type="submit" 
                variant="primary" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Link href="/dashboard/buyer/orders" className="flex-1">
                <Button type="button" variant="outline" className="w-full">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
