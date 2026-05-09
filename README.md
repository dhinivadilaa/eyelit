# Eyelit

A Laravel 13 + React 19 e-commerce platform for eyewear (kacamata), featuring complete shopping flows, lens prescription system, and admin dashboard.

## Color Palette

Website EyeLit menggunakan tiga warna utama:

| Warna      | Hex Code  | Penggunaan                              |
|------------|-----------|-----------------------------------------|
| Biru       | `#2264c0` | Tombol utama, link, aksen              |
| Putih      | `#FFFFFF` | Background form, area bersih            |
| Hitam      | `#000000` | Teks utama, border, elemen solid        |

---

## Tech Stack

**Backend**
- Laravel 13
- Inertia.js
- Laravel Fortify (authentication)
- MySQL

**Frontend**
- React 19
- TypeScript
- Tailwind CSS v4
- Radix UI components
- Vite

## Seeder Data

Setelah migrate dan seed, akan tersedia data awal:

### Akun Default

| Peran  | Email              | Password    |
|--------|--------------------|-------------|
| Admin  | admin@eyelit.com   | Admin123    |
| Pengguna | pengguna@eyelit.com | Pengguna123 |

### Data Lainnya
- **Provinsi**: 38 provinsi di Indonesia
- **Ongkir**: Ongkos kirim & estimasi per provinsi
- **Ekspedisi**: JNE, J&T Express, SiCepat Express
- **Lensa**: Harga Minus, Plus, dan Silinder per mata

## Prerequisites

- PHP 8.3+
- Node.js 18+
- Composer 2.x
- MySQL / SQLite (or other supported database)

## Installation

```bash
# 1. Install PHP dependencies
composer install

# 2. Install Node dependencies
npm install

# 3. Set up environment file
cp .env.example .env

# 4. Generate application key and run migrations with seed data
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force

# 5. Build frontend assets
npm run build
```

## Development

```bash
# Run all services concurrently (server, queue, vite)
composer run dev

# Or run individually
php artisan serve              # Laravel server
php artisan queue:listen       # Queue worker
npm run dev                    # Vite dev server
```

## Available Scripts

### Composer
```bash
composer run dev       # Start dev environment
composer run test      # Run tests
composer run lint      # Format PHP code
composer run lint:check # Check PHP code style
```

### NPM
```bash
npm run dev            # Vite dev server
npm run build          # Production build
npm run types:check    # TypeScript type check
npm run lint           # ESLint fix
npm run lint:check     # ESLint check
npm run format         # Prettier format
npm run format:check   # Prettier check
```

### CI
```bash
composer run ci:check  # Full CI check (lint, types, tests)
```

## Project Structure

```
app/
├── Http/
│   ├── Controllers/          # Laravel controllers
│   ├── actions/              # Action classes
│   └── app.tsx               # React app entry
├── Console/
│   └── settings.php          # Wayfinder navigation config
└── ...

resources/js/
├── actions/                  # Inertia action classes
├── components/              # React components
│   ├── ui/                   # Radix UI base components
│   └── *.tsx                 # Feature components
├── hooks/                    # React hooks
├── layouts/                  # Page layouts (app, auth, settings)
├── lib/                      # Utilities
├── pages/                    # Route pages
│   ├── auth/                 # Auth pages
│   └── settings/             # Settings pages
└── types/                    # TypeScript type definitions
```

## Authentication

The project uses Laravel Fortify for authentication with the following features:

- Email & password authentication
- Password reset

## User Roles

- **Admin**: Full access to admin dashboard (Kelola Produk, Pesanan, Pengguna, Laporan)
- **Pengguna**: Registered users who can browse products, make purchases, and manage their profile

## UI Components

Reusable UI components built on Radix UI:

- `Button`, `Input`, `Label`, `Checkbox`, `Select`
- `Dialog`, `DropdownMenu`, `Sheet`
- `Avatar`, `Badge`, `Card`, `Separator`
- `Tooltip`, `Sonner` (toast notifications)

## 🚀 Deployment ke Render

### Persiapan

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Daftar akun Render** di [render.com](https://render.com)

### Setup di Render Dashboard

#### 1. Web Service
- **Name**: `eyelit-laravel`
- **Runtime**: `Docker`
- **Region**: Singapore (recommended untuk Indonesia)
- **Branch**: `main`

#### 2. Environment Variables
```env
APP_NAME=EyeLit
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.onrender.com
APP_KEY=base64_generated_key

# Database (PostgreSQL)
DB_CONNECTION=pgsql
DB_HOST=your_db_host
DB_PORT=5432
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

# API Keys
XENDIT_SECRET_KEY=your_xendit_secret_key
RAJAONGKIR_API_KEY=your_rajaongkir_api_key

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

#### 3. Database
- **Type**: PostgreSQL
- **Name**: `eyelit-db`

### Setup Production

Setelah deploy, jalankan commands berikut via Render shell:

```bash
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan storage:link
```

### Konfigurasi API

#### Xendit Setup
1. Login ke [Xendit Dashboard](https://dashboard.xendit.co)
2. Dapatkan Secret Key dari Settings → API Keys
3. Set di environment variables

#### RajaOngkir Setup
1. Login ke [RajaOngkir](https://rajaongkir.com)
2. Dapatkan API Key dari dashboard
3. Set di environment variables

### Custom Domain (Opsional)

1. Beli domain di Niagahoster/Rumahweb
2. Di Render → Settings → Custom Domain
3. Update DNS records sesuai instruksi Render

### Monitoring

- **Logs**: Render Dashboard → Logs
- **Database**: pgAdmin atau tools PostgreSQL lainnya
- **Performance**: Render menyediakan metrics otomatis

## License
