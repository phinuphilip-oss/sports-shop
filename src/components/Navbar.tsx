"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingBag, Menu, X, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, isHydrated } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-800 bg-navy-900 text-white shadow-md">
      {/* Top UAE Delivery Announcement Strip */}
      <div className="bg-brand-orange px-4 py-1.5 text-center text-xs font-semibold tracking-wide text-white">
        FREE UAE DELIVERY ON ORDERS OVER AED 250 · SAME-DAY DISPATCH IN DUBAI
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange text-white shadow-sm">
            <Zap className="h-5 w-5 fill-current" />
          </span>
          <span className="font-display text-2xl font-extrabold uppercase tracking-wider text-white">
            sports<span className="text-brand-orange">-shop</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-navy-800 text-brand-orange"
                    : "text-navy-100 hover:bg-navy-800/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg bg-brand-orange px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-orangeDark"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-navy-900 px-1.5 text-xs font-bold text-white">
              {isHydrated ? totalItems : 0}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-navy-100 hover:bg-navy-800 hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-navy-800 bg-navy-900 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive
                      ? "bg-navy-800 text-brand-orange"
                      : "text-navy-100 hover:bg-navy-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
