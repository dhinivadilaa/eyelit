# Template Gambar EyeLit - Halaman Auth

Dokumen ini menjelaskan di mana meletakkan gambar-gambar untuk halaman autentikasi EyeLit (Login, Register, dll).

---

## Struktur Folder Gambar

Buat folder berikut di dalam project:

```
public/
└── images/
    └── auth/
        ├── login-background.png      # Background halaman login (sebelah kiri)
        └── register-background.png    # Background halaman register (sebelah kiri)
```

---

## Detail Setiap Gambar

### 1. `login-background.png`
**Lokasi file:** `public/images/auth/login-background.png`

**Spesifikasi gambar:**
- Ukuran ideal: **1550 x 830 pixel** (rasio ~16:9)
- Format: PNG atau JPG
- Isi: Gambar produk kacamata EyeLit yang menarik (bisa menggunakan foto produk dari brand Hugo atau Giordano)
- Pada template `masuk.png`, bagian kiri halaman berwarna biru/gradien dengan ilustrasi/gambar produk di atasnya"

**Tampilan di halaman:**
```
+------------------+--------------------------+
|                  |                          |
|   GAMBAR         |   FORM LOGIN             |
|   (50% lebar)    |   (50% lebar)            |
|                  |                          |
|   login-         |   - Email                |
|   background.png |   - Kata Sandi            |
|                  |   - Tombol Masuk         |
|   + overlay      |                          |
|   gradient       |   - Link "Daftar"         |
|                  |                          |
+------------------+--------------------------+
```

---

### 2. `register-background.png`
**Lokasi file:** `public/images/auth/register-background.png`

**Spesifikasi gambar:**
- Ukuran ideal: **1550 x 830 pixel** (rasio ~16:9)
- Format: PNG atau JPG
- Isi: Sama seperti login (gambar produk kacamata EyeLit)

**Tampilan di halaman:**
```
+------------------+--------------------------+
|                  |                          |
|   GAMBAR         |   FORM REGISTER          |
|   (50% lebar)    |   (50% lebar)            |
|                  |                          |
|   register-      |   - Nama Lengkap         |
|   background.png |   - Email                 |
|                  |   - No HP                |
|   + overlay      |   - Kata Sandi           |
|   gradient       |   - Konfirmasi Password  |
|                  |   - Tombol Daftar        |
|                  |                          |
|                  |   - Link "Masuk"         |
+------------------+--------------------------+
```

---

## Cara Menyalin Gambar

Ikuti langkah-langkah berikut:

### Langkah 1: Buat folder
```bash
mkdir -p public/images/auth
```

### Langkah 2: Salin gambar
Salin file gambar Anda ke folder tersebut dengan nama:
- `login-background.png`
- `register-background.png`

### Langkah 3: (Opsional) Gunakan gambar yang sama
Jika belum punya gambar terpisah, Anda bisa menggunakan gambar yang sama untuk kedua halaman.

---

## Checklist Sebelum Menjalankan

- [ ] Folder `public/images/auth/` sudah dibuat
- [ ] File `login-background.png` sudah ada di folder tersebut
- [ ] File `register-background.png` sudah ada di folder tersebut
- [ ] Jalankan `npm run dev` untuk melihat hasilnya
- [ ] Pastikan tidak ada error di browser console

---

## Warna & Tema

Berdasarkan template yang diberikan, warna yang digunakan:
- **Background form (kanan):** Putih (#FFFFFF)
- **Teks utama:** Hitam (#000000)
- **Tombol utama:** Biru tua (#1B4965) dengan hover lebih gelap
- **Link teks:** Biru (#1B4965)
- **Gambar (kiri):** Overlay gradient hitam transparan agar teks di atasnya tetap terbaca

---

## Catatan Penting

1. **Nama file HARUS persis** seperti berikut (case-sensitive, gunakan huruf kecil dan hyphen):
   - `login-background.png`
   - `register-background.png`

2. **Format yang didukung:** PNG, JPG, JPEG, WebP

3. **Ukuran tidak harus persis** 1550x830. Yang penting adalah rasio aspek yang mirip (~16:9)

4. Jika gambar belum tersedia, halaman akan menampilkan area kosong di sebelah kiri. Anda bisa meminta desainer untuk membuat gambar sesuai brand EyeLit.

5. Gambar akan otomatis di-overlay dengan gradient gelap untuk memastikan teks "Selamat Datang di EyeLit" tetap terbaca di atas gambar.

---

## Struktur Kode yang Terkait

File yang perlu diedit untuk mengubah gambar:
- `resources/js/layouts/auth/auth-split-layout.tsx` - untuk tampilan layout split
- `resources/js/pages/auth/login.tsx` - halaman login
- `resources/js/pages/auth/register.tsx` - halaman register

Jika ingin menggunakan gambar berbeda untuk login dan register, Anda bisa membuat dua layout terpisah atau menggunakan prop untuk membedakan sumber gambar.