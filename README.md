# Abo-Ticket — bản tái tạo giao diện

Trang web tĩnh mô phỏng màn hình **„Abo-Ticket“** trong video `ui.mp4` (DB Navigator):
header cố định, QR Deutschland-Ticket, thông tin vé, watermark bảo mật, nút
“More actions” và thanh tab nổi.

## ⚠️ Lưu ý

Theo yêu cầu, trang hiện **giữ nguyên văn bản, mã QR, watermark và thông tin vé đúng
như trong video gốc** (Quang Nguyen Bui, 15.06.2006, Auftrags-Nr. 737569813,
Ticketcode DVRY4FRK). Đây là dữ liệu vé thật lấy từ video. Trang được đăng công khai
trên GitHub Pages theo yêu cầu.

## Chạy

Mở trực tiếp `index.html` bằng trình duyệt. Nếu muốn chạy qua HTTP:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Trang tự chứa CSS/JS/ảnh và font Inter cục bộ; chạy được hoàn toàn offline.

## Cài như app (PWA)

Trang đã có manifest + service worker. Trên HTTPS (GitHub Pages):

- **iPhone/iPad:** mở bằng Safari → nút Share → **Add to Home Screen**
- **Android:** mở bằng Chrome → menu ⋮ → **Install app** / **Add to Home screen**

Mở icon trên màn hình chính sẽ chạy dạng **standalone** — không còn thanh địa chỉ/nút Safari; thanh trạng thái của điện thoại vẫn hiển thị như app thật. Trang cũng được cache để mở offline.

Lưu ý: mở `file://` trên máy không cài PWA được (service worker cần https hoặc localhost).

## Cấu trúc

```
index.html          # khung trang + meta PWA
styles.css          # giao diện responsive, header/tab bar cố định
app.js              # trạng thái cuộn header, phản hồi tab, đăng ký service worker
manifest.json       # cấu hình PWA (tên, icon, standalone)
sw.js               # service worker (cache, mở offline)
assets/
  qr.png            # QR cắt nguyên từ video
  watermark.png     # watermark bảo mật cắt nguyên từ video
  db-logo.png       # logo DB cắt từ video
  deutschlandtarif.png
  icon-192.png      # icon PWA
  icon-512.png
  icon-maskable-512.png
  icon-180.png      # apple-touch-icon
  fonts/inter-latin.woff2
ui.mp4              # video gốc (giữ trên máy, không đưa vào repo)
```

## Font

Inter © The Inter Project Authors, phát hành theo SIL Open Font License 1.1.

## Đổi dữ liệu về sau

- Chữ hiển thị: sửa trực tiếp trong `index.html`.
- QR: thay `assets/qr.png` bằng ảnh QR mới (giữ tỉ lệ gần vuông).
- Watermark: thay `assets/watermark.png` (ảnh watermark chứa tên/ngày nên phải tạo ảnh mới nếu đổi dữ liệu).
- Logo: thay `assets/db-logo.png` / `assets/deutschlandtarif.png` nếu cần.

Ảnh được cắt lại từ video bằng ffmpeg:

```bash
ffmpeg -ss 10.6 -i ui.mp4 -frames:v 1 -vf "crop=424:440:28:261" assets/qr.png
ffmpeg -ss 7.2  -i ui.mp4 -frames:v 1 -vf "crop=424:336:28:472" assets/watermark.png
ffmpeg -ss 10.6 -i ui.mp4 -frames:v 1 -vf "crop=48:32:29:158,scale=192:-1:flags=lanczos" assets/db-logo.png
ffmpeg -ss 10.6 -i ui.mp4 -frames:v 1 -vf "crop=79:37:223:221,scale=316:-1:flags=lanczos,unsharp=5:5:0.5:5:5:0" assets/deutschlandtarif.png
```
