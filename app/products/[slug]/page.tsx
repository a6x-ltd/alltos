"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { getProductBySlug, getRelatedProducts } from '@/utils/data';
import { formatCurrency } from '@/utils/currency';
import { getImageUrl } from '@/utils/images';
import Button from '@/components/ui/Button';
import QuantitySelector from '@/components/ui/QuantitySelector';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = getProductBySlug(slug);
    
    if (foundProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(foundProduct);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRelatedProducts(getRelatedProducts(foundProduct.id));
    } else {
      notFound();
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-75 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-indigo-600 transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {product.badge && (
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
              {product.badge}
            </span>
          )}

          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="font-medium">{product.rating}</span>
              <span className="text-gray-400">({product.reviews} reviews)</span>
            </div>
            <span className="text-sm text-gray-500">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="text-2xl font-bold text-indigo-600">
            {formatCurrency(product.price)}
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <QuantitySelector 
              quantity={quantity} 
              onQuantityChange={setQuantity}
              maxQuantity={product.stock}
            />
          </div>

          <Button 
            className="w-full py-3 text-lg"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>

          <div className="border-t pt-4 text-sm text-gray-500 space-y-1">
            <p>Category: <span className="capitalize">{product.category}</span></p>
            <p>SKU: #PD-{String(product.id).padStart(4, '0')}</p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}