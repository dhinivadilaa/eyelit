# Dokumentasi Tabel Produk - EyeLit

Dokumen ini menjelaskan cara menambahkan produk ke database melalui seeder.

---

## Struktur Tabel `produk`

| Kolom | Tipe Data | Deskripsi | Contoh |
|-------|-----------|-----------|--------|
| `id` | Auto Increment | Primary key | 1, 2, 3 |
| `nama_produk` | String | Nama lengkap produk dengan format `(merek) (tipe_produk)` | `Hugo F-HU 1388 003 55` |
| `merek` | Enum | Merek kacamata | `Hugo`, `Giordano`, `Qina` |
| `tipe_produk` | String | Kode/model produk dari supplier | `F-HU 1388 003 55` |
| `harga_produk` | Decimal (12,0) | Harga produk dalam Rupiah | `500000` |
| `stok` | Integer | Jumlah stok (1-4) | `3` |
| `jenis_kelamin` | Enum | Target gender | `Pria`, `Wanita`, `Unisex` |
| `warna` | Enum | Warna frame | `Hitam`, `Putih`, `Transparan`, `Rose Gold` |
| `material` | Enum | Bahan frame | `Metal`, `Plastic`, `Titanium` |
| `bentuk` | Enum | Bentuk frame | `Aviator`, `Browline`, `Oval`, `Square` |
| `bridge` | String (nullable) | Ukuran bridge (dalam mm) | `18` |
| `diagonal` | String (nullable) | Ukuran diagonal (dalam mm) | `51` |
| `ukuran` | String (nullable) | Ukuran lensanya (dalam mm) | `55` |
| `status_produk` | Enum | Status produk | `Aktif`, `Nonaktif` |
| `gambar` | String (nullable) | Nama file gambar produk | `hu-1388-003-55.png` |
| `created_at` | Timestamp | Tanggal dibuat | - |
| `updated_at` | Timestamp | Tanggal diupdate | - |

---

## Format Penulisan

### `nama_produk`
Format: `(merek) (tipe_produk)`

Contoh:
- `Hugo F-HU 1388 003 55`
- `Giordano F-GD-GA03452 05 53`
- `Qina F-QI QA7010 B30 51`

### `tipe_produk`
Ambil langsung dari kode/model produk yang diberikan oleh supplier. Ini biasanya ada di URL atau kode produk.

Contoh:
- Dari URL: `https://www.optikmelawai.com/shop/products/f-hu-1388-003-55`
- `tipe_produk`: `F-HU 1388 003 55`
- `nama_produk`: `Hugo F-HU 1388 003 55`

### `gambar`
Format: `(merek-tipe_produk-tanpa-spasi-dan-slash).png`

Contoh:
- `F-HU 1388 003 55` → `hu-1388-003-55.png`
- `F-GD-GA03452 05 53` → `gd-ga03452-05-53.png`
- `F-QI QA7010 B30 51` → `qi-qa7010-b30-51.png`

---

## Cara Menambahkan Produk Baru

### Langkah 1: Buat nama file gambar
1. Download gambar produk
2. Simpan di `public/images/produk/`
3. Rename sesuai format: `{merek-tipe-produk-tanpa-spasi}.png`

### Langkah 2: Tambahkan data di ProdukSeeder.php

```php
[
    'nama_produk' => 'Hugo F-HU 1388 003 55',      // Format: (merek) (tipe_produk)
    'merek' => 'Hugo',                              // Hugo, Giordano, atau Qina
    'tipe_produk' => 'F-HU 1388 003 55',            // Kode produk dari supplier
    'harga_produk' => 500000,                        // Angka tanpa titik/koma
    'stok' => rand(1, 4),                           // Random 1-4
    'jenis_kelamin' => 'Unisex',                    // Pria, Wanita, atau Unisex
    'warna' => 'Hitam',                             // Hitam, Putih, Transparan, Rose Gold
    'material' => 'Metal',                          // Metal, Plastic, atau Titanium
    'bentuk' => 'Square',                           // Aviator, Browline, Oval, atau Square
    'bridge' => '18',                               // Ukuran bridge (nullable)
    'diagonal' => '51',                              // Ukuran diagonal (nullable)
    'ukuran' => '55',                               // Ukuran lensa (nullable)
    'gambar' => 'hu-1388-003-55.png',               // Nama file gambar
    'status_produk' => 'Aktif',                     // Aktif atau Nonaktif
    'created_at' => now(),
    'updated_at' => now(),
],
```

### Langkah 3: Jalankan Migration & Seeder

```bash
php artisan migrate:fresh --seed
```

---

## Contoh Penambahan Produk dari URL Optik Melawai

### URL: `https://www.optikmelawai.com/shop/products/f-hu-1388-003-55`

| Field | Value |
|-------|-------|
| `merek` | `Hugo` |
| `tipe_produk` | `F-HU 1388 003 55` |
| `nama_produk` | `Hugo F-HU 1388 003 55` |
| `gambar` | `hu-1388-003-55.png` |

---

## Catatan Penting

1. **Nama file gambar** harus lowercase dengan hyphen (bukan underscore)
2. **Harga produk** dalam bentuk angka tanpa format (500000 bukan Rp 500.000)
3. **Stok** hanya boleh 1-4 sesuai request
4. **Gambar produk** harus ada di folder `public/images/produk/` sebelum menjalankan seeder
5. **Format nama_produk** harus konsisten: `(merek) (tipe_produk)`