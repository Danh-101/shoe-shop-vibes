import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { products } from "@/data/products";

export type Recommendation = { slug: string; reason: string };

export async function recommendShoes(need: string): Promise<{ summary: string; items: Recommendation[] }> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("Tính năng gợi ý AI chưa được cấu hình.");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const catalog = products.map((p) => ({
    slug: p.slug, brand: p.brand, name: p.name, price: p.price, style: p.style,
    material: p.materialType, materials: p.materials, colors: p.colors.map((c) => c.name), sizes: p.sizes, description: p.description,
  }));
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: `Bạn là chuyên viên tư vấn giày của cửa hàng STEP/LAB. Chỉ gợi ý giày có trong danh mục JSON sau, dùng đúng slug.
Danh mục: ${JSON.stringify(catalog)}
Trả lời DUY NHẤT một JSON hợp lệ dạng {"summary": string, "items": [{"slug": string, "reason": string}]} bằng tiếng Việt.
Tối đa 3 gợi ý, sắp xếp phù hợp nhất trước; reason 1-2 câu nêu rõ vì sao hợp nhu cầu (ngân sách, mục đích, size, màu). Nếu không có đôi nào thật sự phù hợp, nói rõ trong summary và gợi ý đôi gần nhất.`,
    messages: [{ role: "user", content: need }],
    providerOptions: {
      openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] },
    },
  });
  const text = await result.text;
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("AI chưa đưa ra được gợi ý. Bạn thử mô tả lại nhu cầu nhé.");
  const parsed = JSON.parse(match[0]) as { summary?: string; items?: Recommendation[] };
  const valid = new Set(products.map((p) => p.slug));
  return {
    summary: String(parsed.summary ?? ""),
    items: (parsed.items ?? []).filter((i) => valid.has(i.slug)).slice(0, 3),
  };
}
