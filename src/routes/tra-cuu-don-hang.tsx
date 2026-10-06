import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, PackageSearch, SearchX } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { findProduct, money } from "@/data/products";
import { orders, type Order } from "@/lib/orders";

export const Route = createFileRoute("/tra-cuu-don-hang")({
  head: () => ({
    meta: [
      { title: "Tra cứu đơn hàng — STEP/LAB" },
      { name: "description", content: "Kiểm tra trạng thái đơn hàng STEP/LAB bằng mã đơn và số điện thoại." },
      { property: "og:title", content: "Tra cứu đơn hàng — STEP/LAB" },
      { property: "og:description", content: "Kiểm tra trạng thái đơn hàng STEP/LAB bằng mã đơn và số điện thoại." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderLookup,
});

function OrderLookup() {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<Order | null>(null);
  const [missed, setMissed] = useState(false);
  const input =
    "h-11 w-full rounded-md border border-border-strong bg-background px-3 text-sm outline-none focus:border-primary";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(code, phone);
    setResult(found ?? null);
    setMissed(!found);
  };

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <Link to="/" className="font-display text-xl font-extrabold">
            STEP<span className="text-primary">/</span>LAB
          </Link>
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-bold hover:text-primary">
            <ChevronLeft size={18} /> Cửa hàng
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-3xl font-extrabold">Tra cứu đơn hàng</h1>
        <p className="mt-2 text-sm text-stone">
          Nhập mã đơn (ví dụ SL123456) và số điện thoại đã dùng khi đặt hàng.
        </p>
        <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
          <input required value={code} onChange={(e) => setCode(e.target.value)} placeholder="Mã đơn hàng" className={input} />
          <input required type="tel" pattern="0[0-9]{9}" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" className={input} />
          <Button type="submit" className="h-11">Tra cứu</Button>
        </form>

        {missed && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm">
            <SearchX size={20} className="shrink-0 text-stone" />
            Không tìm thấy đơn hàng phù hợp. Kiểm tra lại mã đơn và số điện thoại.
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-lg font-bold">Đơn {result.code}</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{result.status}</span>
            </div>
            <p className="mt-1 text-xs text-stone">
              Đặt lúc {new Date(result.createdAt).toLocaleString("vi-VN")} · {result.name} · {result.phone}
            </p>
            <p className="mt-1 text-xs text-stone">Giao tới: {result.address}</p>
            <ul className="mt-4 divide-y divide-border">
              {result.items.map((item, idx) => {
                const product = findProduct(item.slug);
                if (!product) return null;
                return (
                  <li key={idx} className="flex items-center gap-3 py-3">
                    <img src={product.image} alt={product.name} className="h-14 w-14 rounded-md border border-border object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-stone">
                        {item.color} · Size {item.size} · x{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold">{money(product.price * item.quantity)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 border-t border-border pt-3 text-sm">
              <div className="flex justify-between"><span className="text-stone">Tạm tính</span><span>{money(result.subtotal)}</span></div>
              <div className="mt-1 flex justify-between"><span className="text-stone">Vận chuyển</span><span>{result.shipping ? money(result.shipping) : "Miễn phí"}</span></div>
              <div className="mt-2 flex justify-between font-display text-base font-bold"><span>Tổng (COD)</span><span>{money(result.total)}</span></div>
            </div>
          </div>
        )}

        {!result && !missed && (
          <div className="mt-10 grid place-items-center rounded-lg border border-dashed border-border-strong py-14 text-center">
            <PackageSearch size={40} className="text-stone" />
            <p className="mt-3 text-sm text-stone">Mã đơn được gửi ngay sau khi bạn đặt hàng thành công.</p>
          </div>
        )}
      </main>
    </div>
  );
}
