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

  const handleAddToCart = () => {
    console.log("Added to cart:", productId, "qty:", quantity);
    // Cart API call comes in Phase 5
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      <Button size="lg" className="flex-1" onClick={handleAddToCart}>
        <i className="fa-solid fa-bag-shopping mr-2"></i> Add to cart
      </Button>
    </div>
  );
}
