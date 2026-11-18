"use client";

import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  formatAed,
  FREE_SHIPPING_THRESHOLD_AED,
  STANDARD_SHIPPING_AED,
  VAT_RATE,
} from "@/data/products";

export default function CartPage() {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clearCart, isHydrated } =
    useCart();

  const shippingAed =
    items.length === 0
      ? 0
      : subtotal >= FREE_SHIPPING_THRESHOLD_AED
        ? 0
        : STANDARD_SHIPPING_AED;
  const vatAed = Math.round(subtotal * VAT_RATE * 100) / 100;
  const totalAed = subtotal + shippingAed + vatAed;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD_AED - subtotal
  );
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD_AED) * 100)
  );

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-sm font-semibold text-navy-600">
        Loading your cart...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            sports-shop Bag
          </span>
          <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">
            Shopping Cart{" "}
            <span className="text-brand-orange">({totalItems})</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-navy-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50 text-navy-900">
              <ShoppingBag className="h-8 w-8 text-brand-orange" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-extrabold uppercase text-navy-900">
              Your Cart Is Empty
            </h2>
            <p className="mt-2 text-sm text-navy-600">
              Add your favorite sports accessories to get started — free UAE
              delivery unlocks at AED 250.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-orangeDark"
            >
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Cart Items List */}
            <div className="space-y-4 lg:col-span-8">
              {/* Free shipping meter */}
              <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-2 text-sm font-semibold text-navy-900">
                  <span className="inline-flex items-center gap-2">
                    <Truck className="h-4 w-4 text-brand-orange" />
                    {remainingForFreeShipping === 0 ? (
                      <span>
                        You unlocked{" "}
                        <strong className="text-brand-orange">
                          FREE UAE Express Delivery!
                        </strong>
                      </span>
                    ) : (
                      <span>
                        Add{" "}
                        <strong className="text-brand-orange">
                          {formatAed(remainingForFreeShipping)}
                        </strong>{" "}
                        more for free UAE delivery
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-bold text-navy-500">
                    {progressPercent}%
                  </span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-navy-50">
                  <div
                    className="h-full rounded-full bg-brand-orange transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Line items */}
              <div className="divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F4F6F9]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                        {product.category}
                      </span>
                      <h3 className="font-display text-xl font-bold text-navy-900">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-navy-500">
                        {formatAed(product.priceAed)} each
                      </p>
                    </div>

                    {/* Quantity + Subtotal */}
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="inline-flex items-center rounded-xl border border-navy-200 bg-slate-50">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="p-2.5 text-navy-800 transition-colors hover:text-brand-orange"
                          aria-label={`Decrease quantity of ${product.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-navy-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="p-2.5 text-navy-800 transition-colors hover:text-brand-orange"
                          aria-label={`Increase quantity of ${product.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="min-w-[92px] text-right text-base font-extrabold text-navy-900">
                        {formatAed(product.priceAed * quantity)}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="rounded-lg p-2 text-navy-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-800 transition-colors hover:text-brand-orange"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-bold text-navy-400 transition-colors hover:text-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-extrabold uppercase text-navy-900">
                  Order Summary
                </h2>

                <dl className="mt-5 space-y-3 border-b border-navy-100 pb-5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-navy-600">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </dt>
                    <dd className="font-bold text-navy-900">
                      {formatAed(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-600">UAE Delivery</dt>
                    <dd className="font-bold text-navy-900">
                      {shippingAed === 0 ? (
                        <span className="text-brand-orange">FREE</span>
                      ) : (
                        formatAed(shippingAed)
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-600">UAE VAT (5%)</dt>
                    <dd className="font-bold text-navy-900">
                      {formatAed(vatAed)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-baseline justify-between">
                  <span className="text-base font-bold text-navy-900">
                    Total
                  </span>
                  <span className="text-2xl font-extrabold text-navy-900">
                    {formatAed(totalAed)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:bg-brand-orangeDark active:scale-[0.99]"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="mt-4 text-center text-xs text-navy-400">
                  Secure checkout · Card, Apple Pay, or Cash on Delivery
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
