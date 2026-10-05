# Trang chi tiết sản phẩm STEP/LAB

## Mục tiêu
Tạo trang chi tiết dùng chung cho từng mẫu giày hiện có, liên kết trực tiếp từ lưới sản phẩm trên trang chủ.

## Phạm vi triển khai
- Tách dữ liệu sản phẩm cục bộ thành nguồn dùng chung cho trang chủ và trang chi tiết.
- Bổ sung cho mỗi mẫu: mã đường dẫn, mô tả, chất liệu, màu sắc, kích cỡ có sẵn và bảng quy đổi size.
- Tạo trang `/san-pham/:slug` với ảnh sản phẩm lớn, giá, trạng thái kho, đánh giá, chọn màu, chọn size và số lượng.
- Cho phép thêm vào giỏ ở mức giao diện; không tạo thanh toán hay lưu dữ liệu máy chủ.
- Liên kết ảnh và tên sản phẩm trên trang chủ sang đúng trang chi tiết.
- Giữ phong cách STEP/LAB hiện tại, tối ưu cả máy tính và điện thoại.
- Bổ sung tiêu đề và mô tả chia sẻ riêng cho từng sản phẩm; hiển thị trạng thái không tìm thấy khi đường dẫn sai.

## Kiểm tra
- Mở một sản phẩm từ trang chủ và xác nhận đúng ảnh, giá, chất liệu, màu, size.
- Thử chọn màu, size, số lượng và thêm vào giỏ.
- Kiểm tra bố cục trên màn hình máy tính và điện thoại, đồng thời xác nhận không có lỗi hiển thị.

## Chi tiết kỹ thuật
- Dùng route động TanStack tại `src/routes/san-pham.$slug.tsx`.
- Dữ liệu vẫn là mock cục bộ theo định hướng hiện tại, không thêm backend.
- Các điều khiển tương tác tiếp tục dùng hệ thống Button và token màu sẵn có.
