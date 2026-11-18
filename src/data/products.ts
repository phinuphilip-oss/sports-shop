export type ProductCategory = "Fitness" | "Ball Sports" | "Cycling" | "Accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  priceAed: number;
  originalPriceAed?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  shortDescription: string;
  description: string;
  specs: string[];
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "yoga-mat",
    slug: "yoga-mat",
    name: "Pro Grip Yoga Mat",
    category: "Fitness",
    priceAed: 149,
    originalPriceAed: 179,
    rating: 4.9,
    reviewCount: 128,
    badge: "Bestseller",
    image: "/images/yoga-mat.jpg",
    shortDescription: "6 mm high-density non-slip TPE mat with carry strap.",
    description:
      "Engineered for stability through hot yoga, mobility flows, and core workouts. Dual-layer textured cushioning protects your joints while keeping palms and feet locked in place.",
    specs: [
      "Thickness: 6 mm cushioned high-density TPE",
      "Dimensions: 183 × 61 cm",
      "Sweat-resistant laser-etched grip surface",
      "Includes woven navy & orange carry strap",
    ],
    inStock: true,
  },
  {
    id: "dumbbell-set",
    slug: "dumbbell-set",
    name: "Hex Rubber Dumbbell Set",
    category: "Fitness",
    priceAed: 320,
    rating: 4.8,
    reviewCount: 94,
    badge: "Pro Choice",
    image: "/images/dumbbell-set.jpg",
    shortDescription: "Pair of 10 kg anti-roll rubber-coated hex dumbbells.",
    description:
      "Built for home gyms and commercial strength zones. Anti-roll hexagonal heads protect floors and allow floor-based push-up rows, paired with ergonomic knurled steel handles.",
    specs: [
      "Total Weight: 20 kg (2 × 10 kg pair)",
      "Anti-roll virgin rubber coating",
      "Contoured chrome knurled handles",
      "Noise-dampening floor-safe design",
    ],
    inStock: true,
  },
  {
    id: "football",
    slug: "football",
    name: "Match Pro Football",
    category: "Ball Sports",
    priceAed: 115,
    rating: 4.7,
    reviewCount: 76,
    image: "/images/football.jpg",
    shortDescription: "Size 5 thermally bonded match ball with high-visibility panels.",
    description:
      "Consistent flight, soft touch, and minimal water uptake. Thermally bonded micro-textured panels deliver reliable control on natural grass and modern artificial turf pitches.",
    specs: [
      "Official Size 5 match weight & circumference",
      "Thermally bonded seamless PU cover",
      "Butyl bladder for superior air retention",
      "Suitable for grass & 4G/5G turf",
    ],
    inStock: true,
  },
  {
    id: "tennis-racket",
    slug: "tennis-racket",
    name: "AeroCarbon Tennis Racket",
    category: "Ball Sports",
    priceAed: 485,
    originalPriceAed: 540,
    rating: 4.9,
    reviewCount: 62,
    badge: "New Arrival",
    image: "/images/tennis-racket.jpg",
    shortDescription: "Lightweight 295 g carbon-graphite frame, pre-strung.",
    description:
      "Designed for crisp baseline power and agile net play. Full-graphite aerospace layup dampens vibration while an aerodynamic beam accelerates swing speed.",
    specs: [
      "Unstrung Weight: 295 g | Head Size: 100 sq in",
      "16 × 19 spin-friendly string pattern",
      "Grip Size: L3 (4 3/8 in) cushioned wrap",
      "Pre-strung with durable synthetic gut",
    ],
    inStock: true,
  },
  {
    id: "cycling-helmet",
    slug: "cycling-helmet",
    name: "VeloShield Cycling Helmet",
    category: "Cycling",
    priceAed: 275,
    rating: 4.8,
    reviewCount: 83,
    badge: "Top Rated",
    image: "/images/cycling-helmet.jpg",
    shortDescription: "22-vent aero road helmet with micro-dial precision fit.",
    description:
      "Stay cool on long desert road rides and city commutes. In-mold polycarbonate shell fused with impact-absorbing EPS foam offers featherweight protection and effortless airflow.",
    specs: [
      "22 wind-tunnel cooling air vents",
      "360° micro-dial fit adjustment system",
      "Weight: 245 g (Size M/L 55–61 cm)",
      "Removable moisture-wicking antibacterial pads",
    ],
    inStock: true,
  },
  {
    id: "water-bottle",
    slug: "water-bottle",
    name: "HydroCore Insulated Water Bottle",
    category: "Accessories",
    priceAed: 89,
    rating: 4.9,
    reviewCount: 214,
    badge: "Bestseller",
    image: "/images/water-bottle.jpg",
    shortDescription: "750 ml double-wall stainless steel bottle — cold for 24 hrs.",
    description:
      "Built for UAE heat. Vacuum-insulated food-grade 18/8 stainless steel keeps water ice-cold for up to 24 hours, finished with a sweat-free matte powder coat and one-hand sport spout.",
    specs: [
      "Capacity: 750 ml (25 oz)",
      "24 hrs cold / 12 hrs hot vacuum insulation",
      "BPA-free leakproof flip-top sport lid",
      "Fits standard gym & bike bottle cages",
    ],
    inStock: true,
  },
  {
    id: "resistance-bands",
    slug: "resistance-bands",
    name: "PowerLoop Resistance Bands",
    category: "Fitness",
    priceAed: 95,
    originalPriceAed: 115,
    rating: 4.7,
    reviewCount: 151,
    image: "/images/resistance-bands.jpg",
    shortDescription: "5-level progressive loop band kit with travel mesh pouch.",
    description:
      "From warm-up activation to heavy lower-body burnout sets, this 5-band progressive resistance kit goes anywhere. Snap-resistant natural latex stays flat without rolling.",
    specs: [
      "5 Resistance Levels: X-Light to X-Heavy (5–40 lbs)",
      "100% skin-friendly natural layered latex",
      "Compact breathable navy mesh carry pouch",
      "Includes illustrated quick-start workout card",
    ],
    inStock: true,
  },
  {
    id: "gym-gloves",
    slug: "gym-gloves",
    name: "FlexGrip Training Gym Gloves",
    category: "Accessories",
    priceAed: 110,
    rating: 4.6,
    reviewCount: 109,
    image: "/images/gym-gloves.jpg",
    shortDescription: "Breathable fingerless lifting gloves with wrist support.",
    description:
      "Protect your palms and stabilize your wrists on deadlifts, pull-ups, and kettlebell complexes. Silicone-printed microfiber palms prevent slipping while mesh backs release heat.",
    specs: [
      "Padded anti-slip silicone palm reinforcement",
      "Adjustable hook-and-loop wrist support wrap",
      "Breathable four-way stretch mesh back",
      "Quick-release finger pull tabs",
    ],
    inStock: true,
  },
];

export const CATEGORIES: ("All" | ProductCategory)[] = [
  "All",
  "Fitness",
  "Ball Sports",
  "Cycling",
  "Accessories",
];

export function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString("en-AE", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export const FREE_SHIPPING_THRESHOLD_AED = 250;
export const STANDARD_SHIPPING_AED = 20;
export const VAT_RATE = 0.05;
