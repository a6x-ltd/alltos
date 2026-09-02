// app/cart/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Anton, Inter } from "next/font/google";
import { Minus, Plus, X, Lock, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import Button from "@/components/ui/Button";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

interface CartLine {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
  };
}

const SHIPPING = 3.5;
const VAT_RATE = 0.2;

export default function CartPage() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [promo, setPromo] = useState("");

  const loadCart = () => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data.items ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const res = await fetch(`/api/cart/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    if (res.ok) loadCart();
  };

  const removeItem = async (itemId: string) => {
    const res = await fetch(`/api/cart/items/${itemId}`, { method: "DELETE" });
    if (res.ok) loadCart();
  };

  const subtotal = cart.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const shipping = cart.length ? SHIPPING : 0;
  const vatAmount = (subtotal + shipping) * (VAT_RATE / (1 + VAT_RATE));
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div
        className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-sm text-black/50">Loading your bag...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mb-10">
          Your bag
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 border-t border-black/10">
            <ShoppingBag
              className="w-10 h-10 text-black/30 mb-4"
              strokeWidth={1.5}
            />
            <p className="font-[family-name:var(--font-display)] uppercase text-2xl">
              Your bag is empty
            </p>
            <p className="text-sm text-black/50 mt-2 max-w-xs">
              Items you add will show up here. Let&apos;s find something for
              your routine.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold mt-8 hover:bg-black/85 transition"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            <div className="md:col-span-2 divide-y divide-black/10 border-t border-b border-black/10">
              {cart.map((line) => (
                <div key={line.id} className="flex gap-4 py-6">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 bg-[#F5F5F5] rounded-xl overflow-hidden">
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          {line.product.name}
                        </p>
                        <p className="text-xs uppercase tracking-wide text-black/50 mt-1">
                          {line.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(line.id)}
                        aria-label={`Remove ${line.product.name}`}
                        className="text-black/40 hover:text-black transition h-fit"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center border border-black/15 rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(line.id, line.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-full transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(line.id, line.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-full transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-[family-name:var(--font-display)] text-lg">
                        {formatCurrency(line.product.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F5F5F5] rounded-2xl p-6 h-fit sticky top-24">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
                Order summary
              </h3>
              <div className="mt-5 flex gap-2">
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code"
                  className="min-w-0 flex-1 px-3.5 py-2.5 rounded-full border border-black/15 bg-white text-sm focus:outline-none focus:border-black transition"
                />
                <button
                  type="button"
                  className="shrink-0 px-4 py-2.5 rounded-full border border-black text-sm font-semibold hover:bg-black hover:text-white transition"
                >
                  Apply
                </button>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-black/60">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">VAT (20%, included)</span>
                  <span>{formatCurrency(vatAmount)}</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-black/15 pt-4">
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Total
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-2xl">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
              <Link href="/checkout">
                <Button
                  className="w-full mt-6 !bg-black !text-white !rounded-full hover:!bg-black/85"
                  size="lg"
                >
                  Checkout
                </Button>
              </Link>
              <p className="flex items-center justify-center gap-1.5 text-xs text-black/50 mt-4">
                <Lock className="w-3.5 h-3.5" />
                Secure checkout
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
