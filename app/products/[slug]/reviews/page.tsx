// app/products/[slug]/reviews/page.tsx
'use client'

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { Anton, Inter } from 'next/font/google'
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
} from 'lucide-react'
import { getProductBySlug } from '@/utils/data'
import { formatCurrency } from '@/utils/currency'
import { getImageUrl } from '@/utils/images'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})

// Mock reviews data
const MOCK_REVIEWS = [
  {
    id: 1,
    userName: 'Sarah J.',
    userInitials: 'SJ',
    rating: 5,
    title: 'Absolutely life-changing!',
    comment:
      "I've been using this product for 3 months now and the results are incredible. My energy levels have skyrocketed and I feel better than ever. Highly recommend to anyone looking to improve their daily wellness routine.",
    date: 'August 25, 2026',
    helpful: 24,
    verified: true,
    images: [],
  },
  {
    id: 2,
    userName: 'Mark R.',
    userInitials: 'MR',
    rating: 4,
    title: 'Great quality, fast delivery',
    comment:
      "The product arrived quickly and was well-packaged. I've noticed a significant improvement in my sleep quality. The only reason I'm not giving 5 stars is that I wish the bottle was larger.",
    date: 'August 20, 2026',
    helpful: 12,
    verified: true,
    images: [],
  },
  {
    id: 3,
    userName: 'Emma W.',
    userInitials: 'EW',
    rating: 5,
    title: 'Finally found a supplement that works',
    comment:
      "I've tried many supplements over the years but this is the first one that actually delivers on its promises. My skin is clearer, I have more energy, and I feel more focused throughout the day.",
    date: 'August 15, 2026',
    helpful: 18,
    verified: true,
    images: [],
  },
  {
    id: 4,
    userName: 'James C.',
    userInitials: 'JC',
    rating: 3,
    title: 'Good but took time to see results',
    comment:
      'The product is good quality but it took about 6 weeks before I noticed any difference. Patience is key with this one. Overall satisfied but improvement could be faster.',
    date: 'August 10, 2026',
    helpful: 7,
    verified: false,
    images: [],
  },
  {
    id: 5,
    userName: 'Lisa M.',
    userInitials: 'LM',
    rating: 5,
    title: 'Perfect addition to my routine',
    comment:
      "I've been taking this for 2 months and it's become a staple in my daily routine. My doctor even commented on my improved blood work results. Couldn't be happier!",
    date: 'August 5, 2026',
    helpful: 32,
    verified: true,
    images: [],
  },
  {
    id: 6,
    userName: 'David K.',
    userInitials: 'DK',
    rating: 4,
    title: 'Good value for money',
    comment:
      "For the price point, this is excellent quality. The ingredients are clean and transparent. I appreciate that they don't use any fillers or artificial additives.",
    date: 'July 30, 2026',
    helpful: 9,
    verified: true,
    images: [],
  },
]

export default function ReviewsPage() {
  const params = useParams()
  const slug = params?.slug as string

  const product = getProductBySlug(slug)
  const [sortBy, setSortBy] = useState('newest')
  const [filterRating, setFilterRating] = useState(0)

  if (!product) {
    notFound()
  }

  // Calculate review statistics
  const totalReviews = MOCK_REVIEWS.length
  const averageRating =
    MOCK_REVIEWS.reduce((acc, r) => acc + r.rating, 0) / totalReviews

  // Count ratings distribution
  const ratingDistribution = [0, 0, 0, 0, 0]
  MOCK_REVIEWS.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingDistribution[5 - r.rating] += 1
    }
  })

  // Filter reviews by rating
  const filteredReviews =
    filterRating > 0
      ? MOCK_REVIEWS.filter((r) => r.rating === filterRating)
      : MOCK_REVIEWS

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy === 'highest') {
      return b.rating - a.rating
    } else if (sortBy === 'lowest') {
      return a.rating - b.rating
    } else if (sortBy === 'helpful') {
      return b.helpful - a.helpful
    }
    return 0
  })

  const getRatingLabel = (rating: number) => {
    const labels = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent']
    return labels[Math.floor(rating) - 1] || 'Excellent'
  }

  const renderStars = (rating: number, size: number = 4) => {
    return (
      <div className='flex items-center gap-0.5'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-${size} h-${size} ${
              star <= rating
                ? 'fill-[#ead6c8] text-[#ead6c8]'
                : 'text-[#d8d5ce]'
            }`}
          />
        ))}
      </div>
    )
  }

  // Get the correct image URL using the helper
  const productImageUrl = getImageUrl(product.image)

  return (
    <div
      className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black`}
    >
      {/* Back to product */}
      <div className='bg-[#f5f5f5] py-4 px-6 md:px-12'>
        <div className='max-w-7xl mx-auto'>
          <Link
            href={`/products/${product.slug}`}
            className='inline-flex items-center gap-2 text-sm text-[#5f5d57] hover:text-black transition'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to {product.name}
          </Link>
        </div>
      </div>

      <section className='py-10 px-6 md:px-12'>
        <div className='max-w-7xl mx-auto'>
          {/* Product Info Header */}
          <div className='flex items-center gap-4 pb-8 mb-8 border-b border-[#eae8e2]'>
            <div className='w-20 h-20 bg-[#f5f5f5] rounded-xl overflow-hidden flex-shrink-0 relative'>
              <img
                src={productImageUrl}
                alt={product.name}
                className='object-cover w-full h-full'
                onError={(e) => {
                  // Fallback if image fails to load
                  ;(e.target as HTMLImageElement).src =
                    '/images/placeholder.png'
                }}
              />
            </div>
            <div>
              <h1 className='font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl text-black'>
                {product.name}
              </h1>
              <p className='text-sm text-[#5f5d57]'>
                {formatCurrency(product.price)}
              </p>
            </div>
            <div className='ml-auto text-right'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold'>
                  {averageRating.toFixed(1)}
                </span>
                <div className='flex items-center gap-0.5'>
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
              <span className='text-sm text-[#5f5d57]'>
                {totalReviews} reviews
              </span>
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {/* Left - Rating Summary */}
            <div className='md:col-span-1'>
              <div className='bg-[#f5f5f5] rounded-2xl p-6 sticky top-24'>
                <h3 className='font-semibold text-black mb-4'>
                  Rating Summary
                </h3>

                {/* Overall Rating */}
                <div className='flex items-center gap-4 mb-6'>
                  <div className='text-5xl font-black text-black'>
                    {averageRating.toFixed(1)}
                  </div>
                  <div>
                    <div className='flex items-center gap-0.5'>
                      {renderStars(Math.round(averageRating), 5)}
                    </div>
                    <span className='text-sm text-[#5f5d57]'>
                      Based on {totalReviews} reviews
                    </span>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className='space-y-2'>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingDistribution[5 - star]
                    const percentage =
                      totalReviews > 0 ? (count / totalReviews) * 100 : 0
                    return (
                      <button
                        key={star}
                        onClick={() =>
                          setFilterRating(filterRating === star ? 0 : star)
                        }
                        className={`w-full flex items-center gap-3 text-sm transition ${
                          filterRating === star
                            ? 'opacity-100'
                            : 'hover:opacity-80'
                        }`}
                      >
                        <span className='w-6 text-right font-medium'>
                          {star}★
                        </span>
                        <div className='flex-1 h-2 bg-[#e8e4de] rounded-full overflow-hidden'>
                          <div
                            className={`h-full rounded-full transition ${
                              filterRating === star
                                ? 'bg-[#1f3b2c]'
                                : 'bg-[#ead6c8]'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className='w-10 text-[#5f5d57] text-xs'>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {filterRating > 0 && (
                  <button
                    onClick={() => setFilterRating(0)}
                    className='mt-4 text-xs font-semibold text-[#1f3b2c] hover:underline transition'
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>

            {/* Right - Reviews List */}
            <div className='md:col-span-2'>
              {/* Sort Controls */}
              <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
                <div className='flex items-center gap-2 text-sm text-[#5f5d57]'>
                  <MessageSquare className='w-4 h-4' />
                  <span>{filteredReviews.length} reviews</span>
                </div>
                <div className='flex items-center gap-3'>
                  <label className='text-sm text-[#5f5d57]'>Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='px-4 py-2 bg-[#f5f5f5] rounded-full text-sm border-0 focus:outline-none focus:ring-2 focus:ring-[#ead6c8]'
                  >
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                    <option value='highest'>Highest Rating</option>
                    <option value='lowest'>Lowest Rating</option>
                    <option value='helpful'>Most Helpful</option>
                  </select>
                </div>
              </div>

              {/* Reviews List */}
              <div className='space-y-6'>
                {sortedReviews.length === 0 ? (
                  <div className='text-center py-12'>
                    <MessageSquare className='w-12 h-12 mx-auto text-[#d8d5ce] mb-3' />
                    <p className='text-[#5f5d57]'>
                      No reviews found for this rating.
                    </p>
                  </div>
                ) : (
                  sortedReviews.map((review) => (
                    <div
                      key={review.id}
                      className='border border-[#eae8e2] rounded-2xl p-6 hover:shadow-sm transition'
                    >
                      {/* Review Header */}
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='w-12 h-12 bg-[#ead6c8] rounded-full flex items-center justify-center text-black font-bold text-lg'>
                            {review.userInitials}
                          </div>
                          <div>
                            <div className='flex items-center gap-2'>
                              <span className='font-semibold text-black'>
                                {review.userName}
                              </span>
                              {review.verified && (
                                <span className='text-xs bg-[#1f3b2c] text-white px-2 py-0.5 rounded-full'>
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className='flex items-center gap-2 mt-0.5'>
                              <div className='flex items-center gap-0.5'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${
                                      star <= review.rating
                                        ? 'fill-[#ead6c8] text-[#ead6c8]'
                                        : 'text-[#d8d5ce]'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className='text-xs text-[#5f5d57]'>
                                {getRatingLabel(review.rating)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center gap-1 text-xs text-[#5f5d57]'>
                          <Calendar className='w-3.5 h-3.5' />
                          {review.date}
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className='mt-4'>
                        <h4 className='font-semibold text-black'>
                          {review.title}
                        </h4>
                        <p className='text-[#5f5d57] text-sm leading-relaxed mt-2'>
                          {review.comment}
                        </p>

                        {/* Review Images */}
                        {review.images.length > 0 && (
                          <div className='flex gap-3 mt-3'>
                            {review.images.map((img, idx) => (
                              <div
                                key={idx}
                                className='w-20 h-20 bg-[#f5f5f5] rounded-lg overflow-hidden'
                              >
                                <img
                                  src={img}
                                  alt={`Review image ${idx + 1}`}
                                  className='object-cover w-full h-full'
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Review Footer */}
                      <div className='flex items-center gap-4 mt-4 pt-4 border-t border-[#f0eee9]'>
                        <button className='flex items-center gap-1.5 text-xs text-[#5f5d57] hover:text-[#1f3b2c] transition'>
                          <ThumbsUp className='w-4 h-4' />
                          Helpful ({review.helpful})
                        </button>
                        <button className='flex items-center gap-1.5 text-xs text-[#5f5d57] hover:text-[#1f3b2c] transition'>
                          <ThumbsDown className='w-4 h-4' />
                          Report
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Write a Review Button */}
              <div className='mt-8 text-center'>
                <Link
                  href={`/products/${product.slug}/reviews/write`}
                  className='inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/80 transition'
                >
                  <Star className='w-4 h-4' />
                  Write a Review
                </Link>
                <p className='text-xs text-[#5f5d57] mt-2'>
                  Share your experience with this product
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
