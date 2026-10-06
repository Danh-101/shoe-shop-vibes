import type { CartItem } from "@/lib/cart";

export interface Order {
  code: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
}

const KEY = "steplab-orders";

function read(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Order[];
  } catch {
    return [];
  }
}

export const orders = {
  add(order: Order) {
    const list = read();
    list.unshift(order);
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, 20)));
  },
  find(code: string, phone: string): Order | undefined {
    const normalizedCode = code.trim().toUpperCase();
    const normalizedPhone = phone.trim();
    return read().find(
      (o) => o.code.toUpperCase() === normalizedCode && o.phone === normalizedPhone,
    );
  },
};
