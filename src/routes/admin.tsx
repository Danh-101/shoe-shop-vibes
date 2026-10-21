import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — STEP/LAB" },
      { name: "description", content: "Lối vào quản trị cửa hàng STEP/LAB." },
      { property: "og:title", content: "Admin — STEP/LAB" },
      { property: "og:description", content: "Lối vào quản trị cửa hàng STEP/LAB." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/quan-tri", replace: true });
  },
});