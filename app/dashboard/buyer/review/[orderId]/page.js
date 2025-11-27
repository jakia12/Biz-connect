/**
 * Leave Review Page (Buyer)
 * Allow buyers to rate and review products - Connected to API
 */

'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function LeaveReviewPage({ params }) {
  // Unwrap the params Promise
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.orderId;
  
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/buyer/orders/${orderId}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
        if (data.order.items?.length > 0) {
          // Set first product as default selection
          const firstProduct = data.order.items[0];
          setSelectedProduct(firstProduct.productId?._id || firstProduct.productId);
        }
      } else {
        toast.error(data.error || 'Failed to fetch order');
        router.push('/dashboard/buyer/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedProduct) {
      toast.error('Please select a product to review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    try {
      const reviewData = {
        orderId,
        productId: selectedProduct,
        rating,
        comment: data.comment,
      };

      const response = await fetch('/api/buyer/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Review submitted successfully!');
        router.push('/dashboard/buyer/orders');
      } else {
        toast.error(result.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-600 ml-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-600">Order not found</p>
          <Link href="/dashboard/buyer/orders">
            <Button variant="primary" className="mt-4">Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/dashboard/buyer/orders" className="hover:text-primary">My Orders</Link>
          <span>/</span>
          <span>Leave Review</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Leave a Review</h1>
        <p className="text-gray-600 mt-1">Share your experience with this product</p>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Order Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Order #{order?.orderId}
              </p>
              <p className="text-sm text-gray-600">
                Seller: {order?.sellerId?.name}
              </p>
            </div>
          </div>

          {/* Select Product */}
          {order?.items?.length > 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Select Product to Review</h3>
              <div className="space-y-2">
                {order.items.map((item) => {
                  const productId = item.productId?._id || item.productId;
                  const productTitle = item.productId?.title || item.title || 'Product';
                  
                  return (
                    <label
                      key={productId}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedProduct === productId
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="product"
                        value={productId}
                        checked={selectedProduct === productId}
                        onChange={() => setSelectedProduct(productId)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-gray-900">{productTitle}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Single Product Display */}
          {order?.items?.length === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Product</h3>
              <p className="text-gray-900">{order.items[0].productId?.title || order.items[0].title || 'Product'}</p>
            </div>
          )}

          {/* Rating */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Rating <span className="text-red-500">*</span></h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-10 h-10 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-gray-700 font-medium">
                  {rating} {rating === 1 ? 'Star' : 'Stars'}
                </span>
              )}
            </div>
          </div>

          {/* Review Comment */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Your Review <span className="text-red-500">*</span></h3>
            <textarea
              {...register('comment', { 
                required: 'Review comment is required',
                minLength: { value: 10, message: 'Comment must be at least 10 characters' }
              })}
              rows={6}
              placeholder="Share your experience with this product..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary resize-none"
            />
            {errors.comment && (
              <p className="text-sm text-red-600 mt-1">{errors.comment.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">Minimum 10 characters</p>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-1"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
