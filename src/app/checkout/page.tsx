"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Database,
  Loader2,
} from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";
import {
  formatAed,
  FREE_SHIPPING_THRESHOLD_AED,
  STANDARD_SHIPPING_AED,
  VAT_RATE,
} from "@/data/products";
import { createOrder, isSupabaseConfigured } from "@/lib/supabase";

const UAE_EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

type PaymentMethod = "card" | "apple-pay" | "cod";

interface ConfirmedOrder {
  orderId: string;
  customerName: string;
  email: string;
  emirate: string;
  address: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  savedToSupabase: boolean;
}

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart, isHydrated } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+971 ");
  const [emirate, setEmirate] = useState("Dubai");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null
  );

  const shippingAed =
    items.length === 0
      ? 0
      : subtotal >= FREE_SHIPPING_THRESHOLD_AED
        ? 0
        : STANDARD_SHIPPING_AED;
  const vatAed = Math.round(subtotal * VAT_RATE * 100) / 100;
  const totalAed = subtotal + shippingAed + vatAed;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !address.trim()) {
      setError("Please fill in your full name, email, and delivery address.");
      return;
    }

    if (
      paymentMethod === "card" &&
      (cardNumber.replace(/\s/g, "").length < 12 ||
        !cardExpiry.trim() ||
        cardCvc.trim().length < 3)
    ) {
      setError(
        "Please enter valid card details or choose another payment method."
      );
      return;
    }

    setIsSubmitting(true);
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SS-2026-${randomDigits}`;

    let savedToSupabase = false;
    if (isSupabaseConfigured()) {
      const result = await createOrder({
        order_number: orderNumber,
        customer_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        emirate,
        address: address.trim(),
        notes: notes.trim(),
        payment_method: paymentMethod,
        items: items.map(({ product, quantity }) => ({
          product_id: product.id,
          name: product.name,
          price_aed: product.priceAed,
          quantity,
        })),
        subtotal_aed: subtotal,
        shipping_aed: shippingAed,
        vat_aed: vatAed,
        total_aed: totalAed,
      });

      if (!result.savedToSupabase) {
        setError(
          `Could not save order to Supabase: ${result.error || "Unknown error"}`
        );
        setIsSubmitting(false);
        return;
      }
      savedToSupabase = true;
    }

    const snapshot: ConfirmedOrder = {
      orderId: orderNumber,
      customerName: fullName.trim(),
      email: email.trim(),
      emirate,
      address: address.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      shipping: shippingAed,
      vat: vatAed,
      total: totalAed,
      savedToSupabase,
    };

    setConfirmedOrder(snapshot);
    clearCart();
    setIsSubmitting(false);
  };

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-sm font-semibold text-navy-600">
        Loading checkout...
      </div>
    );
  }

  // Order Confirmation State
  if (confirmedOrder) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-xl">
          <div className="bg-navy-900 px-8 py-10 text-center text-white">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange">
              Order Confirmed
            </span>
            <h1 className="mt-1 font-display text-4xl font-extrabold uppercase tracking-wide">
              Thank You, {confirmedOrder.customerName}!
            </h1>
            <p className="mt-2 text-sm text-navy-200">
              Order{" "}
              <strong className="text-white">{confirmedOrder.orderId}</strong>{" "}
              is confirmed. A receipt has been prepared for{" "}
              <span className="text-white">{confirmedOrder.email}</span>.
            </p>
            {confirmedOrder.savedToSupabase && (
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                <Database className="h-3.5 w-3.5" />
                Saved to Supabase orders table
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-navy-400">
                  Delivery Address
                </div>
                <div className="mt-1 font-semibold text-navy-900">
                  {confirmedOrder.address}
                </div>
                <div className="text-navy-600">
                  {confirmedOrder.emirate}, United Arab Emirates
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-navy-400">
                  Payment & ETA
                </div>
                <div className="mt-1 font-semibold text-navy-900">
                  {confirmedOrder.paymentMethod === "card"
                    ? "Credit / Debit Card"
                    : confirmedOrder.paymentMethod === "apple-pay"
                      ? "Apple Pay"
                      : "Cash on Delivery"}
                </div>
                <div className="text-navy-600">
                  Estimated delivery: 1–2 business days
                </div>
              </div>
            </div>

            <h2 className="mt-7 font-display text-xl font-bold uppercase text-navy-900">
              Items Ordered
            </h2>
            <ul className="mt-3 divide-y divide-navy-100 border-y border-navy-100">
              {confirmedOrder.items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg bg-[#F4F6F9] object-cover"
                    />
                    <div>
                      <div className="font-bold text-navy-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-navy-500">
                        Qty: {quantity} × {formatAed(product.priceAed)}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-navy-900">
                    {formatAed(product.priceAed * quantity)}
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between text-navy-600">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-navy-900">
                  {formatAed(confirmedOrder.subtotal)}
                </dd>
              </div>
              <div className="flex justify-between text-navy-600">
                <dt>UAE Delivery</dt>
                <dd className="font-semibold text-navy-900">
                  {confirmedOrder.shipping === 0
                    ? "FREE"
                    : formatAed(confirmedOrder.shipping)}
                </dd>
              </div>
              <div className="flex justify-between text-navy-600">
                <dt>UAE VAT (5%)</dt>
                <dd className="font-semibold text-navy-900">
                  {formatAed(confirmedOrder.vat)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-navy-100 pt-3 text-base font-extrabold text-navy-900">
                <dt>Total Paid</dt>
                <dd className="text-brand-orange">
                  {formatAed(confirmedOrder.total)}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-orangeDark"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-navy-200 px-6 py-3.5 text-sm font-bold text-navy-900 transition-colors hover:bg-navy-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Secure UAE Checkout
          </span>
          <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">
            Checkout
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-navy-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50">
              <ShoppingBag className="h-8 w-8 text-brand-orange" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-extrabold uppercase text-navy-900">
              Nothing to Check Out Yet
            </h2>
            <p className="mt-2 text-sm text-navy-600">
              Your cart is currently empty. Add some gear before proceeding to
              checkout.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-orangeDark"
            >
              Shop Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-8 lg:grid-cols-12"
            noValidate
          >
            {/* Left Form */}
            <div className="space-y-6 lg:col-span-7">
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Contact & Delivery */}
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-extrabold uppercase text-navy-900">
                  1. Delivery Details (UAE)
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Omar Al Mansoori"
                      className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.ae"
                      className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                    >
                      UAE Mobile Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="emirate"
                      className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                    >
                      Emirate *
                    </label>
                    <select
                      id="emirate"
                      value={emirate}
                      onChange={(e) => setEmirate(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                    >
                      {UAE_EMIRATES.map((em) => (
                        <option key={em} value={em}>
                          {em}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                    >
                      Street / Building / Villa *
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Marina Gate 1, Apt 1402"
                      className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                    >
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      id="notes"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Leave with building reception, call on arrival..."
                      className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-extrabold uppercase text-navy-900">
                  2. Payment Method
                </h2>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-bold transition-all ${
                      paymentMethod === "card"
                        ? "border-brand-orange bg-brand-orangeLight text-navy-900 shadow-sm"
                        : "border-navy-100 bg-slate-50 text-navy-600 hover:border-navy-200"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-brand-orange" />
                    Credit / Debit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple-pay")}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-bold transition-all ${
                      paymentMethod === "apple-pay"
                        ? "border-brand-orange bg-brand-orangeLight text-navy-900 shadow-sm"
                        : "border-navy-100 bg-slate-50 text-navy-600 hover:border-navy-200"
                    }`}
                  >
                    <Smartphone className="h-5 w-5 text-brand-orange" />
                    Apple Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-bold transition-all ${
                      paymentMethod === "cod"
                        ? "border-brand-orange bg-brand-orangeLight text-navy-900 shadow-sm"
                        : "border-navy-100 bg-slate-50 text-navy-600 hover:border-navy-200"
                    }`}
                  >
                    <Banknote className="h-5 w-5 text-brand-orange" />
                    Cash on Delivery
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="cardNumber"
                        className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                      >
                        Card Number *
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 1234 5678 9010"
                        className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardExpiry"
                        className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                      >
                        Expiry Date *
                      </label>
                      <input
                        id="cardExpiry"
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardCvc"
                        className="block text-xs font-bold uppercase tracking-wide text-navy-700"
                      >
                        CVC *
                      </label>
                      <input
                        id="cardCvc"
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="mt-1.5 w-full rounded-xl border border-navy-200 bg-slate-50 px-4 py-3 text-sm text-navy-900 focus:border-brand-orange focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "apple-pay" && (
                  <p className="mt-4 rounded-xl bg-navy-50 px-4 py-3 text-xs font-medium text-navy-700">
                    Express Apple Pay demo confirmation will complete when you
                    click Place Order.
                  </p>
                )}

                {paymentMethod === "cod" && (
                  <p className="mt-4 rounded-xl bg-navy-50 px-4 py-3 text-xs font-medium text-navy-700">
                    Pay in cash (AED) directly to the courier upon delivery in{" "}
                    <strong>{emirate}</strong>.
                  </p>
                )}
              </div>

              <Link
                href="/cart"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-800 transition-colors hover:text-brand-orange"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Cart
              </Link>
            </div>

            {/* Right Summary */}
            <aside className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-extrabold uppercase text-navy-900">
                  Order Summary ({totalItems})
                </h2>

                <ul className="mt-4 max-h-72 divide-y divide-navy-100 overflow-y-auto pr-1">
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex items-center justify-between gap-3 py-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F4F6F9]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-white">
                            {quantity}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-navy-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-navy-500">
                            {formatAed(product.priceAed)} each
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 font-bold text-navy-900">
                        {formatAed(product.priceAed * quantity)}
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="mt-4 space-y-2.5 border-t border-navy-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-navy-600">Subtotal</dt>
                    <dd className="font-bold text-navy-900">
                      {formatAed(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-600">UAE Delivery ({emirate})</dt>
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

                <div className="mt-4 flex items-baseline justify-between border-t border-navy-100 pt-4">
                  <span className="text-base font-bold text-navy-900">
                    Total Due
                  </span>
                  <span className="text-2xl font-extrabold text-navy-900">
                    {formatAed(totalAed)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orangeDark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving Order...
                    </>
                  ) : (
                    <>
                      Place Order · {formatAed(totalAed)}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-navy-500">
                  <ShieldCheck className="h-4 w-4 text-brand-orange" />
                  <span>Encrypted Demo Checkout · No Real Charge</span>
                </div>
              </div>
            </aside>
          </form>
        )}
      </section>
    </div>
  );
}
