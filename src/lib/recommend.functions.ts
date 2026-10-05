import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { recommendShoes } from "./recommend.server";

export const getRecommendations = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ need: z.string().trim().min(3).max(600) }).parse(data))
  .handler(async ({ data }) => {
    try {
      return { ok: true as const, ...(await recommendShoes(data.need)) };
    } catch (error) {
      const status = (error as { statusCode?: number }).statusCode;
      const message =
        status === 429 ? "Hệ thống đang bận, vui lòng thử lại sau ít phút."
        : status === 402 ? "Tính năng gợi ý AI tạm hết lượt sử dụng."
        : error instanceof Error ? error.message : "Không thể tạo gợi ý lúc này.";
      return { ok: false as const, message };
    }
  });
