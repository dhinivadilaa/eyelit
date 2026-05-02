# Dokumentasi Carousel - EyeLit

Dokumen ini menjelaskan cara menambahkan dan mengelola informasi pada bagian carousel di halaman utama.

---

## Lokasi Component

File: `resources/js/pages/welcome.tsx`

Bagian carousel menggunakan React state untuk mengelola data dan navigasi:

```tsx
const [currentSlide, setCurrentSlide] = useState(0);

const slides = [
    {
        image: '/images/placeholder.png',
        title: 'Judul Informasi',
        description: 'Deskripsi singkat dari informasi ini.',
    },
];
```

---

## Cara Menambahkan Informasi Baru

### Langkah 1: Tambahkan Data Slide

Tambahkan objek baru ke dalam array `slides` di dalam component `Welcome`:

```tsx
const slides = [
    {
        image: '/images/informasi-1.png',
        title: 'Judul Informasi Pertama',
        description: 'Deskripsi singkat dari informasi ini.',
    },
    {
        image: '/images/informasi-2.png',
        title: 'Judul Informasi Kedua',
        description: 'Deskripsi singkat dari informasi kedua.',
    },
    // Tambahkan slide baru di sini
];
```

### Langkah 2: Siapkan Gambar

1. Simpan gambar di folder `public/images/`
2. Pastikan format nama konsisten (contoh: `informasi-1.png`)
3. Ukuran yang digunakan: **690x420 pixel** (aspect ratio 16:10)

### Langkah 3: Update Navigasi Dot

Sesuaikan jumlah dot indicator dengan jumlah slide:

```tsx
<div className="flex gap-2">
    {slides.map((_, index) => (
        <span
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide
                    ? 'bg-[#2264c0]'
                    : 'bg-[#2264c0]/30'
            }`}
        />
    ))}
</div>
```

---

## Struktur Data Slide

| Field | Tipe | Deskripsi | Contoh |
|-------|------|-----------|--------|
| `image` | String | Path gambar slide | `/images/informasi-1.png` |
| `title` | String | Judul informasi | `Promo Kacamata Baru` |
| `description` | String | Deskripsi singkat (1-2 kalimat) | `Dapatkan discount 20% untuk koleksi terbaru.` |

---

## Event Handling Navigation

### Tombol Kiri (Previous)

```tsx
<button
    onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
    className="w-12 h-12 bg-[#2264c0] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
>
    <ChevronLeft className="size-6 text-white" />
</button>
```

### Tombol Kanan (Next)

```tsx
<button
    onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
    className="w-12 h-12 bg-[#2264c0] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
>
    <ChevronRight className="size-6 text-white" />
</button>
```

### Auto-play (Optional)

Jika ingin menambahkan auto-play, tambahkan `useEffect` dengan interval:

```tsx
useEffect(() => {
    const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Ganti setiap 5 detik

    return () => clearInterval(interval);
}, []);
```

---

## Styling Carousel

### Container
- Background: `bg-white`
- Padding: `py-16 px-4`
- Layout: Flexbox dengan breakpoint `lg` (kiri: gambar, kanan: teks)

### Gambar
- Aspect ratio: 690x420 (16:10)
- Border radius: `rounded-2xl`
- Shadow: `shadow-xl`

### Tombol Navigasi
- Ukuran: `w-12 h-12`
- Background: `bg-[#2264c0]`
- Border radius: `rounded-full`
- Hover effect: `hover:scale-110 transition-transform`
- Shadow: `shadow-lg`

### Dot Indicator
- Ukuran: `w-3 h-3`
- Border radius: `rounded-full`
- Active state: `bg-[#2264c0]`
- Inactive state: `bg-[#2264c0]/30`

---

## Catatan Penting

1. **Format Gambar**: Gunakan format PNG atau JPG, ukuran optimal 690x420 pixel
2. **Ukuran Teks**:
   - Judul: `text-3xl lg:text-4xl font-bold`
   - Deskripsi: `text-base lg:text-lg`
3. **Panjang Deskripsi**: Maksimal 2-3 kalimat agar tampil dengan baik
4. **Jumlah Slide**: Disarankan 3-5 slide agar navigasi tidak terlalu panjang
5. **Kualitas Gambar**: Gunakan gambar dengan resolusi tinggi untuk hasil optimal di semua device
