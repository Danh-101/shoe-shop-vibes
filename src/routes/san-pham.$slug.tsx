import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ChevronLeft, Heart, Minus, Plus, Ruler, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { findProduct, money, sizeChart } from "@/data/products";
import { ProductReviews } from "@/components/ProductReviews";
import { cart, useCartCount } from "@/lib/cart";

export const Route = createFileRoute("/san-pham/$slug")({
  beforeLoad: ({ params }) => {
    if (!findProduct(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const product = findProduct(params.slug);
    const title = product ? `${product.name} — STEP/LAB` : "Không tìm thấy sản phẩm — STEP/LAB";
    const description = product?.description ?? "Sản phẩm bạn đang tìm không còn tồn tại tại STEP/LAB.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: ProductNotFound,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const product = findProduct(slug);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const cartCount = useCartCount();

  if (!product) return null;

  const addToCart = () => {
    if (!selectedSize) return;
    cart.add({ slug: product.slug, color: (product.colors[selectedColor] ?? product.colors[0]).name, size: selectedSize, quantity });
    setAdded(true);
  };

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <div className="bg-ink px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-paper sm:text-xs">
        Miễn phí vận chuyển đơn từ 2.000.000₫ — kiểm tra hàng trước khi thanh toán
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-display text-xl font-extrabold sm:text-2xl">STEP<span className="text-primary">/</span>LAB</Link>
          <div className="flex items-center gap-4"><Link to="/" className="hidden items-center gap-2 text-sm font-bold transition-colors hover:text-primary sm:inline-flex"><ChevronLeft size={18} /> Tiếp tục mua sắm</Link><Link to="/gio-hang" className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-3 text-sm font-bold text-paper"><ShoppingBag size={18} /> Giỏ <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] text-primary-foreground">{cartCount}</span></Link></div>
        </div>
      </header>

      <main className="mx-auto max-w-[88rem] px-4 py-8 sm:px-6 sm:py-12">
        <nav aria-label="Đường dẫn" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-stone">
          <Link to="/" className="hover:text-primary">Trang chủ</Link><span>/</span><span>{product.brand}</span><span>/</span><span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <section className="lg:col-span-7" aria-label="Ảnh sản phẩm">
            <div className="relative overflow-hidden rounded-lg border border-border bg-card">
              <img src={product.image} alt={`${product.brand} ${product.name}`} className="aspect-square w-full object-cover" />
              {product.tag && <span className="absolute left-4 top-4 rounded-sm bg-primary px-3 py-1.5 font-display text-xs font-bold uppercase text-primary-foreground">{product.tag}</span>}
              <Button variant="icon" size="icon" aria-label={liked ? "Bỏ yêu thích" : "Thêm vào yêu thích"} onClick={() => setLiked((value) => !value)} className="absolute right-4 top-4 rounded-full bg-paper/90">
                <Heart size={19} fill={liked ? "currentColor" : "none"} className={liked ? "text-primary" : "text-ink"} />
              </Button>
            </div>
            <p className="mt-3 text-center text-xs text-stone">Ảnh chụp sản phẩm thực tế · Màu sắc có thể chênh lệch nhẹ theo màn hình</p>
          </section>

          <section className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{product.brand}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm"><span className="text-primary">★★★★★</span><a href="#danh-gia" className="text-stone underline-offset-2 hover:underline">{product.rating} đánh giá</a><span className={product.stock.startsWith("Sắp") ? "font-semibold text-primary" : "font-semibold text-success"}>{product.stock}</span></div>
            <div className="mt-6 flex items-baseline gap-3"><span className="font-display text-2xl font-extrabold">{money(product.price)}</span>{product.oldPrice && <span className="text-sm text-stone line-through">{money(product.oldPrice)}</span>}</div>
            <p className="mt-5 border-y border-border py-5 text-sm leading-relaxed text-stone">{product.description}</p>

            <fieldset className="mt-6">
              <legend className="font-display text-sm font-bold">Màu sắc: <span className="font-normal text-stone">{product.colors[selectedColor]?.name ?? product.colors[0].name}</span></legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color, index) => <Button key={color.name} type="button" variant="outline" size="sm" onClick={() => { setSelectedColor(index); setAdded(false); }} className={cn("h-10 gap-2 px-3", selectedColor === index && "border-primary text-primary")} aria-pressed={selectedColor === index}><span className={cn("h-4 w-4 rounded-full border", color.swatchClass)} /><span>{color.name}</span></Button>)}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="flex w-full items-center justify-between gap-4 font-display text-sm font-bold"><span>Chọn kích cỡ EU</span><a href="#bang-size" className="inline-flex items-center gap-1 text-xs text-primary"><Ruler size={15} /> Bảng kích cỡ</a></legend>
              <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                {product.sizes.map((size) => <Button key={size} type="button" variant="outline" size="sm" onClick={() => { setSelectedSize(size); setAdded(false); }} aria-pressed={selectedSize === size} className={cn("h-11 px-0", selectedSize === size && "border-primary bg-primary text-primary-foreground hover:text-primary-foreground")}>{size}</Button>)}
              </div>
              {!selectedSize && <p className="mt-2 text-xs text-stone">Chọn kích cỡ trước khi thêm vào giỏ.</p>}
            </fieldset>

            <div className="mt-7 flex gap-3">
              <div className="flex h-12 shrink-0 items-center rounded-md border border-border-strong">
                <Button variant="icon" size="icon" className="h-10 w-10" aria-label="Giảm số lượng" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={16} /></Button>
                <output className="w-8 text-center text-sm font-bold" aria-label={`Số lượng ${quantity}`}>{quantity}</output>
                <Button variant="icon" size="icon" className="h-10 w-10" aria-label="Tăng số lượng" onClick={() => setQuantity((value) => Math.min(5, value + 1))}><Plus size={16} /></Button>
              </div>
              <Button size="lg" className="flex-1" onClick={addToCart} disabled={!selectedSize}>{added ? <><Check size={19} /> Đã thêm {quantity} đôi</> : <><ShoppingBag size={19} /> Thêm vào giỏ</>}</Button>
            </div>

            <div className="mt-7 grid gap-3 border-t border-border pt-6 text-sm sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="flex gap-3"><ShieldCheck className="shrink-0 text-primary" size={20} /><span><strong className="block font-display">Chính hãng</strong><span className="text-xs text-stone">Cam kết 100%</span></span></div>
              <div className="flex gap-3"><Truck className="shrink-0 text-primary" size={20} /><span><strong className="block font-display">Giao toàn quốc</strong><span className="text-xs text-stone">Được kiểm tra hàng</span></span></div>
              <div className="flex gap-3"><Ruler className="shrink-0 text-primary" size={20} /><span><strong className="block font-display">Đổi size</strong><span className="text-xs text-stone">Dễ dàng, nhanh chóng</span></span></div>
            </div>
          </section>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 lg:grid-cols-2">
          <section>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Cấu tạo sản phẩm</p>
            <h2 className="font-display text-2xl font-bold">Chất liệu & hoàn thiện</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{product.materials.map((material) => <li key={material} className="flex items-start gap-3 border-b border-border pb-3 text-sm"><Check className="mt-0.5 shrink-0 text-success" size={17} /><span>{material}</span></li>)}</ul>
          </section>
          <section id="bang-size" className="scroll-mt-28">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Chọn đúng kích cỡ</p>
            <h2 className="font-display text-2xl font-bold">Bảng kích cỡ</h2>
            <p className="mt-2 text-sm text-stone">Đo chiều dài bàn chân từ gót đến đầu ngón dài nhất.</p>
            <div className="mt-5 overflow-x-auto border border-border">
              <table className="w-full min-w-[520px] border-collapse text-center text-sm">
                <thead className="bg-ink text-paper"><tr><th className="p-3 text-left font-display">EU</th>{sizeChart.map((row) => <th key={row.eu} className="p-3 font-display">{row.eu}</th>)}</tr></thead>
                <tbody><tr><th className="border-t border-border p-3 text-left font-display">Bàn chân (cm)</th>{sizeChart.map((row) => <td key={row.eu} className="border-l border-t border-border p-3">{row.foot}</td>)}</tr></tbody>
              </table>
            </div>
          </section>
        </div>
        <ProductReviews slug={product.slug} colors={product.colors.map((c) => c.name)} sizes={product.sizes} />
      </main>

      <footer className="mt-16 border-t border-border bg-ink text-paper"><div className="mx-auto flex max-w-[88rem] flex-col justify-between gap-3 px-4 py-7 text-sm sm:flex-row sm:px-6"><span className="font-display font-extrabold">STEP<span className="text-primary">/</span>LAB</span><span className="text-paper/60">Giày chính hãng cho nhịp sống thành thị</span></div></footer>
    </div>
  );
}

function ProductNotFound() {
  return <main className="grid min-h-screen place-items-center bg-paper px-4 text-center text-ink"><div><p className="font-display text-6xl font-extrabold text-primary">404</p><h1 className="mt-4 font-display text-2xl font-bold">Không tìm thấy sản phẩm</h1><p className="mt-2 text-sm text-stone">Mẫu giày này có thể đã ngừng kinh doanh.</p><Link to="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 font-display text-sm font-bold text-primary-foreground">Về cửa hàng</Link></div></main>;
}