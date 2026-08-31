// app/products/[slug]/reviews/write/page.tsx
'use client';

import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Anton, Inter } from 'next/font/google';
import { 
  ArrowLeft, 
  Star, 
  Upload, 
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getProductBySlug } from '@/utils/data';
import { formatCurrency } from '@/utils/currency';
import { getImageUrl } from '@/utils/images';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export default function WriteReviewPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const product = getProductBySlug(slug);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  if (!product) {
    notFound();
  }

  const productImageUrl = getImageUrl(product.image);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      setError('You can upload a maximum of 5 images');
      return;
    }

    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setError('Please upload only image files');
      return;
    }

    setImages([...images, ...validFiles]);
    
    // Create preview URLs
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setError('');
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a review title');
      return;
    }
    if (!review.trim()) {
      setError('Please write your review');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Review submitted:', {
        productId: product.id,
        rating,
        title,
        review,
        name,
        email,
        images: images.map(f => f.name),
      });
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (value: number, size: number = 8) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-${size} h-${size} cursor-pointer transition-all duration-150 ${
              star <= (hoverRating || rating)
                ? 'fill-[#ead6c8] text-[#ead6c8] scale-110'
                : 'text-[#d8d5ce] hover:text-[#ead6c8]'
            }`}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => handleRatingHover(star)}
            onMouseLeave={handleRatingLeave}
          />
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black`}>
        <section className="min-h-[70vh] flex items-center justify-center px-6 md:px-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-[#ead6c8] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl text-black">
              Review Submitted!
            </h1>
            <p className="text-[#5f5d57] mt-4">
              Thank you for sharing your experience with {product.name}. Your review will help others make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/80 transition"
              >
                Back to Product
              </Link>
              <Link
                href={`/products/${product.slug}/reviews`}
                className="inline-flex items-center justify-center gap-2 border border-black text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                View All Reviews
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black`}>
      
      {/* Header */}
      <div className="bg-[#f5f5f5] py-4 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm text-[#5f5d57] hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {product.name}
          </Link>
        </div>
      </div>

      <section className="py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Product Info */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-[#eae8e2]">
            <div className="w-16 h-16 bg-[#f5f5f5] rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={productImageUrl}
                alt={product.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.png';
                }}
              />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-display)] uppercase text-xl md:text-2xl text-black">
                Write a Review
              </h1>
              <p className="text-sm text-[#5f5d57]">{product.name} • {formatCurrency(product.price)}</p>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col items-start gap-2">
                {renderStars(rating, 8)}
                {rating > 0 && (
                  <span className="text-sm text-[#5f5d57]">
                    {rating === 1 && 'Terrible'}
                    {rating === 2 && 'Poor'}
                    {rating === 3 && 'Average'}
                    {rating === 4 && 'Good'}
                    {rating === 5 && 'Excellent'}
                  </span>
                )}
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-black mb-2">
                Review Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="w-full px-5 py-3.5 rounded-xl border border-[#d8d5ce] bg-white focus:outline-none focus:ring-2 focus:ring-[#ead6c8] transition"
                required
              />
            </div>

            {/* Review Content */}
            <div>
              <label htmlFor="review" className="block text-sm font-semibold text-black mb-2">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={6}
                placeholder="Share your experience with this product. What did you like? How did it help you?"
                className="w-full px-5 py-3.5 rounded-xl border border-[#d8d5ce] bg-white focus:outline-none focus:ring-2 focus:ring-[#ead6c8] transition resize-none"
                required
              />
              <p className="text-xs text-[#9b978e] mt-1.5">
                Minimum 20 characters • {review.length} characters
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Add Photos (Optional)
              </label>
              <p className="text-sm text-[#5f5d57] mb-3">
                Upload up to 5 images to help others visualize the product.
              </p>
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-20 h-20 bg-[#f5f5f5] rounded-xl overflow-hidden group">
                      <img
                        src={preview}
                        alt={`Review image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <label className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-dashed border-[#d8d5ce] rounded-xl hover:border-[#ead6c8] transition cursor-pointer group">
                <Upload className="w-5 h-5 text-[#5f5d57] group-hover:text-[#1f3b2c] transition" />
                <span className="text-sm text-[#5f5d57] group-hover:text-[#1f3b2c] transition">
                  {images.length > 0 ? 'Add More Photos' : 'Upload Photos'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={images.length >= 5}
                />
              </label>
              <p className="text-xs text-[#9b978e] mt-2">
                {images.length}/5 images uploaded
              </p>
            </div>

            {/* Personal Information */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-black mb-4">Your Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#5f5d57] mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d5ce] bg-white focus:outline-none focus:ring-2 focus:ring-[#ead6c8] transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#5f5d57] mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d5ce] bg-white focus:outline-none focus:ring-2 focus:ring-[#ead6c8] transition"
                    required
                  />
                  <p className="text-xs text-[#9b978e] mt-1.5">
                    Your email will not be published
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#eae8e2]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-black/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="px-8 py-4 border border-[#d8d5ce] rounded-full text-sm font-medium text-[#5f5d57] hover:border-[#1f3b2c] hover:text-[#1f3b2c] transition text-center"
              >
                Cancel
              </Link>
            </div>

            {/* Review Guidelines */}
            <div className="bg-[#fafafa] rounded-xl p-4 border border-[#eae8e2]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5f5d57] mb-2">
                Review Guidelines
              </h4>
              <ul className="text-xs text-[#5f5d57] space-y-1 list-disc list-inside">
                <li>Focus on your personal experience with the product</li>
                <li>Be honest and constructive in your feedback</li>
                <li>Keep your review relevant to the product</li>
                <li>Respect other users and avoid offensive language</li>
              </ul>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}