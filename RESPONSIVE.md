# Dokumentasi Responsive Design - EyeLit

Dokumen ini menjelaskan breakpoint responsive yang digunakan pada website EyeLit.

---

## Breakpoint Device

| Device | Lebar | Deskripsi |
|--------|-------|----------|
| **Smartphone** | < 440px | HP kecil, iPhone SE, Samsung Galaxy S series |
| **Tablet** | 440px - 1024px | iPad Mini (768px), iPad Air/Pro (820px+) |
| **Desktop** | > 1024px | Laptop, PC, monitor |

---

## Grid Produk

| Device | Produk per Baris | Class |
|--------|-----------------|-------|
| Smartphone (< 440px) | 2 produk | `.grid-row-item` → width: 50% |
| Tablet (440px - 1024px) | 4 produk | `.grid-row-item` → width: 25% |
| Desktop (> 1024px) | 4 produk | `.grid-row-item` → width: 25% |

---

## Navbar

| Device | Search Bar | Icon Catalog |
|--------|------------|-------------|
| Smartphone (< 440px) | Tersembunyi | Tersembunyi |
| Tablet (440px - 1024px) | Tampil | Tampil |
| Desktop (> 1024px) | Tampil | Tampil |

---

## CSS Breakpoints

### Global (`app.css`)

```css
/* Smartphone */
@media (max-width: 439px) {
    .grid-row-item {
        width: 50%;
    }
}

/* Tablet & Desktop */
@media (min-width: 440px) {
    .grid-row-item {
        width: 25%;
    }
}

/* Tablet specific */
@media (min-width: 768px) and (max-width: 1024px) {
    .grid-box-merek {
        font-size: 12px;
    }

    .grid-box-harga {
        font-size: 14px;
    }

    .grid-box-tipe {
        display: none;
    }
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
4. **Scroll horizontal** di cegah dengan `overflow-x: hidden` pada `body`
