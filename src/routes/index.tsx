import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/shoes/hero.avif.asset.json";
import pegasusAsset from "@/assets/shoes/pegasus.avif.asset.json";
import dunkAsset from "@/assets/shoes/dunk.avif.asset.json";
import converseAsset from "@/assets/shoes/converse.avif.asset.json";
import sambaAsset from "@/assets/shoes/samba.avif.asset.json";
import campusAsset from "@/assets/shoes/campus.avif.asset.json";
import { money, products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STEP/LAB — Giày chính hãng cho nhịp sống thành thị" },
      { name: "description", content: "Khám phá sneaker Nike, adidas, New Balance, Converse và Puma chính hãng tại STEP/LAB." },
      { property: "og:title", content: "STEP/LAB — Sneaker multi-brand" },
      { property: "og:description", content: "Giày chính hãng, phối màu tuyển chọn và giao hàng toàn quốc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const categories = [
  { name: "Lifestyle", subtitle: "Phối đồ mỗi ngày", image: campusAsset.url },
  { name: "Running", subtitle: "Êm nhẹ từng bước", image: pegasusAsset.url },
  { name: "Streetwear", subtitle: "Dẫn đầu đường phố", image: dunkAsset.url },
  { name: "Classic", subtitle: "Biểu tượng vượt thời gian", image: converseAsset.url },
];

function Storefront() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) => `${product.brand} ${product.name}`.toLowerCase().includes(normalized));
  }, [query]);

  const scrollToProducts = () => document.querySelector("#san-pham")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen overflow-hidden bg-paper text-ink antialiased">
      <div className="animate-announcement bg-ink px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-paper sm:text-xs">
        Miễn phí vận chuyển đơn từ 2.000.000₫ — kiểm tra hàng trước khi thanh toán
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[88rem] items-center gap-4 px-4 sm:px-6">
          <Button variant="icon" className="h-10 w-10 px-0 lg:hidden" aria-label={mobileOpen ? "Đóng menu" : "Mở menu"} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <a href="#top" className="shrink-0 font-display text-xl font-extrabold sm:text-2xl">STEP<span className="text-primary">/</span>LAB</a>
          <nav className="ml-3 hidden items-center gap-6 text-sm font-medium lg:flex">
            <a href="#san-pham" className="transition-colors hover:text-primary">Sản phẩm</a>
            <a href="#danh-muc" className="transition-colors hover:text-primary">Danh mục</a>
            <a href="#thuong-hieu" className="transition-colors hover:text-primary">Thương hiệu</a>
            <a href="#san-pham" className="text-primary">Sale</a>
          </nav>
          <div className="relative ml-auto hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm giày, thương hiệu..." className="w-56 rounded-md border border-border bg-background/70 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-primary lg:w-72" />
          </div>
          <a href="#tra-cuu" className="hidden text-sm font-medium transition-colors hover:text-primary sm:inline">Tra cứu đơn</a>
          <a href="#tai-khoan" aria-label="Tài khoản" className="grid h-10 w-10 place-items-center rounded-md transition hover:bg-accent"><UserRound size={19} /></a>
          <Button variant="dark" className="h-10 px-3" aria-label={`Giỏ hàng có ${cartCount} sản phẩm`}>
            <ShoppingBag size={18} /><span className="hidden sm:inline">Giỏ</span><span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] text-primary-foreground">{cartCount}</span>
          </Button>
        </div>
        {mobileOpen && <nav className="border-t border-border bg-paper px-4 py-4 lg:hidden"><div className="mb-4 flex items-center gap-2 rounded-md border border-border bg-background px-3"><Search size={17} className="text-stone" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm sản phẩm..." className="h-11 w-full bg-transparent text-sm outline-none" /></div><div className="grid grid-cols-2 gap-3 text-sm font-semibold"><a href="#san-pham">Sản phẩm</a><a href="#danh-muc">Danh mục</a><a href="#thuong-hieu">Thương hiệu</a><a href="#tra-cuu">Tra cứu đơn</a></div></nav>}
      </header>

      <main id="top">
        <section className="relative bg-ink text-paper">
          <div className="mx-auto grid max-w-[88rem] items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:py-20">
            <div className="animate-reveal lg:col-span-7">
              <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">Bộ sưu tập tốc độ · 2026</p>
              <h1 className="max-w-[13ch] font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">Bứt tốc<br />trên mọi<br /><span className="text-primary">cung đường.</span></h1>
              <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-paper/70 sm:text-base">Từ đôi chạy bộ phản hồi lực đến những biểu tượng đường phố — tuyển chọn chính hãng cho nhịp sống không dừng lại.</p>
              <div className="mt-7 flex flex-wrap gap-3"><Button onClick={scrollToProducts}>Mua ngay</Button><Button variant="outline" className="border-paper/30 text-paper hover:border-primary hover:text-primary" onClick={() => document.querySelector("#danh-muc")?.scrollIntoView({ behavior: "smooth" })}>Khám phá bộ sưu tập</Button></div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-wider text-paper/55"><span>100% chính hãng</span><span>•</span><span>COD toàn quốc</span><span>•</span><span>Đổi size dễ dàng</span></div>
            </div>
            <div className="animate-reveal relative lg:col-span-5">
              <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-lg border border-paper/10 bg-paper">
                <img src={heroAsset.url} alt="Nike Air Max 90 trắng đỏ" className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute bottom-4 left-4 bg-ink/90 px-4 py-3"><p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary">Hero drop</p><p className="mt-1 font-display text-lg font-bold">Nike Air Max 90</p></div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden bg-primary py-3 text-paper"><div className="animate-marquee flex w-max whitespace-nowrap font-display text-xs font-bold uppercase tracking-[0.15em] sm:text-sm"><span className="px-4">Lifestyle — Running — Streetwear — Classic — New Balance — Nike — adidas — Puma — Converse — </span><span className="px-4">Lifestyle — Running — Streetwear — Classic — New Balance — Nike — adidas — Puma — Converse — </span></div></div>
        </section>

        <section id="danh-muc" className="mx-auto max-w-[88rem] scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Chọn đúng chất riêng</p><h2 className="font-display text-3xl font-bold sm:text-4xl">Mua theo danh mục</h2></div><a href="#san-pham" className="shrink-0 text-sm font-bold text-primary">Xem tất cả →</a></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{categories.map((category) => <button type="button" key={category.name} onClick={scrollToProducts} className="product-lift group relative overflow-hidden rounded-lg border border-border bg-card text-left"><img src={category.image} alt={`Giày ${category.name}`} className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-ink/90 p-4 text-paper"><p className="font-display text-lg font-bold uppercase sm:text-xl">{category.name}</p><p className="mt-1 text-xs text-paper/65">{category.subtitle}</p></div></button>)}</div>
        </section>

        <section id="san-pham" className="mx-auto max-w-[88rem] scroll-mt-24 px-4 pb-20 sm:px-6">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Được săn đón</p><h2 className="font-display text-3xl font-bold sm:text-4xl">Bán chạy tuần này</h2></div><p className="text-sm text-stone">{visibleProducts.length} sản phẩm</p></div>
          {visibleProducts.length ? <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{visibleProducts.map((product) => <article key={product.name} className="product-lift overflow-hidden rounded-lg border border-border bg-card"><div className="relative overflow-hidden bg-background"><Link to="/san-pham/$slug" params={{ slug: product.slug }} aria-label={`Xem ${product.name}`}><img src={product.image} alt={`${product.brand} ${product.name}`} className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" /></Link>{product.tag && <span className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-1 font-display text-[10px] font-bold uppercase text-primary-foreground">{product.tag}</span>}<Button variant="icon" aria-label={liked.includes(product.name) ? "Bỏ yêu thích" : "Thêm vào yêu thích"} onClick={() => setLiked((items) => items.includes(product.name) ? items.filter((item) => item !== product.name) : [...items, product.name])} className="absolute right-2 top-2 h-9 w-9 rounded-full bg-paper/90 px-0"><Heart size={17} fill={liked.includes(product.name) ? "currentColor" : "none"} className={liked.includes(product.name) ? "text-primary" : "text-ink"} /></Button></div><div className="p-3 sm:p-4"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone">{product.brand}</p><h3 className="mt-1 min-h-10 font-display text-sm font-semibold sm:text-base"><Link to="/san-pham/$slug" params={{ slug: product.slug }} className="transition-colors hover:text-primary">{product.name}</Link></h3><p className="mt-1 text-xs text-stone"><span className="text-primary">★★★★★</span> {product.rating}</p><div className="mt-3 flex flex-wrap items-baseline gap-2"><span className="font-display text-sm font-bold sm:text-base">{money(product.price)}</span>{product.oldPrice && <span className="text-xs text-stone line-through">{money(product.oldPrice)}</span>}</div><p className={`mt-1 text-[11px] font-medium ${product.stock.startsWith("Sắp") ? "text-primary" : "text-success"}`}>{product.stock}</p><Button className="mt-4 w-full px-2" onClick={() => setCartCount((count) => count + 1)}>Thêm vào giỏ</Button></div></article>)}</div> : <div className="border-y border-border py-16 text-center"><p className="font-display text-xl font-bold">Không tìm thấy sản phẩm</p><p className="mt-2 text-sm text-stone">Thử tìm theo tên thương hiệu hoặc mẫu giày khác.</p></div>}
        </section>

        <section id="thuong-hieu" className="bg-ink text-paper"><div className="mx-auto grid max-w-[88rem] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12"><div className="lg:col-span-5"><p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">Chuẩn từ từng bước chân</p><h2 className="max-w-[18ch] font-display text-3xl font-bold uppercase leading-tight">Chuyên môn. Chọn lọc. Chính hãng.</h2><p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-paper/65">Mỗi phối màu được chọn lọc từ các thương hiệu hàng đầu, ảnh chụp đúng sản phẩm và tồn kho theo từng size.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">{[["6+","Thương hiệu"],["COD","Toàn quốc"],["4","Ảnh mỗi phối màu"],["100%","Chính hãng"]].map(([value,label]) => <div key={label} className="rounded-md border border-paper/10 bg-paper/5 p-5"><p className="font-display text-2xl font-extrabold text-primary">{value}</p><p className="mt-1 text-xs text-paper/65">{label}</p></div>)}</div></div></section>
      </main>

      <footer className="bg-paper"><div className="mx-auto flex max-w-[88rem] flex-col justify-between gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end"><div className="max-w-md"><p className="font-display text-2xl font-extrabold">STEP<span className="text-primary">/</span>LAB</p><p className="mt-2 text-sm text-stone">Giày chính hãng cho nhịp sống thành thị. Theo dõi chúng tôi để không bỏ lỡ phối màu mới.</p></div><nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium"><a href="#san-pham">Sản phẩm</a><a href="#danh-muc">Danh mục</a><a id="tra-cuu" href="#tra-cuu">Tra cứu đơn</a><a id="tai-khoan" href="#tai-khoan">Tài khoản</a></nav></div><div className="border-t border-border"><div className="mx-auto flex max-w-[88rem] flex-col justify-between gap-2 px-4 py-4 text-xs text-stone sm:flex-row sm:px-6"><span>© 2026 STEP/LAB — Sneaker multi-brand</span><span>Thanh toán COD · Giao hàng toàn quốc</span></div></div></footer>
    </div>
  );
}