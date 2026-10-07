import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Package, Store, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { findProduct, money, products } from "@/data/products";
import { getPriceOverrides, getStoreInfo, originalPrice, savePrices, saveStoreInfo, defaultStoreInfo, type StoreInfo } from "@/lib/admin-store";
import { ORDER_STATUSES, orders, type Order } from "@/lib/orders";

export const Route = createFileRoute("/quan-tri")({
  head: () => ({
    meta: [
      { title: "Quản trị cửa hàng — STEP/LAB" },
      { name: "description", content: "Quản lý đơn hàng, giá giày và thông tin cửa hàng STEP/LAB." },
      { property: "og:title", content: "Quản trị cửa hàng — STEP/LAB" },
      { property: "og:description", content: "Quản lý đơn hàng, giá giày và thông tin cửa hàng STEP/LAB." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Tab = "orders" | "prices" | "store";
const input = "h-10 w-full rounded-md border border-border-strong bg-background px-3 text-sm outline-none focus:border-primary";

function Admin() {
  const [tab, setTab] = useState<Tab>("orders");
  const [list, setList] = useState<Order[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [info, setInfo] = useState<StoreInfo>(defaultStoreInfo);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    setList(orders.list());
    setPrices(Object.fromEntries(products.map((p) => [p.slug, getPriceOverrides()[p.slug] ?? originalPrice(p.slug)])));
    setInfo(getStoreInfo());
  }, []);

  const flash = (msg: string) => { setSaved(msg); setTimeout(() => setSaved(""), 2000); };
  const revenue = list.filter((o) => o.status !== "Đã huỷ").reduce((s, o) => s + o.total, 0);
  const tabs: [Tab, string, typeof Package][] = [["orders", "Đơn hàng", Package], ["prices", "Giá giày", Tag], ["store", "Thông tin cửa hàng", Store]];

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="font-display text-xl font-extrabold">STEP<span className="text-primary">/</span>LAB <span className="ml-1 text-xs font-bold uppercase tracking-widest text-stone">Quản trị</span></Link>
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-bold hover:text-primary"><ChevronLeft size={18} /> Cửa hàng</Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p className="rounded-md border border-border bg-card px-4 py-2 text-xs text-stone">Bản demo: dữ liệu chỉ lưu trên trình duyệt này và chưa có đăng nhập bảo vệ.</p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Tổng đơn" value={String(list.length)} />
          <Stat label="Chờ xác nhận" value={String(list.filter((o) => o.status === "Chờ xác nhận").length)} />
          <Stat label="Doanh thu" value={money(revenue)} />
        </div>
        <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold ${tab === id ? "border-primary text-primary" : "border-transparent text-stone hover:text-ink"}`}><Icon size={16} />{label}</button>
          ))}
        </nav>
        {saved && <p className="mt-4 text-sm font-bold text-success">{saved}</p>}

        {tab === "orders" && (
          <div className="mt-6 space-y-3">
            {list.length === 0 && <p className="py-12 text-center text-sm text-stone">Chưa có đơn hàng nào.</p>}
            {list.map((o) => (
              <div key={o.code} className="rounded-lg border border-border bg-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-bold">{o.code} · {money(o.total)}</p>
                    <p className="text-xs text-stone">{new Date(o.createdAt).toLocaleString("vi-VN")} · {o.name} · {o.phone}</p>
                    <p className="text-xs text-stone">{o.address}{o.note && ` · Ghi chú: ${o.note}`}</p>
                  </div>
                  <select aria-label={`Trạng thái đơn ${o.code}`} value={o.status} onChange={(e) => { setList(orders.updateStatus(o.code, e.target.value)); flash(`Đã cập nhật đơn ${o.code}`); }} className="h-9 rounded-md border border-border-strong bg-background px-2 text-sm font-bold">
                    {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <ul className="mt-3 text-xs text-stone">
                  {o.items.map((i, idx) => <li key={idx}>{findProduct(i.slug)?.name ?? i.slug} · {i.color} · Size {i.size} · x{i.quantity}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === "prices" && (
          <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); savePrices(prices); flash("Đã lưu giá mới"); }}>
            {products.map((p) => (
              <div key={p.slug} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <img src={p.image} alt={p.name} className="h-14 w-14 rounded-md object-cover" />
                <div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-widest text-stone">{p.brand}</p><p className="truncate font-display text-sm font-bold">{p.name}</p><p className="text-xs text-stone">Giá gốc: {money(originalPrice(p.slug))}</p></div>
                <input aria-label={`Giá ${p.name}`} type="number" min={0} step={10000} value={prices[p.slug] ?? 0} onChange={(e) => setPrices({ ...prices, [p.slug]: Number(e.target.value) })} className={`${input} w-36`} />
              </div>
            ))}
            <Button type="submit">Lưu giá</Button>
          </form>
        )}

        {tab === "store" && (
          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); saveStoreInfo(info); flash("Đã lưu thông tin cửa hàng"); }}>
            {([["name", "Tên cửa hàng"], ["hotline", "Hotline"], ["email", "Email"], ["hours", "Giờ mở cửa"], ["address", "Địa chỉ"]] as [keyof StoreInfo, string][]).map(([k, label]) => (
              <label key={k} className={`text-sm font-bold ${k === "address" ? "sm:col-span-2" : ""}`}>{label}<input value={info[k]} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} className={`${input} mt-1 font-normal`} /></label>
            ))}
            <div className="sm:col-span-2"><Button type="submit">Lưu thông tin</Button></div>
          </form>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-stone">{label}</p><p className="mt-1 font-display text-lg font-extrabold sm:text-2xl">{value}</p></div>;
}
