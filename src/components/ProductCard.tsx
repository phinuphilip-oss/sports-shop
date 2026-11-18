"use client";

import { useState } from "react";
import { ShoppingCart, Star, Check, Eye } from "lucide-react";
import { Product, formatAed } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F4F6F9]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category & Optional Badge */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-brand-orange px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="rounded-full bg-navy-900/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Quick view button */}
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-navy-900 shadow-md transition-all hover:bg-navy-900 hover:text-white"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-3.5 w-3.5" />
            Details
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs">
          <Star className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
          <span className="font-bold text-navy-900">{product.rating.toFixed(1)}</span>
          <span className="text-navy-400">({product.reviewCount})</span>
        </div>

        {/* Title */}
        <h3 className="mt-2 font-display text-xl font-bold tracking-wide text-navy-900">
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="text-left transition-colors hover:text-brand-orange"
            >
              {product.name}
            </button>
          ) : (
            product.name
          )}
        </h3>

        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-navy-600">
          {product.shortDescription}
        </p>

        {/* Price + Action */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-navy-50 pt-4">
          <div>
            <div className="text-lg font-extrabold text-navy-900">
              {formatAed(product.priceAed)}
            </div>
            {product.originalPriceAed && (
              <div className="text-xs font-medium text-navy-400 line-through">
                {formatAed(product.originalPriceAed)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all ${
              justAdded
                ? "bg-navy-900"
                : "bg-brand-orange hover:bg-brand-orangeDark active:scale-95"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4 text-brand-orange" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
