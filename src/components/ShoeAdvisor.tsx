import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Footprints, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { findProduct, money } from "@/data/products";
import { getRecommendations } from "@/lib/recommend.functions";

const examples = ["Giày đi bộ cả ngày, êm chân, dưới 3 triệu", "Đôi phong cách retro để đi học, size 38", "Giày nổi bật màu đỏ để mix streetwear"];

type Result = { summary: string; items: { slug: string; reason: string }[] };

export function ShoeAdvisor() {
  const recommend = useServerFn(getRecommendations);
  const [need, setNeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const submit = async (text: string) => {
    if (text.trim().length < 3 || loading) return;
    setNeed(text);
    setLoading(true);
    setError("");
    try {
      const res = await recommend({ data: { need: text } });
      if (res.ok) setResult(res);
      else setError(res.message);
    } catch {
      setError("Không thể kết nối tới trợ lý. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tu-van" className="scroll-mt-24 border-y border-border bg-card">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground"><Footprints size={22} /></span><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Trợ lý STEP/LAB · AI</p></div>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Kể nhu cầu, nhận đôi giày hợp nhất</h2>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-stone">Mô tả mục đích sử dụng, ngân sách, kích cỡ hay phong cách — trợ lý sẽ chọn từ danh mục đang bán.</p>
          <form className="mt-6" onSubmit={(e) => { e.preventDefault(); submit(need); }}>
            <textarea value={need} onChange={(e) => setNeed(e.target.value)} rows={3} maxLength={600} placeholder="Ví dụ: mình cần giày đi làm văn phòng, hay đi bộ, chân bè, ngân sách khoảng 2,5 triệu..." className="w-full resize-none rounded-md border border-border-strong bg-background p-3 text-sm outline-none focus:border-primary" />
            <Button type="submit" className="mt-3 w-full sm:w-auto" disabled={loading || need.trim().length < 3}>{loading ? <><Loader2 className="animate-spin" size={17} /> Đang tìm...</> : <><Send size={17} /> Gợi ý cho tôi</>}</Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">{examples.map((ex) => <button key={ex} type="button" onClick={() => submit(ex)} disabled={loading} className="rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-primary hover:text-primary">{ex}</button>)}</div>
        </div>
        <div className="lg:col-span-7" aria-live="polite">
          {error && <p className="rounded-md border border-primary/40 bg-primary/5 p-4 text-sm text-primary">{error}</p>}
          {!error && !result && !loading && <div className="grid h-full min-h-48 place-items-center rounded-lg border border-dashed border-border-strong p-8 text-center text-sm text-stone">Gợi ý phù hợp sẽ hiện ở đây.</div>}
          {loading && <div className="grid gap-3">{[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-lg bg-background" />)}</div>}
          {!loading && result && (
            <div>
              {result.summary && <p className="mb-4 text-sm leading-relaxed">{result.summary}</p>}
              <div className="grid gap-3">
                {result.items.map((item) => {
                  const p = findProduct(item.slug);
                  if (!p) return null;
                  return (
                    <Link key={item.slug} to="/san-pham/$slug" params={{ slug: p.slug }} className="product-lift flex gap-4 rounded-lg border border-border bg-background p-3">
                      <img src={p.image} alt={p.name} className="h-24 w-24 shrink-0 rounded-md object-cover" />
                      <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone">{p.brand}</p><p className="font-display font-bold">{p.name}</p><p className="text-sm font-bold text-primary">{money(p.price)}</p><p className="mt-1 text-xs leading-relaxed text-stone">{item.reason}</p></div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
