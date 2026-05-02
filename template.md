# Template Gambar & Logo EyeLit - Halaman Auth

Dokumen ini menjelaskan spesifikasi gambar, logo, dan struktur folder untuk halaman autentikasi EyeLit (Login, Register, dll).

---

## Struktur Folder Gambar

```
public/
└── images/
    └── auth/
        ├── login-background.png      # Background halaman login (sebelah kiri)
        └── register-background.png    # Background halaman register (sebelah kiri)
```

---

## Detail Background Image

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

## Logo EyeLit (File Gambar)

Logo EyeLit menggunakan **file gambar PNG** yang disimpan di folder `public/images/logo/`.

### Lokasi File
**File:** `public/images/logo/Auth.png`

File ini digunakan di halaman auth (login & register) melalui komponen `<img>` di `auth-split-layout.tsx`.

### Ukuran Logo

Ukuran diatur melalui class Tailwind CSS:

| Konteks | Class Size | Dimensi |
|---------|-----------|---------|
| Header desktop (kolom kiri auth) | `size-8` | 32×32 px |
| Header mobile (kolom kanan auth) | `h-10` | 40×40 px |

**Mengubah ukuran logo:**

Edit file `resources/js/layouts/auth/auth-split-layout.tsx` - ubah class `size-8` atau `h-10`:
```tsx
className="mr-2 size-6 object-contain"   // 24×24 px
className="mr-2 size-8 object-contain"   // 32×32 px (default)
className="mr-2 size-10 object-contain"  // 40×40 px
className="mr-2 size-12 object-contain"  // 48×48 px
```

---

## Cara Menyalin Gambar

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

File yang perlu diedit untuk mengubah gambar/logo:
- `resources/js/layouts/auth/auth-split-layout.tsx` - layout auth (login & register), di sin logo dan background diatur
- `resources/js/pages/auth/login.tsx` - halaman login
- `resources/js/pages/auth/register.tsx` - halaman register

---

# Template Gambar Produk EyeLit - Katalog

Dokumen ini menjelaskan spesifikasi gambar thumbnail untuk setiap produk di halaman katalog.

---

## Struktur Folder Gambar Produk

```
public/
└── images/
    └── produk/
        ├── hu-1388-003-55.png      # Hugo F-HU 1388 003 55
        ├── gd-ga03452-05-53.png    # Giordano F-GD-GA03452 05 53
        ├── gd-ga02971-03-55.png    # Giordano F-GD-GA02971 03 55
        └── qi-qa7010-b30-51.png    # Qina F-QI QA7010 B30 51
```

---

## Detail Gambar Produk

### 1. `hu-1388-003-55.png` - Hugo F-HU 1388 003 55
**Lokasi file:** `public/images/produk/hu-1388-003-55.png`

**Spesifikasi gambar:**
- Ukuran ideal: **600 x 600 pixel** (rasio 1:1 - square)
- Format: PNG atau JPG
- Isi: Foto produk kacamata Hugo F-HU 1388 003 55
- Background: Putih atau transparan

**Tampilan di grid-box:**
```
+--------------+
|              |
|   GAMBAR     |  <-- aspect ratio 1:1
|   PRODUK     |
|              |
+--------------+
Kacamata Model A      <-- nama produk (hitam)
Rp 500.000           <-- harga (hitam)
```

---

### 2. `gd-ga03452-05-53.png` - Giordano F-GD-GA03452 05 53
**Lokasi file:** `public/images/produk/gd-ga03452-05-53.png`

**Spesifikasi gambar:**
- Ukuran ideal: **600 x 600 pixel** (rasio 1:1 - square)
- Format: PNG atau JPG
- Isi: Foto produk kacamata Giordano F-GD-GA03452 05 53

---

### 3. `gd-ga02971-03-55.png` - Giordano F-GD-GA02971 03 55
**Lokasi file:** `public/images/produk/gd-ga02971-03-55.png`

**Spesifikasi gambar:**
- Ukuran ideal: **600 x 600 pixel** (rasio 1:1 - square)
- Format: PNG atau JPG
- Isi: Foto produk kacamata Giordano F-GD-GA02971 03 55

---

### 4. `qi-qa7010-b30-51.png` - Qina F-QI QA7010 B30 51
**Lokasi file:** `public/images/produk/qi-qa7010-b30-51.png`

**Spesifikasi gambar:**
- Ukuran ideal: **600 x 600 pixel** (rasio 1:1 - square)
- Format: PNG atau JPG
- Isi: Foto produk kacamata Qina F-QI QA7010 B30 51

---

## Cara Menyalin Gambar Produk

### Langkah 1: Buat folder
```bash
mkdir -p public/images/produk
```

### Langkah 2: Salin gambar
Salin file gambar Anda ke folder tersebut dengan nama:
- `hu-1388-003-55.png`
- `gd-ga03452-05-53.png`
- `gd-ga02971-03-55.png`
- `qi-qa7010-b30-51.png`

### Langkah 3: Update welcome.tsx
Pastikan welcome.tsx sudah mengambil data dari database dan menampilkan gambar produk dari path yang benar.

---

## Checklist Sebelum Menjalankan

- [ ] Folder `public/images/produk/` sudah dibuat
- [ ] File `hu-1388-003-55.png` sudah ada
- [ ] File `gd-ga03452-05-53.png` sudah ada
- [ ] File `gd-ga02971-03-55.png` sudah ada
- [ ] File `qi-qa7010-b30-51.png` sudah ada
- [ ] Jalankan `php artisan migrate:fresh --seed` untuk seed data
- [ ] Jalankan `npm run dev` untuk melihat hasilnya

---

## Catatan Penting

1. **Nama file HARUS persis** seperti berikut (case-sensitive, gunakan huruf kecil dan hyphen):
   - `hu-1388-003-55.png`
   - `gd-ga03452-05-53.png`
   - `gd-ga02971-03-55.png`
   - `qi-qa7010-b30-51.png`

2. **Format yang didukung:** PNG, JPG, JPEG, WebP

3. **Ukuran ideal 600x600** tapi bisa lebih besar atau lebih kecil. Yang penting rasio 1:1 (square).

4. **Background transparan** lebih baik agar terlihat profesional, tapi bisa juga dengan background putih.

5. Gambar harus jelas dan focus pada produk kacamata saja.
