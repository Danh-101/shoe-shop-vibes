import { products } from "@/data/products";

// Demo-only admin data: stored in this browser's localStorage, no security.
const PRICE_KEY = "steplab-price-overrides";
const STORE_KEY = "steplab-store-info";
const original = new Map(products.map((p) => [p.slug, p.price]));

export type StoreInfo = { name: string; hotline: string; email: string; address: string; hours: string };

export const defaultStoreInfo: StoreInfo = {
  name: "STEP/LAB",
  hotline: "0900 000 000",
  email: "hello@steplab.vn",
  address: "Chưa cập nhật",
  hours: "9:00 – 21:00",
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(key) ?? "{}") };
  } catch {
    return fallback;
  }
}

export const getPriceOverrides = () => readJson<Record<string, number>>(PRICE_KEY, {});
export const originalPrice = (slug: string) => original.get(slug) ?? 0;

/** Applies saved prices to the shared catalog. Returns true when anything changed. */
export function applyPriceOverrides() {
  const overrides = getPriceOverrides();
  let changed = false;
  for (const p of products) {
    const next = overrides[p.slug] ?? original.get(p.slug)!;
    if (p.price !== next) {
      p.price = next;
      changed = true;
    }
  }
  return changed;
}

export function savePrices(prices: Record<string, number>) {
  localStorage.setItem(PRICE_KEY, JSON.stringify(prices));
  applyPriceOverrides();
}

export const getStoreInfo = () => readJson(STORE_KEY, defaultStoreInfo);
export const saveStoreInfo = (info: StoreInfo) => localStorage.setItem(STORE_KEY, JSON.stringify(info));
