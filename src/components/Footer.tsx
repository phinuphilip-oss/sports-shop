import Link from "next/link";
import { Zap, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-900 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange text-white">
                <Zap className="h-4 w-4 fill-current" />
              </span>
              <span className="font-display text-2xl font-extrabold uppercase tracking-wider text-white">
                sports<span className="text-brand-orange">-shop</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-200">
              Performance sports accessories curated for everyday athletes across
              the UAE. Built for durability, comfort, and results — priced
              transparently in AED.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-navy-100">
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-brand-orange" />
                UAE-Wide Delivery
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-orange" />
                100% Authentic Gear
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-brand-orange" />
                30-Day Returns
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-orange">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-brand-orange"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Fitness"
                  className="transition-colors hover:text-brand-orange"
                >
                  Fitness Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Ball%20Sports"
                  className="transition-colors hover:text-brand-orange"
                >
                  Ball Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Cycling"
                  className="transition-colors hover:text-brand-orange"
                >
                  Cycling Gear
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Orders
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/cart"
                  className="transition-colors hover:text-brand-orange"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="transition-colors hover:text-brand-orange"
                >
                  Checkout
                </Link>
              </li>
              <li className="text-navy-300">Dubai, United Arab Emirates</li>
              <li className="text-navy-300">support@sports-shop.ae</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-6 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} sports-shop. All rights reserved.</p>
          <p>All prices displayed in UAE Dirhams (AED)</p>
        </div>
      </div>
    </footer>
  );
}
