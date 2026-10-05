import { useSyncExternalStore } from "react";

export type CartItem = { slug: string; color: string; size: string; quantity: number };

const KEY = "steplab-cart";
const EMPTY: CartItem[] = [];
let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    cache = [];
  }
  return cache!;
}

function write(items: CartItem[]) {
  cache = items;
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

const same = (a: CartItem, b: Omit<CartItem, "quantity">) => a.slug === b.slug && a.color === b.color && a.size === b.size;

export const cart = {
  add(item: CartItem) {
    const items = read();
    const found = items.find((i) => same(i, item));
    write(found ? items.map((i) => (same(i, item) ? { ...i, quantity: Math.min(10, i.quantity + item.quantity) } : i)) : [...items, item]);
  },
  setQuantity(item: CartItem, quantity: number) {
    write(read().map((i) => (same(i, item) ? { ...i, quantity: Math.max(1, Math.min(10, quantity)) } : i)));
  },
  remove(item: CartItem) {
    write(read().filter((i) => !same(i, item)));
  },
  clear() {
    write([]);
  },
};

export function useCart() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    read,
    () => EMPTY,
  );
}

export const useCartCount = () => useCart().reduce((n, i) => n + i.quantity, 0);
