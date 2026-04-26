# Database EyeLit

## Konfigurasi .env

Buka file `.env` di root project dan sesuaikan bagian berikut:

```env
# Database Connection
DB_CONNECTION=mysql              # atau 'sqlite' untuk SQLite
DB_HOST=127.0.0.1               # host database
DB_PORT=3306                    # port database
DB_DATABASE=eyelit              # nama database (buatkan terlebih dahulu di MySQL)
DB_USERNAME=root                # username database
DB_PASSWORD=                    # password database

# Session & Queue (opsional, bisa pakai database juga)
SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
```

### Membuat Database MySQL (jika belum ada)

```sql
CREATE DATABASE eyelit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## Menjalankan Migration & Seeder

### 1. Fresh Install (Database Kosong)

```bash
php artisan migrate
php artisan db:seed
```

### 2. Reset & Seed Ulang (Database Sudah Ada Tabel)

```bash
php artisan migrate:fresh --seed
```

Perintah ini akan:
- **DROP** semua tabel yang ada
- **CREATE** ulang semua tabel
- **SEED** data awal (provinsi, ongkir, ekspedisi, lensa)

### 3. Rollback lalu Migrate Ulang

```bash
php artisan migrate:rollback
php artisan migrate
php artisan db:seed
```

### 4. Seed Saja (tanpa migrate)

```bash
php artisan db:seed
```

---

## Struktur Tabel

| No | Tabel | Keterangan |
|----|-------|------------|
| 1 | `users` | Tabel pengguna (update dari Laravel default) |
| 2 | `produk` | Data produk kacamata |
| 3 | `gambar_produk` | Gambar produk (3 per produk) |
| 4 | `provinsi` | 38 provinsi Indonesia |
| 5 | `ongkir` | Ongkos kirim per provinsi |
| 6 | `ekspedisi` | JNE, J&T, SiCepat |
| 7 | `lensa` | Konfigurasi harga lensa |
| 8 | `alamat` | Alamat pengiriman pengguna |
| 9 | `pesanan` | Header pesanan |
| 10 | `detail_pesanan` | Item pesanan + detail lensa |
| 11 | `pembayaran` | Data pembayaran QRIS / VA BCA |
| 12 | `ulasan` | Review produk oleh pengguna |
| 13 | `carousel` | Banner promosi |
| 14 | `notifikasi` | Notifikasi untuk pengguna |

---

## Data Seeder

Setelah migrate, data berikut akan di-seed otomatis:

### Provinsi (38)
Seluruh provinsi di Indonesia beserta nama pulau (Jawa, Sumatera, Kalimantan, dll)

### Ongkir (38)
Ongkos kirim per provinsi sesuai spesifikasi (DKI Jakarta Rp 5.000 hingga Papua Rp 45.000)

### Ekspedisi (3)
- JNE (Jalur Nugraha Ekakurir)
- J&T Express
- SiCepat Express

### Lensa (15)
Konfigurasi harga Minus, Plus, dan Silinder:
- Minus 0.00 = Rp 0
- Minus 0.25 - 2.00 = Rp 100.000/mata
- Minus 2.25 - 4.00 = Rp 200.000/mata
- Minus 4.25 - 6.00 = Rp 300.000/mata
- Minus 6.25+ = Rp 400.000/mata
- Anti Radiasi = Rp 150.000 (untuk kedua mata)
- Photochromic = Rp 200.000 (untuk kedua mata)

---

## Troubleshooting

### Error: Table already exists
```bash
php artisan migrate:fresh --seed
```

### Error: Database not found
Pastikan database `eyelit` sudah dibuat di MySQL:
```sql
CREATE DATABASE eyelit;
```

### Error: Access denied
Periksa username dan password di `.env`:
```env
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Clear Config Cache
```bash
php artisan config:clear
php artisan cache:clear
```

### Menggunakan SQLite (alternatif)
Jika ingin menggunakan SQLite instead of MySQL:

1. Buat file database: `touch database/database.sqlite`
2. Ubah `.env`:
```env
DB_CONNECTION=sqlite
# DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD tidak perlu diubah
```
3. Jalankan migrate:
```bash
php artisan migrate:fresh --seed
```

---

## Model File (Eloquent)

Model untuk setiap tabel tersedia di `app/Models/`:

- `User.php` - Sudah ada (Laravel default)
- `Produk.php`
- `GambarProduk.php`
- `Provinsi.php`
- `Ongkir.php`
- `Ekspedisi.php`
- `Lensa.php`
- `Alamat.php`
- `Pesanan.php`
- `DetailPesanan.php`
- `Pembayaran.php`
- `Ulasan.php`
- `Carousel.php`
- `Notifikasi.php`
