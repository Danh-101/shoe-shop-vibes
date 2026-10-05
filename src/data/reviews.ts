export type Review = {
  id: string;
  slug: string;
  author: string;
  rating: number;
  fit: "Đúng size" | "Hơi chật" | "Hơi rộng";
  size: string;
  color: string;
  date: string;
  comment: string;
  verified: boolean;
};

export const seedReviews: Review[] = [
  { id: "r1", slug: "new-balance-530-white-silver", author: "Minh Anh", rating: 5, fit: "Đúng size", size: "39", color: "Trắng bạc", date: "12/09/2026", comment: "Đi cả ngày không mỏi, đệm êm hơn mình nghĩ. Phối với quần jeans rất đẹp.", verified: true },
  { id: "r2", slug: "new-balance-530-white-silver", author: "Hoàng Long", rating: 4, fit: "Hơi rộng", size: "42", color: "Xám", date: "28/08/2026", comment: "Form hơi rộng một chút, nên lùi nửa size. Chất lượng hoàn thiện tốt.", verified: true },
  { id: "r3", slug: "converse-chuck-70-canvas-black", author: "Thu Trang", rating: 5, fit: "Hơi rộng", size: "37", color: "Đen", date: "02/09/2026", comment: "Canvas dày dặn hơn Chuck thường, đế êm hơn. Chuck 70 nên chọn nhỏ hơn 1 size.", verified: true },
  { id: "r4", slug: "converse-chuck-70-canvas-black", author: "Quốc Bảo", rating: 4, fit: "Đúng size", size: "42", color: "Trắng ngà", date: "15/08/2026", comment: "Mấy ngày đầu hơi cứng, sau một tuần thì rất vừa chân.", verified: false },
  { id: "r5", slug: "adidas-samba-og-white-black", author: "Ngọc Hân", rating: 5, fit: "Hơi chật", size: "38", color: "Trắng đen", date: "20/09/2026", comment: "Da đẹp, đế gum chuẩn. Form thon nên chân bè nên tăng nửa size.", verified: true },
  { id: "r6", slug: "adidas-samba-og-white-black", author: "Đức Huy", rating: 5, fit: "Đúng size", size: "41", color: "Đen trắng", date: "05/09/2026", comment: "Giao nhanh, hàng chính hãng, hộp nguyên vẹn. Sẽ ủng hộ tiếp.", verified: true },
  { id: "r7", slug: "puma-suede-xl-red", author: "Khánh Linh", rating: 5, fit: "Đúng size", size: "38", color: "Đỏ trắng", date: "18/09/2026", comment: "Màu đỏ ngoài đời rất nổi, lưỡi gà dày mang cảm giác chắc chân.", verified: true },
  { id: "r8", slug: "puma-suede-xl-red", author: "Tuấn Kiệt", rating: 4, fit: "Hơi rộng", size: "43", color: "Đen trắng", date: "30/08/2026", comment: "Da lộn mềm, cần xịt chống nước khi đi mưa. Đáng tiền.", verified: true },
];
