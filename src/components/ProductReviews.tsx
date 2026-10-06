import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { seedReviews, type Review } from "@/data/reviews";

const fits: Review["fit"][] = ["Đúng size", "Hơi chật", "Hơi rộng"];

export function ProductReviews({ slug, colors, sizes }: { slug: string; colors: string[]; sizes: string[] }) {
  const [reviews, setReviews] = useState(() => seedReviews.filter((r) => r.slug === slug));
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [fit, setFit] = useState<Review["fit"]>("Đúng size");
  const [size, setSize] = useState(sizes[0] ?? "");
  const [color, setColor] = useState(colors[0] ?? "");
  const [sent, setSent] = useState(false);

  const avg = reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : 0;
  const dist = [5, 4, 3, 2, 1].map((s) => ({ s, n: reviews.filter((r) => r.rating === s).length }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim().length < 2 || comment.trim().length < 10) return;
    const d = new Date();
    setReviews((list) => [{ id: `u${Date.now()}`, slug, author: author.trim(), rating, fit, size, color, comment: comment.trim(), verified: false, date: d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) }, ...list]);
    setAuthor(""); setComment(""); setRating(5); setSent(true);
  };

  const field = "w-full rounded-md border border-border-strong bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <section id="danh-gia" className="mt-16 scroll-mt-28 border-t border-border pt-12">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Khách hàng nói gì</p>
      <h2 className="font-display text-2xl font-bold">Đánh giá & nhận xét</h2>
      <div className="mt-6 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="font-display text-5xl font-extrabold">{avg.toFixed(1)}<span className="text-lg text-stone">/5</span></p>
            <Stars value={Math.round(avg)} />
            <p className="mt-1 text-sm text-stone">{reviews.length} nhận xét</p>
            <div className="mt-5 grid gap-2">{dist.map(({ s, n }) => <div key={s} className="flex items-center gap-2 text-xs"><span className="w-6">{s}★</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-background"><div className="h-full bg-primary" style={{ width: `${reviews.length ? (n / reviews.length) * 100 : 0}%` }} /></div><span className="w-4 text-right text-stone">{n}</span></div>)}</div>
          </div>
          <form onSubmit={submit} className="mt-6 grid gap-3 rounded-lg border border-border p-5">
            <p className="font-display font-bold">Viết nhận xét</p>
            <div className="flex gap-1" role="radiogroup" aria-label="Chọn số sao">{[1, 2, 3, 4, 5].map((s) => <button key={s} type="button" aria-label={`${s} sao`} onClick={() => setRating(s)}><Star size={24} className="text-primary" fill={s <= rating ? "currentColor" : "none"} /></button>)}</div>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Tên của bạn" maxLength={40} className={field} />
            <div className="grid grid-cols-3 gap-2">
              <select value={size} onChange={(e) => setSize(e.target.value)} className={field} aria-label="Size đã mua">{sizes.map((s) => <option key={s}>{s}</option>)}</select>
              <select value={color} onChange={(e) => setColor(e.target.value)} className={field} aria-label="Màu">{colors.map((c) => <option key={c}>{c}</option>)}</select>
              <select value={fit} onChange={(e) => setFit(e.target.value as Review["fit"])} className={field} aria-label="Độ vừa">{fits.map((f) => <option key={f}>{f}</option>)}</select>
            </div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} maxLength={500} placeholder="Chia sẻ trải nghiệm (tối thiểu 10 ký tự)" className={cn(field, "resize-none")} />
            <Button type="submit" disabled={author.trim().length < 2 || comment.trim().length < 10}>Gửi nhận xét</Button>
            {sent && <p className="text-xs text-success">Cảm ơn bạn đã gửi nhận xét!</p>}
          </form>
        </div>
        <ul className="grid content-start gap-4 lg:col-span-8">
          {reviews.map((r) => (
            <li key={r.id} className="border-b border-border pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-3"><span className="font-display font-bold">{r.author}</span>{r.verified && <span className="rounded-sm bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase text-success">Đã mua hàng</span>}</div><span className="text-xs text-stone">{r.date}</span></div>
              <Stars value={r.rating} />
              <p className="mt-1 text-xs text-stone">Size {r.size} · {r.color} · {r.fit}</p>
              <p className="mt-2 text-sm leading-relaxed">{r.comment}</p>
            </li>
          ))}
          {!reviews.length && <li className="text-sm text-stone">Chưa có nhận xét nào. Hãy là người đầu tiên!</li>}
        </ul>
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  return <div className="mt-1 flex gap-0.5 text-primary" aria-label={`${value} trên 5 sao`}>{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={15} fill={s <= value ? "currentColor" : "none"} />)}</div>;
}
