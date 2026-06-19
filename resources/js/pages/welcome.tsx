import { Head, Link, usePage } from '@inertiajs/react';
import { Bell, BookOpen, LayoutGrid, LogOut, Mail, MapPin, Phone, Search, Settings, ShoppingBag, ShoppingCart, User, MessageCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function Welcome() {
    const { auth, produk } = usePage().props as any;
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);

    // Refs for dropdown timers
    const userDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cartDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Mock cart items - replace with actual data from backend
    const cartItems: any[] = auth.cart_items || [];
    const keranjangCount: number = auth.keranjang_count || 0;
    const notifications: any[] = auth.user?.notifications || [];
    const unreadNotificationsCount = notifications.filter((n: any) => !n.dibaca).length;

    // Carousel data - add new information slides here
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/images/carousel/informasi-1.png',
            title: 'Gratis Pengiriman ke Seluruh Indonesia',
            description: 'Nikmati bebas biaya pengiriman untuk setiap pemesanan. Kami mengirim ke lebih dari 100 kota di Indonesia dengan jaminan keamanan paket hingga tujuan.',
        },
        {
            image: '/images/carousel/informasi-2.png',
            title: 'Lensa Berkualitas Tinggi untuk Penglihatan Optimal',
            description: 'Setiap kacamata EyeLit dilengkapi dengan lensa premium yang telah teruji ketajaman optiknya. Dirancang untuk kenyamanan seharian dengan coating anti-refleksi dan anti-gores.',
        },
    ];

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    // Auto-play carousel setiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <>
            <Head title="EyeLit" />
            <div className="min-h-screen bg-eyelit-theme">
                {/* Navbar */}
                <nav className="relative z-50 border-b" style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(54,104,181,0.95)', backdropFilter: 'blur(12px)' }}>
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-4">
                        {/* Logo & Text */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <img src="/images/logo/AuthMobile.svg" alt="EyeLit Logo" className="h-10 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold text-white">EyeLit</span>
                        </Link>

                        {/* Search Bar - Center (hide on mobile <440px) */}
                        <div className="flex-1 max-w-lg ml-[90px] max-[439px]:hidden">
                            <div className="relative">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    spellCheck={false}
                                    placeholder="Cari produk kacamata..."
                                    className="w-full h-9 pl-4 pr-12 rounded-full text-sm placeholder:text-white/70 appearance-none focus:outline-none"
                                    style={{ background: 'rgba(255, 255, 255, 0.25)', border: '1px solid rgba(255, 255, 255, 0.45)', color: '#ffffff' }}
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-white" />
                            </div>
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {auth.user?.peran === 'Admin' && (
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-yellow-300 text-yellow-300 hover:bg-yellow-300/10 transition-colors"
                                    title="Kembali ke Dashboard Admin"
                                >
                                    <LayoutGrid className="size-4" />
                                    <span>Kembali ke Dashboard Admin</span>
                                </Link>
                            )}
                            <Link href="/katalog" className="icon-btn icon-catalog p-2 rounded-full" style={{ color: '#93c5fd' }}>
                                <BookOpen className="size-5" />
                            </Link>

                            {/* Notification Link */}
                            {auth.user && (
                                <Link
                                    href="/notifications"
                                    className="icon-btn icon-bell p-2 rounded-full relative"
                                    style={{ color: '#93c5fd' }}
                                    title="Notifikasi"
                                >
                                    <Bell className="size-5" />
                                    {unreadNotificationsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                            {unreadNotificationsCount}
                                        </span>
                                    )}
                                </Link>
                            )}

                            {/* Cart Dropdown */}
                            {auth.user && (
                            <div className="relative h-full flex items-center">
                                <div
                                    onMouseEnter={() => {
                                        if (cartDropdownTimer.current) clearTimeout(cartDropdownTimer.current);
                                        setShowCartDropdown(true);
                                    }}
                                    onMouseLeave={() => {
                                        cartDropdownTimer.current = setTimeout(() => setShowCartDropdown(false), 100);
                                    }}
                                >
                                    <button className="icon-btn icon-cart p-2 rounded-full relative" style={{ color: '#93c5fd' }}>
                                        <ShoppingCart className="size-5" />
                                        {keranjangCount > 0 && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {keranjangCount}
                                            </span>
                                        )}
                                    </button>
                                    {showCartDropdown && (
                                        <div
                                            className="dropdown-menu show max-[439px]:left-4 max-[439px]:right-4 max-[439px]:translate-x-0"
                                            style={{ top: '64px', right: '24px' }}
                                            onMouseEnter={() => {
                                                if (cartDropdownTimer.current) clearTimeout(cartDropdownTimer.current);
                                            }}
                                            onMouseLeave={() => {
                                                cartDropdownTimer.current = setTimeout(() => setShowCartDropdown(false), 100);
                                            }}
                                        >
                                            <div className="dropdown-header">
                                                <span className="text-sm font-semibold text-[#e8f0fe]">Keranjang Belanja</span>
                                            </div>
                                            {cartItems.length === 0 ? (
                                                <div className="dropdown-cart-empty">
                                                    <ShoppingCart className="size-10" />
                                                    <p> Kamu belum memasukkan barang ke keranjang </p>
                                                </div>
                                            ) : (
                                                <div className="max-h-80 overflow-y-auto">
                                                    {cartItems.map((item: any, index: number) => (
                                                        <div key={index} className="dropdown-cart-item">
                                                            <div className="dropdown-cart-image">
                                                                <img
                                                                    src={item.gambar ? `/images/produk/${encodeURIComponent(item.gambar)}` : '/images/placeholder.png'}
                                                                    alt={item.nama}
                                                                    onError={(e) => { (e.currentTarget.src = '/images/placeholder.png'); }}
                                                                />
                                                            </div>
                                                            <div className="dropdown-cart-info">
                                                                <p className="dropdown-cart-name">{item.nama}</p>
                                                                <p className="dropdown-cart-price">Rp {item.harga?.toLocaleString('id-ID')}</p>
                                                                <p className="dropdown-cart-qty">Jumlah: {item.jumlah}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {cartItems.length > 0 && (
                                                <div className="dropdown-cart-footer">
                                                    <Link href="/keranjang">Lihat Keranjang</Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            )}

                            {/* User Dropdown */}
                            {auth.user && (
                                <div className="relative h-full flex items-center">
                                    <div
                                        onMouseEnter={() => {
                                            if (userDropdownTimer.current) clearTimeout(userDropdownTimer.current);
                                            setShowUserDropdown(true);
                                        }}
                                        onMouseLeave={() => {
                                            userDropdownTimer.current = setTimeout(() => setShowUserDropdown(false), 100);
                                        }}
                                    >
                                        <button className="icon-btn icon-user p-2 rounded-full" style={{ color: '#93c5fd' }}>
                                            <User className="size-5" />
                                        </button>
                                        {showUserDropdown && (
                                            <div
                                                className="dropdown-menu show max-[439px]:left-4 max-[439px]:right-4 max-[439px]:translate-x-0"
                                                style={{ top: '64px', right: '24px' }}
                                                onMouseEnter={() => {
                                                    if (userDropdownTimer.current) clearTimeout(userDropdownTimer.current);
                                                }}
                                                onMouseLeave={() => {
                                                    userDropdownTimer.current = setTimeout(() => setShowUserDropdown(false), 100);
                                                }}
                                            >
                                                <div className="dropdown-header">
                                                    <div className="dropdown-avatar">
                                                        {auth.user?.username?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="dropdown-user-info">
                                                        <span className="dropdown-user-name">{auth.user?.username}</span>
                                                        <span className="dropdown-user-email">{auth.user?.email}</span>
                                                    </div>
                                                </div>
                                                <div className="dropdown-body">
                                                    {auth.user?.peran === 'Admin' && (
                                                        <Link href="/dashboard" className="dropdown-item" style={{ color: '#2264c0', fontWeight: 600 }}>
                                                            <LayoutGrid className="size-5" />
                                                            Admin Panel
                                                        </Link>
                                                    )}
                                                    <Link href="/pesanan" className="dropdown-item">
                                                        <ShoppingBag className="size-5" />
                                                        Pembelian
                                                    </Link>
                                                    <Link href="/settings/profile" className="dropdown-item">
                                                        <Settings className="size-5" />
                                                        Pengaturan
                                                    </Link>
                                                    <form method="POST" action="/logout">
                                                        <input type="hidden" name="_token" value={auth.csrf} />
                                                        <button type="submit" className="dropdown-item logout w-full text-left">
                                                            <LogOut className="size-5" />
                                                            Keluar Akun
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Login/Register - hanya jika belum login */}
                            {!auth.user && (
                                <div className="flex items-center gap-2">
                                    <Link href="/login" className="px-4 py-2 text-sm font-semibold text-white hover:text-[#fde9cb] transition-colors">
                                        Masuk
                                    </Link>
                                    <Link href="/register" className="px-5 py-2 text-sm font-bold btn-orange-gradient rounded-full">
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Carousel Section */}
                <section className="py-12 my-6 mx-4 rounded-3xl card-glass-light border border-white/30 shadow-md">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Left: Image Carousel (Cross-Fade) */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] bg-slate-100/10" style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.4)' }}>
                                    {slides.map((slide, idx) => (
                                        <div
                                            key={idx}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                                            }`}
                                        >
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { (e.currentTarget.src = '/images/placeholder.png'); }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Right: Text Content Carousel */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left min-h-[260px] flex flex-col justify-center relative">
                                {slides.map((slide, idx) => (
                                    <div
                                        key={idx}
                                        className={`transition-all duration-700 ease-in-out flex flex-col ${
                                            idx === currentSlide 
                                                ? 'opacity-100 translate-y-0 relative z-10' 
                                                : 'opacity-0 translate-y-4 absolute z-0 pointer-events-none'
                                        }`}
                                    >
                                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-slate-800">
                                            {slide.title}
                                        </h2>
                                        <p className="text-base lg:text-lg leading-relaxed mb-8 text-slate-600">
                                            {slide.description}
                                        </p>
                                    </div>
                                ))}
                                <div className="flex items-center gap-4 justify-center lg:justify-start mt-4">
                                    <button
                                        onClick={handlePrev}
                                        className="w-12 h-12 btn-orange-gradient rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white">
                                            <path d="m15 18-6-6 6-6"/>
                                        </svg>
                                    </button>
                                    <div className="flex gap-2">
                                        {slides.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                                                    index === currentSlide
                                                        ? 'bg-[#f28b27] scale-125 shadow-md shadow-orange-500/30'
                                                        : 'bg-slate-300 hover:bg-slate-400'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className="w-12 h-12 btn-orange-gradient rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white">
                                            <path d="m9 18 6-6-6-6"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Grid Box Section */}
                <section className="overflow-hidden">
                    {/* Row 1: Produk 1-5, shift to 2-5 */}
                    <div className="flex w-full overflow-hidden">
                        {[0,1,2,3,4,1,2,3].map((idx: number) => (
                            <div key={`r1-${idx}`} className="w-1/4 shrink-0 grid-row-item">
                                <Link href={`/produk/${produk?.[idx]?.id}`} className="grid-box block animate-row">
                                    <div className="grid-box-content">
                                        <img className="grid-box-image" src={`/images/produk/${produk?.[idx]?.gambar}`} alt={produk?.[idx]?.nama_produk} onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }} />
                                        <div className="grid-box-overlay">
                                            <div className="grid-box-overlay-bottom">
                                                <div className="grid-box-left">
                                                    <div className="grid-box-merek">{produk?.[idx]?.merek}</div>
                                                    <div className="grid-box-tipe">{produk?.[idx]?.tipe_produk}</div>
                                                </div>
                                                <span className="grid-box-harga">Rp {(Number(produk?.[idx]?.harga_produk) || 0).toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Row 2: Produk 6-10, shift to 7-10 */}
                <section className="overflow-hidden">
                    <div className="flex w-full overflow-hidden">
                        {[6,7,8,9,7,8,9,10].map((idx: number) => (
                            <div key={`r2-${idx}`} className="w-1/4 shrink-0 grid-row-item">
                                <Link href={`/produk/${produk?.[idx]?.id}`} className="grid-box block animate-row-delay-2" style={{animationName: 'slide-left-row'}}>
                                    <div className="grid-box-content">
                                        <img className="grid-box-image" src={`/images/produk/${produk?.[idx]?.gambar}`} alt={produk?.[idx]?.nama_produk} onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }} />
                                        <div className="grid-box-overlay">
                                            <div className="grid-box-overlay-bottom">
                                                <div className="grid-box-left">
                                                    <div className="grid-box-merek">{produk?.[idx]?.merek}</div>
                                                    <div className="grid-box-tipe">{produk?.[idx]?.tipe_produk}</div>
                                                </div>
                                                <span className="grid-box-harga">Rp {(Number(produk?.[idx]?.harga_produk) || 0).toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Row 3: Produk 11-15, shift to 12-15 */}
                <section className="overflow-hidden">
                    <div className="flex w-full overflow-hidden">
                        {[10,11,12,13,14,11,12,13].map((idx: number) => (
                            <div key={`r3-${idx}`} className="w-1/4 shrink-0 grid-row-item">
                                <Link href={`/produk/${produk?.[idx]?.id}`} className="grid-box block animate-row-delay-4">
                                    <div className="grid-box-content">
                                        <img className="grid-box-image" src={`/images/produk/${produk?.[idx]?.gambar}`} alt={produk?.[idx]?.nama_produk} onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }} />
                                        <div className="grid-box-overlay">
                                            <div className="grid-box-overlay-bottom">
                                                <div className="grid-box-left">
                                                    <div className="grid-box-merek">{produk?.[idx]?.merek}</div>
                                                    <div className="grid-box-tipe">{produk?.[idx]?.tipe_produk}</div>
                                                </div>
                                                <span className="grid-box-harga">Rp {(Number(produk?.[idx]?.harga_produk) || 0).toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#3668b5] py-16 overflow-hidden relative group cursor-pointer">
                    <div className="mx-auto max-w-7xl px-4 flex items-center justify-between gap-8 relative z-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Cari Lebih Banyak Gayamu</h2>
                            <p className="text-white/80">Temukan kacamata yang sempurna untuk gaya hidupmu.</p>
                        </div>
                    </div>
                    {/* White Block - slides to left 100% on hover */}
                    <div className="absolute top-0 right-0 w-0 h-full bg-white overflow-hidden group-hover:w-full transition-all duration-500 ease-out flex items-center justify-center z-20">
                        <div className="text-center">
                            <span className="cta-text block text-3xl md:text-5xl font-black text-[#3668b5]">
                                Koleksi Terlengkap<br/>untuk Gaya Hidupmu
                            </span>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#1b1b18] text-white">
                    <div className="mx-auto max-w-7xl px-4 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {/* Brand */}
                            <div className="lg:col-span-1">
                                <Link href="/" className="flex items-center gap-2 mb-5">
                                    <img src="/images/logo/Auth.svg" alt="EyeLit Logo" className="h-10 w-auto" />
                                    <span className="text-2xl font-bold text-white">EyeLit</span>
                                </Link>
                                <p className="text-sm text-white/60 leading-relaxed mb-6">
                                    Toko kacamata online terpercaya untuk gaya hidup yang lebih tajam.
                                </p>
                                <div className="flex gap-3">
                                    <a href="https://www.tiktok.com/@eyelit" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#2264c0] transition-colors">
                                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.1 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.89a4.85 4.85 0 0 1-1.01-.2z"/>
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com/eyelit" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#2264c0] transition-colors">
                                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Navigasi</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Beranda</Link></li>
                                    <li><Link href="/katalog" className="text-sm text-white/60 hover:text-white transition-colors">Katalog</Link></li>
                                    <li><Link href="/tentang" className="text-sm text-white/60 hover:text-white transition-colors">Tentang Kami</Link></li>
                                    <li><Link href="/kontak" className="text-sm text-white/60 hover:text-white transition-colors">Hubungi Kami</Link></li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Bantuan</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</Link></li>
                                    <li><Link href="/pengiriman" className="text-sm text-white/60 hover:text-white transition-colors">Pengiriman</Link></li>
                                    <li><Link href="/pengembalian" className="text-sm text-white/60 hover:text-white transition-colors">Pengembalian</Link></li>
                                    <li><Link href="/kebijakan-privasi" className="text-sm text-white/60 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Kontak</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <MapPin className="size-4 text-white mt-0.5 shrink-0" />
                                        <span className="text-sm text-white/60">Jl. Sudirman No. 123, Jakarta Pusat 10220, Indonesia</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Phone className="size-4 text-white shrink-0" />
                                        <span className="text-sm text-white/60">+62 21 1234 5678</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Mail className="size-4 text-white shrink-0" />
                                        <span className="text-sm text-white/60">info@eyelit.com</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-sm text-white/40">&copy; 2026 EyeLit. Hak cipta dilindungi.</p>
                                <div className="flex gap-8">
                                    <Link href="/kebijakan-privasi" className="text-sm text-white/40 hover:text-white transition-colors">Kebijakan Privasi</Link>
                                    <Link href="/syarat-ketentuan" className="text-sm text-white/40 hover:text-white transition-colors">Syarat &amp; Ketentuan</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
