"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Database } from "lucide-react";
import {
  PRODUCTS,
  CATEGORIES,
  Product,
  ProductCategory,
} from "@/data/products";
import { fetchProducts } from "@/lib/supabase";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");
  const validInitialCategory = CATEGORIES.includes(
    initialCategoryParam as "All" | ProductCategory
  )
    ? (initialCategoryParam as "All" | ProductCategory)
    : "All";

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [dataSource, setDataSource] = useState<"loading" | "supabase" | "fallback">(
    "loading"
  );
  const [activeCategory, setActiveCategory] = useState<"All" | ProductCategory>(
    validInitialCategory
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchProducts().then(({ products: loaded, source }) => {
      if (mounted) {
        setProducts(loaded);
        setDataSource(source);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => a.priceAed - b.priceAed);
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => b.priceAed - a.priceAed);
    }
    if (sortBy === "rating") {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                sports-shop Catalog
              </span>
              <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">
                All Sports Accessories
              </h1>
            </div>
            {dataSource === "supabase" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                <Database className="h-3.5 w-3.5" />
                Live from Supabase
              </span>
            )}
          </div>
          <p className="mt-2 max-w-2xl text-sm text-navy-200 sm:text-base">
            {products.length} pro-grade essentials priced in UAE Dirhams (AED).
            Click any item to view specifications or add straight to your cart.
          </p>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                    isSelected
                      ? "bg-navy-900 text-white shadow-sm"
                      : "bg-navy-50 text-navy-700 hover:bg-navy-100"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gear..."
                className="w-full rounded-xl border border-navy-200 bg-slate-50 py-2 pl-9 pr-8 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-orange focus:bg-white focus:outline-none sm:w-56"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-900"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-navy-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="rounded-xl border border-navy-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High (AED)</option>
                <option value="price-desc">Price: High to Low (AED)</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="mt-6 flex items-center justify-between text-xs font-semibold text-navy-500">
          <span>
            Showing{" "}
            <strong className="text-navy-900">{filteredProducts.length}</strong>{" "}
            of {products.length} products
          </span>
          {(activeCategory !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="text-brand-orange hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center">
            <p className="text-lg font-bold text-navy-900">
              No matching gear found
            </p>
            <p className="mt-1 text-sm text-navy-500">
              Try a different keyword or browse all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-orangeDark"
            >
              Show All Products
            </button>
          </div>
        )}
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm font-semibold text-navy-600">
          Loading products...
        </div>
      }
    >
      <ProductsCatalog />
    </Suspense>
  );
}
