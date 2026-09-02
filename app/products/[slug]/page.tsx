
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, getProductBySlug, getRelatedProducts } from '@/utils/data';
import { formatCurrency } from '@/utils/currency';
import { getImageUrl } from '@/utils/images';
import Button from '@/components/ui/Button';
import QuantitySelector from '@/components/ui/QuantitySelector';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug);
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(getRelatedProducts(foundProduct.id));
      } else {
        notFound();
      }
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-[#f5f5f5] rounded-2xl mx-auto mb-4"></div>
          <div className="h-8 bg-[#f5f5f5] rounded-lg max-w-xs mx-auto mb-3"></div>
          <div className="h-4 bg-[#f5f5f5] rounded-lg max-w-sm mx-auto"></div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  // Get the correct image URL
  const productImageUrl = getImageUrl(product.image);

  return (
    <section className="section-pad">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#5f5d57] mb-6">
          <a href="/" className="hover:text-[#1f3b2c] transition">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-[#1f3b2c] transition">Products</a>
          <span>/</span>
          <span className="text-[#1f3b2c] font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-4xl shadow-sm border border-[#eae8e2] overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image - Fixed with getImageUrl */}
            <div className="bg-[#f5f3ef] p-8 flex items-center justify-center relative min-h-[300px]">
              {product.image ? (
                <Image
                  src={productImageUrl}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="rounded-3xl w-full max-w-md object-cover aspect-square"
                  priority
                  unoptimized
                />
              ) : (
                <div className="w-full max-w-md aspect-square bg-[#e8e4de] rounded-3xl flex items-center justify-center text-[#9b978e]">
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>
            
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1f3b2c]/60">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-light text-[#1f3b2c] mt-1">{product.name}</h1>
              
              {/* Reviews Link */}
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm">⭐ {product.rating} ({product.reviews} reviews)</span>
                <Link 
                  href={`/products/${product.slug}/reviews`}
                  className="text-sm text-[#1f3b2c] font-medium hover:underline transition"
                >
                  Read all →
                </Link>
                <span className="text-sm text-[#5f5d57]">· {product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
              </div>
              
              <p className="text-[#3f3e3a] leading-relaxed mt-4 max-w-sm">{product.description}</p>
              <div className="mt-6">
                <span className="text-3xl font-medium text-[#1f3b2c]">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <QuantitySelector 
                  quantity={quantity} 
                  onQuantityChange={handleQuantityChange} 
                />
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <i className="fa-solid fa-bag-shopping mr-2"></i> Add to cart
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#5f5d57]">
                <span>
                  <i className="fa-regular fa-truck mr-2"></i> Free UK shipping over £30
                </span>
                <span>
                  <i className="fa-regular fa-clock mr-2"></i> 2‑3 day delivery
                </span>
                <span>
                  <i className="fa-regular fa-credit-card mr-2"></i> Secure checkout
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light text-[#1f3b2c] mb-6">
              You might also like
            </h2>
            <div className="product-grid">
              {relatedProducts.map((p: Product) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
