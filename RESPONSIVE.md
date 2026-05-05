# Dokumentasi Responsive Design - EyeLit

Dokumen ini menjelaskan breakpoint responsive yang digunakan pada website EyeLit.

---

## Breakpoint Device

| Device | Lebar | Deskripsi |
|--------|-------|-----------|
| **HP Kecil** | 355px - 394px | iPhone SE, Samsung Galaxy S8 series |
| **HP Besar** | 395px - 439px | iPhone 14 Pro Max, Samsung S20 Ultra |
| **Tablet** | 440px - 1024px | iPad Mini (768px), iPad Air/Pro (820px+) |
| **Desktop** | > 1024px | Laptop, PC, monitor |

---

## Grid Produk

| Device | Produk per Baris | Ukuran Teks |
|--------|-----------------|-------------|
| HP Kecil (355px - 394px) | 2 produk | Merek 11px, Harga 11px, Tipe 8px |
| HP Besar (395px - 439px) | 2 produk | Merek 14px, Harga 16px, Tipe 11px |
| Tablet (440px - 1024px) | 4 produk | Merek 12px, Harga 14px, Tipe disembunyikan |
| Desktop (> 1024px) | 4 produk | Merek 16px, Harga 18px, Tipe 12px |

---

## Navbar

| Device | Search Bar | Icon Catalog |
|--------|------------|-------------|
| HP Kecil / HP Besar (< 440px) | Tersembunyi | Tersembunyi |
| Tablet (440px - 1024px) | Tampil | Tampil |
| Desktop (> 1024px) | Tampil | Tampil |

---

## CSS Breakpoints

### Global (`app.css`)

```css
/* HP Kecil (355px - 394px) */
@media (min-width: 355px) and (max-width: 394px) {
    .grid-box-merek { font-size: 11px; }
    .grid-box-harga { font-size: 11px; }
    .grid-box-tipe  { font-size: 8px; }
}

/* HP Besar (395px - 439px) */
@media (min-width: 395px) and (max-width: 439px) {
    .grid-box-merek { font-size: 14px; }
    .grid-box-harga { font-size: 16px; }
    .grid-box-tipe  { font-size: 11px; }
}

/* Tablet specific (440px - 1024px) */
@media (min-width: 440px) and (max-width: 1024px) {
    .grid-box-merek { font-size: 12px; }
    .grid-box-harga { font-size: 14px; }
    .grid-box-tipe  { display: none; }
}
```

### Tailwind CSS Breakpoints

| Class Prefix | Min Width | Contoh |
|--------------|-----------|--------|
| `sm:` | 640px | `sm:block` |
| `md:` | 768px | `md:grid` |
| `lg:` | 1024px | `lg:flex` |
| `xl:` | 1280px | `xl:text-2xl` |
| `2xl:` | 1536px | `2xl:max-w-7xl` |

---

## Catatan Penting

1. **Lebar device** dihitung dari viewport browser, bukan resolusi layar fisik
2. **Touch target** minimum 44x44px untuk button di mobile
3. **Gap antar produk** menggunakan CSS grid/flex yang sudah diatur
4. **Scroll horizontal** dicegah dengan `overflow-x: hidden` pada `body`
