// components/products/AddToCartControls.tsx
"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import QuantitySelector from "@/components/ui/QuantitySelector";

export default function AddToCartControls({
  productId,
}: {
  productId: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "added" | "error">(
    "idle",
  );

  const handleAddToCart = async () => {
    setStatus("loading");
    const res = await fetch("/api/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    setStatus(res.ok ? "added" : "error");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      <Button
        size="lg"
        className="flex-1"
        onClick={handleAddToCart}
        disabled={status === "loading"}
      >
        <i className="fa-solid fa-bag-shopping mr-2"></i>
        {status === "added"
          ? "Added!"
          : status === "error"
            ? "Try again"
            : "Add to cart"}
      </Button>
    </div>
  );
}
