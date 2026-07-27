# Thiệp cưới online — Hoa Lá Blush

Trang thiệp cưới một trang (single-page), **HTML/CSS/JS thuần**, không framework, deploy [Vercel](https://vercel.com).
Phong cách "Hoa Lá Blush": tông hồng blush + lá xanh sage + kem, tối giản sang trọng. Toàn bộ code/hoa văn là bản riêng — không sao chép asset của bên thứ ba.

> `index.html` là **file tự chứa** (đã gộp CSS + JS bên trong). Chỉ cần file này là chạy được.

## Chức năng

- ✉️ **Mở phong bì** đầu trang (bấm để mở)
- 💌 **Cá nhân hoá tên khách** qua URL: `?to=Tên Khách` (vd `...vercel.app/?to=Anh Nam`)
- 🕰️ **Đếm ngược** ngày cưới (realtime)
- 👰 Cô dâu & chú rể, 💕 Chuyện tình yêu (timeline)
- 📅 **Sự kiện** (Vu Quy / Thành Hôn / Tân Hôn) + "Xem bản đồ" + **Thêm vào lịch (.ics)**
- 🖼️ **Album** ảnh + lightbox (bấm để phóng to)
- ✅ **RSVP** xác nhận tham dự (có hạn phản hồi, lưu localStorage)
- 📖 **Sổ lưu bút** — gửi lời chúc (lưu localStorage)
- 🎁 **Mừng cưới** — QR + số tài khoản + nút sao chép
- 🔗 **Chia sẻ** (Facebook / copy link / Web Share)
- 🌙 **Sáng/Tối** + 🌸 hoa lá rơi + reveal khi cuộn
- 📱 Responsive web/tablet/mobile, hỗ trợ `prefers-reduced-motion`

## Tùy biến nhanh

| Muốn đổi | Sửa ở đâu (trong `index.html`) |
|----------|-------------------------------|
| Tên, ngày, hai họ, sự kiện | phần markup tương ứng |
| Ngày đếm ngược | `data-date` của `#cd` |
| Ảnh cô dâu/chú rể, album | hiện là placeholder — gắn `<img>` vào `.frame` / `.gal` |
| Màu, font | biến `:root` trong `<style>` |
| Số tài khoản mừng cưới | `#bankGroom`, `#bankBride` |
| Nhạc nền | thêm `<audio src="music.mp3">` và nối vào nút ♪ |

> ⚠️ **Cần kiểm tra trước khi phát hành thật:** ngày **âm lịch** và tên gọi lễ nhà trai theo vùng (Thành Hôn/Tân Hôn). Nội dung hiện tại là **mẫu**.

## Chạy thử

```bash
python -m http.server 3000   # hoặc: npx serve .
```

## Deploy Vercel

Vào https://vercel.com → **Add New → Project** → chọn repo → Framework **Other**, Build/Output để trống → **Deploy**. Mỗi lần `git push` lên `main` sẽ tự deploy lại.
