-- ============================================================
-- sports-shop Supabase Schema (2 tables: products & orders)
-- Run this in Supabase Dashboard -> SQL Editor -> New query
-- ============================================================

-- 1. Products table
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  price_aed numeric(10, 2) not null,
  original_price_aed numeric(10, 2),
  rating numeric(2, 1) not null default 4.8,
  review_count integer not null default 0,
  badge text,
  image text not null,
  short_description text not null,
  description text not null,
  specs text[] not null default '{}',
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "Allow public read access to products" on public.products;
create policy "Allow public read access to products"
  on public.products
  for select
  to anon, authenticated
  using (true);

-- Seed the 8 sports-shop products (prices in AED)
insert into public.products (
  id, slug, name, category, price_aed, original_price_aed,
  rating, review_count, badge, image, short_description, description, specs, in_stock
) values
  (
    'yoga-mat',
    'yoga-mat',
    'Pro Grip Yoga Mat',
    'Fitness',
    149,
    179,
    4.9,
    128,
    'Bestseller',
    '/images/yoga-mat.jpg',
    '6 mm high-density non-slip TPE mat with carry strap.',
    'Engineered for stability through hot yoga, mobility flows, and core workouts. Dual-layer textured cushioning protects your joints while keeping palms and feet locked in place.',
    array[
      'Thickness: 6 mm cushioned high-density TPE',
      'Dimensions: 183 x 61 cm',
      'Sweat-resistant laser-etched grip surface',
      'Includes woven navy & orange carry strap'
    ],
    true
  ),
  (
    'dumbbell-set',
    'dumbbell-set',
    'Hex Rubber Dumbbell Set',
    'Fitness',
    320,
    null,
    4.8,
    94,
    'Pro Choice',
    '/images/dumbbell-set.jpg',
    'Pair of 10 kg anti-roll rubber-coated hex dumbbells.',
    'Built for home gyms and commercial strength zones. Anti-roll hexagonal heads protect floors and allow floor-based push-up rows, paired with ergonomic knurled steel handles.',
    array[
      'Total Weight: 20 kg (2 x 10 kg pair)',
      'Anti-roll virgin rubber coating',
      'Contoured chrome knurled handles',
      'Noise-dampening floor-safe design'
    ],
    true
  ),
  (
    'football',
    'football',
    'Match Pro Football',
    'Ball Sports',
    115,
    null,
    4.7,
    76,
    null,
    '/images/football.jpg',
    'Size 5 thermally bonded match ball with high-visibility panels.',
    'Consistent flight, soft touch, and minimal water uptake. Thermally bonded micro-textured panels deliver reliable control on natural grass and modern artificial turf pitches.',
    array[
      'Official Size 5 match weight & circumference',
      'Thermally bonded seamless PU cover',
      'Butyl bladder for superior air retention',
      'Suitable for grass & 4G/5G turf'
    ],
    true
  ),
  (
    'tennis-racket',
    'tennis-racket',
    'AeroCarbon Tennis Racket',
    'Ball Sports',
    485,
    540,
    4.9,
    62,
    'New Arrival',
    '/images/tennis-racket.jpg',
    'Lightweight 295 g carbon-graphite frame, pre-strung.',
    'Designed for crisp baseline power and agile net play. Full-graphite aerospace layup dampens vibration while an aerodynamic beam accelerates swing speed.',
    array[
      'Unstrung Weight: 295 g | Head Size: 100 sq in',
      '16 x 19 spin-friendly string pattern',
      'Grip Size: L3 (4 3/8 in) cushioned wrap',
      'Pre-strung with durable synthetic gut'
    ],
    true
  ),
  (
    'cycling-helmet',
    'cycling-helmet',
    'VeloShield Cycling Helmet',
    'Cycling',
    275,
    null,
    4.8,
    83,
    'Top Rated',
    '/images/cycling-helmet.jpg',
    '22-vent aero road helmet with micro-dial precision fit.',
    'Stay cool on long desert road rides and city commutes. In-mold polycarbonate shell fused with impact-absorbing EPS foam offers featherweight protection and effortless airflow.',
    array[
      '22 wind-tunnel cooling air vents',
      '360-degree micro-dial fit adjustment system',
      'Weight: 245 g (Size M/L 55-61 cm)',
      'Removable moisture-wicking antibacterial pads'
    ],
    true
  ),
  (
    'water-bottle',
    'water-bottle',
    'HydroCore Insulated Water Bottle',
    'Accessories',
    89,
    null,
    4.9,
    214,
    'Bestseller',
    '/images/water-bottle.jpg',
    '750 ml double-wall stainless steel bottle — cold for 24 hrs.',
    'Built for UAE heat. Vacuum-insulated food-grade 18/8 stainless steel keeps water ice-cold for up to 24 hours, finished with a sweat-free matte powder coat and one-hand sport spout.',
    array[
      'Capacity: 750 ml (25 oz)',
      '24 hrs cold / 12 hrs hot vacuum insulation',
      'BPA-free leakproof flip-top sport lid',
      'Fits standard gym & bike bottle cages'
    ],
    true
  ),
  (
    'resistance-bands',
    'resistance-bands',
    'PowerLoop Resistance Bands',
    'Fitness',
    95,
    115,
    4.7,
    151,
    null,
    '/images/resistance-bands.jpg',
    '5-level progressive loop band kit with travel mesh pouch.',
    'From warm-up activation to heavy lower-body burnout sets, this 5-band progressive resistance kit goes anywhere. Snap-resistant natural latex stays flat without rolling.',
    array[
      '5 Resistance Levels: X-Light to X-Heavy (5-40 lbs)',
      '100% skin-friendly natural layered latex',
      'Compact breathable navy mesh carry pouch',
      'Includes illustrated quick-start workout card'
    ],
    true
  ),
  (
    'gym-gloves',
    'gym-gloves',
    'FlexGrip Training Gym Gloves',
    'Accessories',
    110,
    null,
    4.6,
    109,
    null,
    '/images/gym-gloves.jpg',
    'Breathable fingerless lifting gloves with wrist support.',
    'Protect your palms and stabilize your wrists on deadlifts, pull-ups, and kettlebell complexes. Silicone-printed microfiber palms prevent slipping while mesh backs release heat.',
    array[
      'Padded anti-slip silicone palm reinforcement',
      'Adjustable hook-and-loop wrist support wrap',
      'Breathable four-way stretch mesh back',
      'Quick-release finger pull tabs'
    ],
    true
  )
on conflict (id) do nothing;

-- 2. Orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  email text not null,
  phone text,
  emirate text not null,
  address text not null,
  notes text,
  payment_method text not null,
  items jsonb not null,
  subtotal_aed numeric(10, 2) not null,
  shipping_aed numeric(10, 2) not null,
  vat_aed numeric(10, 2) not null,
  total_aed numeric(10, 2) not null,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "Allow public order creation" on public.orders;
create policy "Allow public order creation"
  on public.orders
  for insert
  to anon, authenticated
  with check (true);
