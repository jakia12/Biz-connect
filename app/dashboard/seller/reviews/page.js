/**
 * Seller Reviews Page
 * View and manage all reviews received
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function SellerReviewsPage() {
  const [filterRating, setFilterRating] = useState('all');

  const stats = {
    averageRating: 4.9,
    totalReviews: 245,
    ratings: {
      5: 180,
      4: 45,
      3: 15,
      2: 3,
      1: 2
    }
  };

  const reviews = [
    {
      id: 1,
      user: {
        name: "Karim Ahmed",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
      },
      rating: 5,
      date: "2 days ago",
      product: "Professional Business Logo Design",
      comment: "Excellent work! Very professional and delivered on time. The logo perfectly captures our brand identity. Highly recommended!",
      helpful: 12,
      response: null
    },
    {
      id: 2,
      user: {
        name: "Samia Rahman",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      rating: 4,
      date: "1 week ago",
      product: "Business Card Design",
      comment: "Good quality design. Communication was smooth throughout the project. Would work again!",
      helpful: 8,
      response: "Thank you so much for your kind words! Looking forward to working with you again."
    },
    {
      id: 3,
      user: {
        name: "Mike Johnson",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
      },
      rating: 5,
      date: "2 weeks ago",
      product: "Social Media Graphics Pack",
      comment: "Amazing service! The graphics are exactly what I needed for my social media campaigns.",
      helpful: 15,
      response: null
    },
  ];

  const getRatingPercentage = (rating) => {
    return (stats.ratings[rating] / stats.totalReviews) * 100;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Reviews & Ratings</h1>
        <p className="text-gray-600 mt-1">Manage customer feedback and reviews</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Stats */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-900 mb-2">{stats.averageRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600">{stats.totalReviews} total reviews</p>
            </div>

            <div className="space-y-3 mb-6">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-8">{rating} ⭐</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${getRatingPercentage(rating)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{stats.ratings[rating]}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">Filter by Rating</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterRating('all')}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterRating === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Reviews
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating.toString())}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterRating === rating.toString()
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rating} Stars
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 relative overflow-hidden flex-shrink-0">
                  <Image src={review.user.image} alt={review.user.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{review.user.name}</h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">For: <span className="font-medium text-gray-900">{review.product}</span></p>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  
                  {/* Seller Response */}
                  {review.response ? (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Your Response:</p>
                      <p className="text-sm text-blue-800">{review.response}</p>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <button className="text-sm text-primary font-medium hover:underline">
                        Respond to this review
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
