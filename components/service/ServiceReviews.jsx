'use client';

import { useGetServiceReviewsQuery } from '@/lib/redux/features/servicesApi';
import { Star, ThumbsUp, User } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ServiceReviews({ serviceId }) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetServiceReviewsQuery({ id: serviceId, page });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const { reviews = [], stats, pagination } = data || {};

  if (!reviews.length && page === 1) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">No Reviews Yet</h3>
        <p className="text-gray-600">Be the first to review this service!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      {stats && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">{stats.average.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(stats.average)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-500">{stats.total} Reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 w-full space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.distribution[star] || 0;
                const percentage = stats.total ? (count / stats.total) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="font-medium text-gray-700">{star}</span>
                      <Star className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-gray-500 text-right">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                {review.buyer?.profileImage ? (
                  <Image
                    src={review.buyer.profileImage}
                    alt={review.buyer.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{review.buyer?.name || 'Anonymous User'}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                
                {/* Review Images */}
                {review.images?.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review.images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <Image src={img} alt="Review attachment" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Helpful Button (Static for now) */}
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpfulCount || 0})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-600">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={!pagination.hasMore}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
