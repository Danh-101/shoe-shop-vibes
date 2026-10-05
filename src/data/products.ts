import converseAsset from "@/assets/shoes/converse.avif.asset.json";
import newBalanceAsset from "@/assets/shoes/newbalance.avif.asset.json";
import pumaAsset from "@/assets/shoes/puma.avif.asset.json";
import sambaAsset from "@/assets/shoes/samba.avif.asset.json";

export type ProductColor = {
  name: string;
  swatchClass: string;
};

export type Product = {
  slug: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  rating: string;
  stock: string;
  description: string;
  materials: string[];
  colors: [ProductColor, ...ProductColor[]];
  sizes: string[];
};

export const products: Product[] = [
  {
    slug: "new-balance-530-white-silver",
    brand: "New Balance",
    name: "530 White Silver",
    price: 2690000,
    oldPrice: 2990000,
    image: newBalanceAsset.url,
    tag: "-10%",
    rating: "4.9 · 128",
    stock: "Còn hàng · 36–44",
    description: "Phom retro-running gọn nhẹ với lớp đệm êm, dễ phối cùng trang phục hằng ngày.",
    materials: ["Thân giày mesh thoáng khí", "Lớp phủ da tổng hợp", "Đế giữa ABZORB", "Đế ngoài cao su bám đường"],
    colors: [
      { name: "Trắng bạc", swatchClass: "bg-card border-border-strong" },
      { name: "Xám", swatchClass: "bg-stone border-stone" },
      { name: "Đen", swatchClass: "bg-ink border-ink" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
  },
  {
    slug: "converse-chuck-70-canvas-black",
    brand: "Converse",
    name: "Chuck 70 Canvas Black",
    price: 1850000,
    image: converseAsset.url,
    tag: "Mới",
    rating: "4.8 · 96",
    stock: "Còn hàng · 35–43",
    description: "Phiên bản Chuck cổ điển được hoàn thiện chắc chắn hơn, giữ trọn nét tối giản và linh hoạt.",
    materials: ["Thân vải canvas cao cấp", "Lót vải mềm", "Mũi giày cao su", "Đế cao su lưu hóa"],
    colors: [
      { name: "Đen", swatchClass: "bg-ink border-ink" },
      { name: "Trắng ngà", swatchClass: "bg-paper border-border-strong" },
    ],
    sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
  },
  {
    slug: "adidas-samba-og-white-black",
    brand: "adidas",
    name: "Samba OG White Black",
    price: 2800000,
    image: sambaAsset.url,
    rating: "4.9 · 214",
    stock: "Sắp hết · 38–42",
    description: "Biểu tượng sân trong với dáng thấp thanh thoát, ba sọc tương phản và đế gum đặc trưng.",
    materials: ["Thân da thuộc", "Mũi giày da lộn", "Lót da tổng hợp", "Đế ngoài cao su gum"],
    colors: [
      { name: "Trắng đen", swatchClass: "bg-card border-ink" },
      { name: "Đen trắng", swatchClass: "bg-ink border-ink" },
      { name: "Xanh lá", swatchClass: "bg-success border-success" },
    ],
    sizes: ["38", "39", "40", "41", "42"],
  },
  {
    slug: "puma-suede-xl-red",
    brand: "Puma",
    name: "Suede XL Red",
    price: 1990000,
    oldPrice: 2390000,
    image: pumaAsset.url,
    tag: "-17%",
    rating: "4.7 · 82",
    stock: "Còn hàng · 37–44",
    description: "Dáng skate phóng đại với lưỡi gà dày, dây bản lớn và sắc đỏ nổi bật trên phố.",
    materials: ["Thân da lộn", "Lót lưới dệt", "Đệm cổ giày dày", "Đế ngoài cao su"],
    colors: [
      { name: "Đỏ trắng", swatchClass: "bg-primary border-primary" },
      { name: "Đen trắng", swatchClass: "bg-ink border-ink" },
    ],
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
  },
];

export const findProduct = (slug: string) => products.find((product) => product.slug === slug);

export const money = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)}₫`;

export const sizeChart = [
  { eu: "35", foot: "22.0" },
  { eu: "36", foot: "22.5" },
  { eu: "37", foot: "23.0" },
  { eu: "38", foot: "24.0" },
  { eu: "39", foot: "24.5" },
  { eu: "40", foot: "25.0" },
  { eu: "41", foot: "26.0" },
  { eu: "42", foot: "26.5" },
  { eu: "43", foot: "27.5" },
  { eu: "44", foot: "28.0" },
];