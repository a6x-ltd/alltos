// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products, getProductBySlug, getRelatedProducts } from '@/utils/data';
import { formatCurrency } from '@/utils/currency';
import Button from '@/components/ui/Button';
import QuantitySelector from '@/components/ui/QuantitySelector';
import ProductCard from '@/components/ui/ProductCard';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  return (
    <section className="section-pad">
      <div className="container-custom">
        <div className="bg-white rounded-4xl shadow-sm border border-[#eae8e2] overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f5f3ef] p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-3xl w-full max-w-md object-cover aspect-square"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1f3b2c]/60">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-light text-[#1f3b2c] mt-1">{product.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm">⭐ {product.rating} ({product.reviews} reviews)</span>
                <span className="text-sm text-[#5f5d57]">· {product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
              </div>
              <p className="text-[#3f3e3a] leading-relaxed mt-4 max-w-sm">{product.description}</p>
              <div className="mt-6">
                <span className="text-3xl font-medium text-[#1f3b2c]">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <QuantitySelector quantity={1} onQuantityChange={() => {}} />
                <Button size="lg" className="flex-1">
                  <i className="fa-solid fa-bag-shopping mr-2"></i> Add to cart
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#5f5d57]">
                <span><i className="fa-regular fa-truck mr-2"></i> Free UK shipping over £30</span>
                <span><i className="fa-regular fa-clock mr-2"></i> 2‑3 day delivery</span>
                <span><i className="fa-regular fa-credit-card mr-2"></i> Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light text-[#1f3b2c] mb-6">You might also like</h2>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Generate static paths for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}