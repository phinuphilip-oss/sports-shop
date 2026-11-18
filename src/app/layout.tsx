import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "sports-shop | Premium Sports Accessories in the UAE",
  description:
    "Shop high-performance sports accessories with fast UAE delivery and prices in AED — yoga mats, dumbbells, footballs, tennis rackets, cycling helmets, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${barlowCondensed.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans text-navy-900">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
