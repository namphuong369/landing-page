# Landing Page — HTML/CSS/JS thuần

Trang landing page tĩnh, không dùng framework, sẵn sàng deploy lên [Vercel](https://vercel.com).

## Cấu trúc

```
landing-page/
├── index.html      ← Nội dung trang (header, hero, features, pricing, contact, footer)
├── styles.css      ← Toàn bộ style + responsive + dark mode
├── script.js       ← Menu mobile, reveal-on-scroll, đếm số, validate form
├── vercel.json     ← Cấu hình Vercel (tùy chọn, cleanUrls)
├── .gitignore
└── README.md
```

## Chạy thử ở máy (local)

Chỉ cần mở `index.html` bằng trình duyệt là xong. Hoặc chạy 1 server tĩnh:

```bash
# Cách 1: dùng Python (có sẵn trên đa số máy)
python -m http.server 3000

# Cách 2: dùng Node
npx serve .
```

Rồi mở http://localhost:3000

## Deploy lên Vercel

### Cách A — Import từ Git (khuyến nghị)

1. Push folder này lên 1 repo GitHub/GitLab:
   ```bash
   cd D:\landing-page
   git init
   git add .
   git commit -m "Initial landing page"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
2. Vào https://vercel.com → **Add New… → Project**
3. Chọn repo vừa push → Vercel tự nhận diện là **Static / Other**
4. Framework Preset: **Other** · Build Command: *(để trống)* · Output Directory: *(để trống / `.`)*
5. Bấm **Deploy** → xong, có link `https://<project>.vercel.app`

### Cách B — Vercel CLI (không cần Git)

```bash
npm i -g vercel
cd D:\landing-page
vercel          # deploy preview
vercel --prod   # deploy production
```

### Cách C — Kéo-thả

Vào https://vercel.com → chọn deploy thủ công → kéo-thả cả folder `landing-page` vào.

## Tùy biến nhanh

| Muốn đổi | Sửa ở đâu |
|----------|-----------|
| Tên thương hiệu, nội dung | `index.html` |
| Màu chủ đạo, font, bo góc | biến `:root` trong `styles.css` |
| Logo / favicon | thẻ `.logo` và `<link rel="icon">` trong `index.html` |
| Xử lý form thật | hàm submit trong `script.js` (nối API/Formspree...) |

> Lưu ý: form hiện chỉ validate phía client và hiển thị thông báo demo — chưa gửi dữ liệu đi đâu (không có backend). Muốn nhận được dữ liệu thật thì nối tới dịch vụ như Formspree, hoặc Vercel Serverless Function.
