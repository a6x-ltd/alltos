// app/products/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard data-fetch-on-mount pattern
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (searchTerm.trim()) params.set("search", searchTerm.trim());

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .finally(() => setLoading(false));
  }, [category, searchTerm]);

  return (
    <section className="section-pad">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-light text-[#1f3b2c]">All Products</h1>
            <p className="text-[#5f5d57] mt-1">
              {loading ? "Loading..." : `${products.length} products available`}
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 md:w-64 px-4 py-2.5 rounded-full border border-[#d8d5ce] bg-white focus:outline-none focus:ring-2 focus:ring-[#1f3b2c]/30 text-sm"
            />
            <select className="px-4 py-2.5 rounded-full border border-[#d8d5ce] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1f3b2c]/30">
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#5f5d57]">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
