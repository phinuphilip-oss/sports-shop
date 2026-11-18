import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { PRODUCTS, Product, ProductCategory } from "@/data/products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      supabaseUrl.startsWith("http") &&
      supabaseAnonKey.length > 10
  );
}

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(supabaseUrl!, supabaseAnonKey!);
  }
  return client;
}

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  price_aed: number | string;
  original_price_aed: number | string | null;
  rating: number | string;
  review_count: number;
  badge: string | null;
  image: string;
  short_description: string;
  description: string;
  specs: string[] | null;
  in_stock: boolean;
}

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as ProductCategory,
    priceAed: Number(row.price_aed),
    originalPriceAed:
      row.original_price_aed !== null ? Number(row.original_price_aed) : undefined,
    rating: Number(row.rating),
    reviewCount: Number(row.review_count),
    badge: row.badge ?? undefined,
    image: row.image,
    shortDescription: row.short_description,
    description: row.description,
    specs: Array.isArray(row.specs) ? row.specs : [],
    inStock: Boolean(row.in_stock),
  };
}

export async function fetchProducts(): Promise<{
  products: Product[];
  source: "supabase" | "fallback";
}> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { products: PRODUCTS, source: "fallback" };
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return { products: PRODUCTS, source: "fallback" };
    }

    return {
      products: (data as ProductRow[]).map(mapProductRow),
      source: "supabase",
    };
  } catch {
    return { products: PRODUCTS, source: "fallback" };
  }
}

export interface NewOrderPayload {
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  emirate: string;
  address: string;
  notes: string;
  payment_method: string;
  items: {
    product_id: string;
    name: string;
    price_aed: number;
    quantity: number;
  }[];
  subtotal_aed: number;
  shipping_aed: number;
  vat_aed: number;
  total_aed: number;
}

export async function createOrder(
  payload: NewOrderPayload
): Promise<{ savedToSupabase: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      savedToSupabase: false,
      error: "Supabase is not configured yet in .env.local",
    };
  }

  const { error } = await supabase.from("orders").insert([payload]);
  if (error) {
    return {
      savedToSupabase: false,
      error: error.message,
    };
  }

  return { savedToSupabase: true };
}
