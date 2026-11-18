"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  CreditCard,
  Dumbbell,
  Bike,
  Trophy,
  Sparkles,
} from "lucide-react";
import { PRODUCTS, Product, formatAed } from "@/data/products";
import { fetchProducts } from "@/lib/supabase";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";

const CATEGORY_CARDS = [
  {
    name: "Fitness",
    subtitle: "Mats, dumbbells & bands",
    count: "3 products",
    href: "/products?category=Fitness",
    icon: Dumbbell,
  },
  {
    name: "Ball Sports",
    subtitle: "Match balls & rackets",
    count: "2 products",
    href: "/products?category=Ball%20Sports",
    icon: Trophy,
  },
  {
    name: "Cycling",
    subtitle: "Aero helmets & safety",
    count: "1 product",
    href: "/products?category=Cycling",
    icon: Bike,
  },
  {
    name: "Accessories",
    subtitle: "Hydration & lifting gear",
    count: "2 products",
    href: "/products?category=Accessories",
    icon: Sparkles,
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchProducts().then(({ products: loaded }) => {
      if (mounted && loaded.length > 0) {
        setProducts(loaded);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        {/* Subtle geometric accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-navy-500/20 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
          {/* Left Copy */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-brand-orange">
              UAE Performance Gear · Prices in AED
            </span>

            <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Gear Up.
              <br />
              Train <span className="text-brand-orange">Harder.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
              Discover essential sports accessories built for gym sessions,
              courts, pitches, and coastal road rides. Direct to your door
              across Dubai, Abu Dhabi, and the UAE.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orangeDark active:scale-95"
              >
                Shop All {products.length} Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
              >
                View Cart
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-navy-800 pt-7">
              <div>
                <div className="font-display text-3xl font-extrabold text-brand-orange">
                  {products.length}+
                </div>
                <div className="text-xs font-medium text-navy-200">
                  Pro Essentials
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-white">
                  24h
                </div>
                <div className="text-xs font-medium text-navy-200">
                  Dubai Dispatch
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-white">
                  4.8★
                </div>
                <div className="text-xs font-medium text-navy-200">
                  Athlete Rated
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedProduct(item)}
                  className="group overflow-hidden rounded-2xl border border-navy-700/80 bg-white p-3 text-left shadow-xl transition-all hover:-translate-y-1 hover:border-brand-orange"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-[#F4F6F9]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 px-1">
                    <span className="truncate text-xs font-bold text-navy-900">
                      {item.name}
                    </span>
                    <span className="shrink-0 rounded-md bg-navy-900 px-2 py-0.5 text-[11px] font-bold text-brand-orange">
                      {formatAed(item.priceAed)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value / Trust Strip */}
      <section className="border-b border-navy-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-7 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orangeLight text-brand-orange">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-navy-900">
                Free UAE Shipping
              </div>
              <div className="text-xs text-navy-500">On orders over AED 250</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orangeLight text-brand-orange">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-navy-900">
                Quality Guaranteed
              </div>
              <div className="text-xs text-navy-500">Pro-tested materials</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orangeLight text-brand-orange">
              <RefreshCw className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-navy-900">
                Easy 30-Day Returns
              </div>
              <div className="text-xs text-navy-500">Hassle-free exchanges</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orangeLight text-brand-orange">
              <CreditCard className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-navy-900">
                Flexible AED Pay
              </div>
              <div className="text-xs text-navy-500">Card, Apple Pay & COD</div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Browse Categories
            </span>
            <h2 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-wide text-navy-900 sm:text-4xl">
              Shop By Sport
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1.5 text-sm font-bold text-navy-800 transition-colors hover:text-brand-orange sm:inline-flex"
          >
            Explore All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex items-center justify-between rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-orange hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-navy-900">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-navy-500">{cat.subtitle}</p>
                    <p className="mt-1 text-[11px] font-bold text-brand-orange">
                      {cat.count}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-orange" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Gear */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Athlete Favorites
            </span>
            <h2 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-wide text-navy-900 sm:text-4xl">
              Featured Gear
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-orange"
          >
            View All {products.length}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* Promo CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-white shadow-xl sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-brand-orange/20 blur-2xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-block rounded-md bg-brand-orange px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Complete Your Kit
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">
                Ready for Your Next Personal Best?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-200 sm:text-base">
                Mix and match fitness, court, pitch, and cycling gear. Orders
                over <strong className="text-white">AED 250</strong> unlock free
                express delivery anywhere in the UAE.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-orange px-7 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-brand-orangeDark active:scale-95"
            >
              Browse Full Catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
