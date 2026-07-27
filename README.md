# Thiệp cưới online — HTML/CSS/JS thuần

Trang thiệp cưới một trang (single-page), không dùng framework, sẵn sàng deploy lên [Vercel](https://vercel.com).
Thiết kế lấy cảm hứng từ thể loại thiệp cưới điện tử (cover, thông báo hai họ, cô dâu chú rể, đếm ngược, chuyện tình yêu, sự kiện, album, xác nhận tham dự, gửi lời chúc) — toàn bộ code và nội dung là bản riêng, nội dung mẫu để bạn tự thay.

## Cấu trúc

```
landing-page/
├── index.html      ← Nội dung thiệp (10 phần)
├── styles.css      ← Style + responsive + animation (palette hồng/kem/gold)
├── script.js       ← Đếm ngược, album lightbox, RSVP, lời chúc, hoa rơi, nhạc nền
├── music.mp3       ← (tùy chọn) nhạc nền — bạn tự thêm
├── vercel.json
└── README.md
```

## Các phần trong thiệp (bám cấu trúc thiep-cuoi-43)

1. Cover — tên cô dâu chú rể + ngày cưới
2. Trân Trọng Thông Báo — thông tin hai họ
3. Cô dâu & Chú rể (ảnh để trống — placeholder)
4. Sự kiện cưới — Lễ Thành Hôn (nhà trai) & Lễ Vu Quy (nhà gái) + link bản đồ
5. Our Story — "Together forever"
6. Lịch trình — Chụp ảnh 09:00 · Trao nhẫn 11:00 · Đãi tiệc 11:30
7. Đếm ngược ngày cưới
8. Xác nhận tham dự (RSVP)
9. Gửi lời chúc (lưu tại trình duyệt)
10. Footer cảm ơn

Đã tối ưu responsive cho **web / tablet / điện thoại** (breakpoint 900px, 600px, 360px).

## Tùy biến nhanh

| Muốn đổi | Sửa ở đâu |
|----------|-----------|
| Tên, ngày, thông tin hai họ | `index.html` |
| Ngày đếm ngược | thuộc tính `data-date` của `#countdown` trong `index.html` |
| Ảnh cô dâu chú rể | `background-image` trong `.person .photo` (index.html) |
| Ảnh album | mảng `photos` trong `script.js` |
| Màu chủ đạo, font | biến `:root` trong `styles.css` |
| Nhạc nền | thêm file `music.mp3` cùng thư mục |
| Bản đồ | link `.ev-map` trong index.html (đổi query Google Maps) |

## Chạy thử ở máy

Mở trực tiếp `index.html`, hoặc chạy server tĩnh:

```bash
python -m http.server 3000   # hoặc: npx serve .
```

## Deploy lên Vercel

Repo đã kết nối GitHub, chỉ cần:

1. Vào https://vercel.com → **Add New… → Project**
2. Chọn repo `landing-page` → **Import**
3. Framework Preset: **Other** · Build Command / Output Directory: *(để trống)*
4. **Deploy**

Mỗi lần `git push` lên `main`, Vercel tự deploy lại.

> Lưu ý: form RSVP và lời chúc hiện xử lý phía client (RSVP hiện thông báo; lời chúc lưu localStorage của trình duyệt) — chưa gửi dữ liệu về server. Muốn nhận dữ liệu thật thì nối tới Google Form / Formspree / Vercel Serverless Function.
