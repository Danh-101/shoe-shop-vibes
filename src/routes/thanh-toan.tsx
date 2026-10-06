import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { findProduct, money } from "@/data/products";
import { cart, useCart } from "@/lib/cart";
import { orders } from "@/lib/orders";

export const Route = createFileRoute("/thanh-toan")({
  head: () => ({
    meta: [
      { title: "Thanh toán — STEP/LAB" },
      { name: "description", content: "Nhập thông tin giao hàng và đặt hàng COD tại STEP/LAB." },
      { property: "og:title", content: "Thanh toán — STEP/LAB" },
      { property: "og:description", content: "Hoàn tất đơn hàng sneaker chính hãng." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const items = useCart();
  const [done, setDone] = useState<string | null>(null);
  const subtotal = items.reduce((s, i) => s + (findProduct(i.slug)?.price ?? 0) * i.quantity, 0);
  const shipping = subtotal >= 2000000 ? 0 : 30000;
  const input = "h-11 w-full rounded-md border border-border-strong bg-background px-3 text-sm outline-none focus:border-primary";

  if (done) return <main className="grid min-h-screen place-items-center bg-paper px-4 text-center text-ink"><div><CheckCircle2 className="mx-auto text-success" size={52} /><h1 className="mt-4 font-display text-2xl font-bold">Đặt hàng thành công!</h1><p className="mt-2 text-sm text-stone">Mã đơn của bạn: <strong className="text-ink">{done}</strong>. Chúng tôi sẽ gọi xác nhận sớm.</p><Link to="/" className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-5 font-display text-sm font-bold text-primary-foreground">Về cửa hàng</Link></div></main>;

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <header className="border-b border-border"><div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4"><Link to="/" className="font-display text-xl font-extrabold">STEP<span className="text-primary">/</span>LAB</Link><Link to="/gio-hang" className="inline-flex items-center gap-1 text-sm font-bold hover:text-primary"><ChevronLeft size={18} /> Giỏ hàng</Link></div></header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-3xl font-extrabold">Thanh toán</h1>
        {items.length === 0 ? <p className="mt-6 text-sm text-stone">Giỏ hàng trống. <Link to="/" className="text-primary">Tiếp tục mua sắm</Link></p> : (
          <form className="mt-6 grid gap-4" onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
            const address = (form.elements.namedItem("address") as HTMLInputElement).value;
            const note = (form.elements.namedItem("note") as HTMLTextAreaElement).value;
            const code = `SL${Date.now().toString().slice(-6)}`;
            orders.add({ code, name, phone, address, note, items, subtotal, shipping, total: subtotal + shipping, status: "Chờ xác nhận", createdAt: new Date().toISOString() });
            cart.clear();
            setDone(code);
          }}>
            <div className="grid gap-4 sm:grid-cols-2"><input required name="name" placeholder="Họ và tên" className={input} /><input required name="phone" type="tel" pattern="0[0-9]{9}" placeholder="Số điện thoại" className={input} /></div>
            <input required name="address" placeholder="Địa chỉ nhận hàng" className={input} />
            <textarea placeholder="Ghi chú (không bắt buộc)" rows={2} className="w-full rounded-md border border-border-strong bg-background p-3 text-sm outline-none focus:border-primary" />
            <div className="rounded-lg border border-border bg-card p-5 text-sm"><div className="flex justify-between"><span className="text-stone">Tạm tính</span><span>{money(subtotal)}</span></div><div className="mt-2 flex justify-between"><span className="text-stone">Vận chuyển</span><span>{shipping ? money(shipping) : "Miễn phí"}</span></div><div className="mt-3 flex justify-between border-t border-border pt-3 font-display text-base font-bold"><span>Tổng (COD)</span><span>{money(subtotal + shipping)}</span></div></div>
            <Button type="submit" size="lg">Đặt hàng</Button>
          </form>
        )}
      </main>
    </div>
  );
}
