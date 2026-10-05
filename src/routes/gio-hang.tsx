import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findProduct, money } from "@/data/products";
import { cart, useCart } from "@/lib/cart";

export const Route = createFileRoute("/gio-hang")({
  head: () => ({
    meta: [
      { title: "Giỏ hàng — STEP/LAB" },
      { name: "description", content: "Xem lại giày, màu sắc, kích cỡ đã chọn và tiến hành thanh toán tại STEP/LAB." },
      { property: "og:title", content: "Giỏ hàng — STEP/LAB" },
      { property: "og:description", content: "Kiểm tra giỏ hàng sneaker của bạn trước khi thanh toán." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

export const FREE_SHIP = 2000000;
export const SHIP_FEE = 30000;

function CartPage() {
  const items = useCart();
  const lines = items.flatMap((item) => { const p = findProduct(item.slug); return p ? [{ item, p }] : []; });
  const subtotal = lines.reduce((s, { item, p }) => s + p.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIP || subtotal === 0 ? 0 : SHIP_FEE;

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md"><div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-4 sm:px-6"><Link to="/" className="font-display text-xl font-extrabold sm:text-2xl">STEP<span className="text-primary">/</span>LAB</Link><Link to="/" className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary"><ChevronLeft size={18} /> Tiếp tục mua sắm</Link></div></header>
      <main className="mx-auto max-w-[88rem] px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Giỏ hàng <span className="text-stone">({items.reduce((n, i) => n + i.quantity, 0)})</span></h1>
        {lines.length === 0 ? (
          <div className="mt-10 border-y border-border py-16 text-center"><ShoppingBag className="mx-auto text-stone" size={40} /><p className="mt-4 font-display text-xl font-bold">Giỏ hàng đang trống</p><p className="mt-2 text-sm text-stone">Chọn một đôi giày bạn yêu thích để bắt đầu.</p><Link to="/" className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-5 font-display text-sm font-bold text-primary-foreground">Khám phá sản phẩm</Link></div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <ul className="divide-y divide-border border-y border-border lg:col-span-8">
              {lines.map(({ item, p }) => (
                <li key={`${item.slug}-${item.color}-${item.size}`} className="flex gap-4 py-5">
                  <Link to="/san-pham/$slug" params={{ slug: p.slug }}><img src={p.image} alt={p.name} className="h-28 w-28 rounded-md border border-border object-cover sm:h-32 sm:w-32" /></Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone">{p.brand}</p><Link to="/san-pham/$slug" params={{ slug: p.slug }} className="font-display font-bold hover:text-primary">{p.name}</Link><p className="mt-1 text-xs text-stone">Màu: <span className="text-ink">{item.color}</span> · Size EU: <span className="text-ink">{item.size}</span></p></div><p className="shrink-0 font-display font-bold">{money(p.price * item.quantity)}</p></div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex h-10 items-center rounded-md border border-border-strong"><Button variant="icon" size="icon" className="h-9 w-9" aria-label="Giảm số lượng" onClick={() => cart.setQuantity(item, item.quantity - 1)}><Minus size={15} /></Button><span className="w-8 text-center text-sm font-bold">{item.quantity}</span><Button variant="icon" size="icon" className="h-9 w-9" aria-label="Tăng số lượng" onClick={() => cart.setQuantity(item, item.quantity + 1)}><Plus size={15} /></Button></div>
                      <button type="button" onClick={() => cart.remove(item)} className="inline-flex items-center gap-1 text-xs text-stone hover:text-primary"><Trash2 size={15} /> Xoá</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:col-span-4">
              <h2 className="font-display text-lg font-bold">Tóm tắt đơn hàng</h2>
              <dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-stone">Tạm tính</dt><dd>{money(subtotal)}</dd></div><div className="flex justify-between"><dt className="text-stone">Phí vận chuyển</dt><dd>{shipping ? money(shipping) : "Miễn phí"}</dd></div><div className="flex justify-between border-t border-border pt-3 font-display text-base font-bold"><dt>Tổng cộng</dt><dd>{money(subtotal + shipping)}</dd></div></dl>
              {shipping > 0 && <p className="mt-3 text-xs text-primary">Mua thêm {money(FREE_SHIP - subtotal)} để được miễn phí vận chuyển.</p>}
              <Link to="/thanh-toan" className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">Tiến hành thanh toán</Link>
              <p className="mt-3 text-center text-xs text-stone">Thanh toán COD · Kiểm tra hàng trước khi nhận</p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
