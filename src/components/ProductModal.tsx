"use client";

import { useState } from "react";
import { X, Star, CheckCircle2, Minus, Plus, ShoppingCart } from "lucide-react";
import { Product, formatAed } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, qty);
    setQty(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-md transition-colors hover:bg-navy-900 hover:text-white"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="flex items-center justify-center bg-[#F4F6F9] p-6">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-80 w-full rounded-xl object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {product.category}
            </span>
            {product.badge && (
              <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {product.badge}
              </span>
            )}
          </div>

          <h2
            id="product-modal-title"
            className="mt-3 font-display text-3xl font-extrabold uppercase tracking-wide text-navy-900"
          >
            {product.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-brand-orange text-brand-orange" />
              <span className="font-bold text-navy-900">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-navy-400">
              ({product.reviewCount} verified reviews)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-extrabold text-navy-900">
              {formatAed(product.priceAed)}
            </span>
            {product.originalPriceAed && (
              <span className="text-sm font-medium text-navy-400 line-through">
                {formatAed(product.originalPriceAed)}
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-navy-600">
            {product.description}
          </p>

          <ul className="mt-4 space-y-2">
            {product.specs.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-2 text-xs font-medium text-navy-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>

          {/* Qty & Add */}
          <div className="mt-6 flex items-center gap-3 pt-4">
            <div className="inline-flex items-center rounded-xl border border-navy-200 bg-navy-50/50">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 text-navy-900 transition-colors hover:text-brand-orange"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-9 text-center text-sm font-bold text-navy-900">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="p-3 text-navy-900 transition-colors hover:text-brand-orange"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-orangeDark"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart · {formatAed(product.priceAed * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
