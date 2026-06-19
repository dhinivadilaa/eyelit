import { Head, Link, router, usePage } from '@inertiajs/react';
import { Bell, BookOpen, LayoutGrid, LogOut, Mail, MapPin, Phone, Search, Settings, ShoppingBag, ShoppingCart, User, X, MessageCircle } from 'lucide-react';
import { useRef, useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';

export default function Katalog() {
    const { auth, produk, lensa } = usePage().props as any;
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filterClosing, setFilterClosing] = useState(false);
    const [backdropClosing, setBackdropClosing] = useState(false);
    const [searchMerek, setSearchMerek] = useState('');

    // ✅ TAMBAHAN: Search query state
    const [searchQuery, setSearchQuery] = useState('');

    // Filter states
    const [selectedMerek, setSelectedMerek] = useState<string[]>([]);
    const [selectedJenisKelamin, setSelectedJenisKelamin] = useState<string[]>([]);
    const [selectedWarna, setSelectedWarna] = useState<string[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
    const [selectedBentuk, setSelectedBentuk] = useState<string[]>([]);
    const [minHarga, setMinHarga] = useState<string>('');
    const [maxHarga, setMaxHarga] = useState<string>('');
    const [displayMinHarga, setDisplayMinHarga] = useState<string>('');
    const [displayMaxHarga, setDisplayMaxHarga] = useState<string>('');
    const [hargaError, setHargaError] = useState<string>('');

    // Purchase option modal states
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedProduk, setSelectedProduk] = useState<any | null>(null);
    const [purchaseAction, setPurchaseAction] = useState<'cart' | 'buy'>('cart');
    const [purchaseType, setPurchaseType] = useState<'Frame Saja' | 'Frame + Lensa'>('Frame Saja');
    const [lensOdType, setLensOdType] = useState('Minus');
    const [lensOdValue, setLensOdValue] = useState(0.00);
    const [lensOdCyl, setLensOdCyl] = useState(0.00);
    const [lensOsType, setLensOsType] = useState('Minus');
    const [lensOsValue, setLensOsValue] = useState(0.00);
    const [lensOsCyl, setLensOsCyl] = useState(0.00);
    const [antiRadiasi, setAntiRadiasi] = useState(false);
    const [photochromic, setPhotochromic] = useState(false);

    const lensValues = Array.from({ length: 41 }, (_, i) => i * 0.25); // 0.00 to 10.00
    const cylinderValues = Array.from({ length: 17 }, (_, i) => i * 0.25); // 0.00 to 4.00

    // Carousel data - add new information slides here
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imageAnimClass, setImageAnimClass] = useState('');
    const [textAnimClass, setTextAnimClass] = useState('');
    const [buttonAnimClass, setButtonAnimClass] = useState('');

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

    const userDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cartDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cartItems: any[] = auth.cart_items || [];
    const keranjangCount: number = auth.keranjang_count || 0;
    const notifications: any[] = auth.user?.notifications || [];
    const unreadNotificationsCount = notifications.filter((n: any) => !n.dibaca).length;

    // Calculate lens price based on DB table records
    const calculateLensPrice = (nilai: number, silinder: number, jenis: string) => {
        let total = 0;
        if (nilai > 0) {
            const matchingLensa = lensa?.find((l: any) =>
                l.jenis_lensa === jenis &&
                nilai >= l.minus_plus_batas_bawah &&
                nilai <= l.minus_plus_batas_atas
            );
            if (matchingLensa) {
                total += Number(matchingLensa.harga_per_mata);
            }
        }
        if (silinder > 0) {
            const matchingSilinder = lensa?.find((l: any) =>
                l.jenis_lensa === 'Silinder' &&
                silinder >= l.minus_plus_batas_bawah &&
                silinder <= l.minus_plus_batas_atas
            );
            if (matchingSilinder) {
                total += Number(matchingSilinder.harga_per_mata);
            }
        }
        return total;
    };

    const odPrice = useMemo(() => calculateLensPrice(lensOdValue, lensOdCyl, lensOdType), [lensOdValue, lensOdCyl, lensOdType, lensa]);
    const osPrice = useMemo(() => calculateLensPrice(lensOsValue, lensOsCyl, lensOsType), [lensOsValue, lensOsCyl, lensOsType, lensa]);
    
    const hargaAntiRadiasi = antiRadiasi ? (lensa?.[0]?.harga_anti_radiasi ?? 150000) : 0;
    const hargaPhotochromic = photochromic ? (lensa?.[0]?.harga_photochromic ?? 200000) : 0;

    const calculateTotalPrice = () => {
        let total = Number(selectedProduk?.harga_produk ?? 0);
        if (purchaseType === 'Frame + Lensa') {
            total += odPrice;
            total += osPrice;
            total += Number(hargaAntiRadiasi);
            total += Number(hargaPhotochromic);
        }
        return total;
    };

    const handleAddToCart = (e: React.MouseEvent, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!auth.user) {
            router.visit('/login');
            return;
        }
        setSelectedProduk(item);
        setPurchaseAction('cart');
        setPurchaseType('Frame Saja');
        setLensOdType('Minus');
        setLensOdValue(0.00);
        setLensOdCyl(0.00);
        setLensOsType('Minus');
        setLensOsValue(0.00);
        setLensOsCyl(0.00);
        setAntiRadiasi(false);
        setPhotochromic(false);
        setShowPurchaseModal(true);
    };

    const handleBeliLangsung = (e: React.MouseEvent, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!auth.user) {
            router.visit('/login');
            return;
        }
        setSelectedProduk(item);
        setPurchaseAction('buy');
        setPurchaseType('Frame Saja');
        setLensOdType('Minus');
        setLensOdValue(0.00);
        setLensOdCyl(0.00);
        setLensOsType('Minus');
        setLensOsValue(0.00);
        setLensOsCyl(0.00);
        setAntiRadiasi(false);
        setPhotochromic(false);
        setShowPurchaseModal(true);
    };

    const handleConfirmPurchase = () => {
        if (!selectedProduk) return;

        if (purchaseType === 'Frame + Lensa' && (lensOdValue === 0 && lensOsValue === 0)) {
            toast.error('Mohon pilih ukuran lensa untuk mata kanan (OD) atau mata kiri (OS)');
            return;
        }

        const payload = {
            produk_id: selectedProduk.id,
            jumlah: 1,
            tipe_pembelian: purchaseType,
            ...(purchaseType === 'Frame + Lensa' ? {
                jenis_lensa_od: lensOdType,
                nilai_lensa_od: String(lensOdValue),
                silinder_od: String(lensOdCyl),
                jenis_lensa_os: lensOsType,
                nilai_lensa_os: String(lensOsValue),
                silinder_os: String(lensOsCyl),
                anti_radiasi: antiRadiasi,
                photochromic: photochromic,
            } : {})
        };

        if (purchaseAction === 'buy') {
            router.post('/checkout/langsung', payload, {
                preserveScroll: true,
            });
        } else {
            router.post('/keranjang/tambah', payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowPurchaseModal(false);
                }
            });
        }
    };

    // Filter options from actual produk data (unique values)
    const mereks = useMemo(() => [...new Set(produk?.map((p: any) => p.merek) || [])].sort(), [produk]);
    const jenisKelamins = useMemo(() => [...new Set(produk?.map((p: any) => p.jenis_kelamin) || [])].sort(), [produk]);
    const warnas = useMemo(() => [...new Set(produk?.map((p: any) => p.warna) || [])].sort(), [produk]);
    const materials = useMemo(() => [...new Set(produk?.map((p: any) => p.material) || [])].sort(), [produk]);
    const bentuks = useMemo(() => [...new Set(produk?.map((p: any) => p.bentuk) || [])].sort(), [produk]);

    // Filtered mereks based on search
    const filteredMereks = useMemo(() => {
        if (!searchMerek) return mereks;
        return mereks.filter(m => m.toLowerCase().includes(searchMerek.toLowerCase()));
    }, [mereks, searchMerek]);

    // Toggle helper
    const toggleFilter = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        if (arr.includes(value)) {
            setArr(arr.filter(v => v !== value));
        } else {
            setArr([...arr, value]);
        }
    };

    // Check if any filter is active
    const hasActiveFilters = selectedMerek.length > 0 || selectedJenisKelamin.length > 0 || selectedWarna.length > 0 || selectedMaterial.length > 0 || selectedBentuk.length > 0 || minHarga !== '' || maxHarga !== '';

    // Clear all filters
    const clearFilters = () => {
        setSelectedMerek([]);
        setSelectedJenisKelamin([]);
        setSelectedWarna([]);
        setSelectedMaterial([]);
        setSelectedBentuk([]);
        setSearchMerek('');
        setMinHarga('');
        setMaxHarga('');
        setDisplayMinHarga('');
        setDisplayMaxHarga('');
        setHargaError('');
    };

    // Format number with thousand separator
    const formatNumber = (value: string) => {
        const num = value.replace(/\D/g, '');
        if (num === '') return '';
        return Number(num).toLocaleString('id-ID');
    };

    // Parse formatted number back to raw number
    const parseFormattedNumber = (formatted: string) => {
        return formatted.replace(/\D/g, '');
    };

    // ✅ DIPERBAIKI: Filtered products — sekarang termasuk filter pencarian teks
    const filteredProduk = useMemo(() => {
        let result = produk || [];

        // ✅ Filter berdasarkan search query (nama produk, merek, tipe)
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((item: any) =>
                item.nama_produk?.toLowerCase().includes(q) ||
                item.merek?.toLowerCase().includes(q) ||
                item.tipe_produk?.toLowerCase().includes(q)
            );
        }

        // Filter berdasarkan pilihan filter panel
        if (hasActiveFilters) {
            result = result.filter((item: any) => {
                if (selectedMerek.length > 0 && !selectedMerek.includes(item.merek)) return false;
                if (selectedJenisKelamin.length > 0 && !selectedJenisKelamin.includes(item.jenis_kelamin)) return false;
                if (selectedWarna.length > 0 && !selectedWarna.includes(item.warna)) return false;
                if (selectedMaterial.length > 0 && !selectedMaterial.includes(item.material)) return false;
                if (selectedBentuk.length > 0 && !selectedBentuk.includes(item.bentuk)) return false;
                const harga = Number(item.harga_produk);
                if (minHarga !== '' && harga < Number(minHarga)) return false;
                if (maxHarga !== '' && harga > Number(maxHarga)) return false;
                return true;
            });
        }

        return result;
    }, [produk, searchQuery, selectedMerek, selectedJenisKelamin, selectedWarna, selectedMaterial, selectedBentuk, minHarga, maxHarga, hasActiveFilters]);

    const handlePrev = () => {
        setImageAnimClass('carousel-image-out');
        setTextAnimClass('carousel-text-out');
        setButtonAnimClass('carousel-button-click');

        setTimeout(() => {
            setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            setImageAnimClass('carousel-image-in');
            setTextAnimClass('carousel-text-in');
            setButtonAnimClass('');
            setTimeout(() => {
                setImageAnimClass('');
                setTextAnimClass('');
            }, 250);
        }, 400);
    };

    const handleNext = () => {
        setImageAnimClass('carousel-image-out');
        setTextAnimClass('carousel-text-out');
        setButtonAnimClass('carousel-button-click');

        setTimeout(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
            setImageAnimClass('carousel-image-in');
            setTextAnimClass('carousel-text-in');
            setButtonAnimClass('');
            setTimeout(() => {
                setImageAnimClass('');
                setTextAnimClass('');
            }, 250);
        }, 400);
    };

    // Auto-play carousel every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setImageAnimClass('carousel-image-out');
            setTextAnimClass('carousel-text-out');
            setTimeout(() => {
                setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
                setImageAnimClass('carousel-image-in');
                setTextAnimClass('carousel-text-in');
                setTimeout(() => {
                    setImageAnimClass('');
                    setTextAnimClass('');
                }, 250);
            }, 400);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="Katalog - EyeLit" />
            <div className="min-h-screen bg-eyelit-theme">
                {/* Navbar */}
                <nav className="relative z-50 border-b" style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(54,104,181,0.95)', backdropFilter: 'blur(12px)' }}>
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-4">
                        {/* Logo & Text */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <img src="/images/logo/AuthMobile.svg" alt="EyeLit Logo" className="h-10 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold text-white">EyeLit</span>
                        </Link>

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
                            <Link href="/katalog" className="icon-btn icon-catalog p-2 rounded-full" style={{ color: '#ffffff' }}>
                                <BookOpen className="size-5" />
                            </Link>

                            {/* Notification Link */}
                            {auth.user && (
                                <Link
                                    href="/notifications"
                                    className="icon-btn icon-bell p-2 rounded-full relative"
                                    style={{ color: '#ffffff' }}
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
                                    <button className="icon-btn icon-cart p-2 rounded-full relative" style={{ color: '#ffffff' }}>
                                        <ShoppingCart className="size-5" />
                                        {keranjangCount > 0 && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f28b27] text-white text-xs font-bold rounded-full flex items-center justify-center">
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
                                                    <p className="text-[#7aa3e0]"> Kamu belum memasukkan barang ke keranjang </p>
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
                                        <button className="icon-btn icon-user p-2 rounded-full" style={{ color: '#ffffff' }}>
                                            <User className="size-5" />
                                        </button>
                                        {showUserDropdown && (
                                            <div
                                                className="dropdown-menu show max-[439px]:left-4 max-[439px]:right-4 max-[439px]:translate-x-0"
                                                style={{ top: '64px', right: '24px' }}
                                                onMouseEnter={() => {
                                                    if (userDropdownTimer.current) clearTimeout(userDropdownTimer.current);
                                                    setShowUserDropdown(true);
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
                                                        <Link href="/dashboard" className="dropdown-item" style={{ color: '#f28b27', fontWeight: 600 }}>
                                                            <LayoutGrid className="size-5" />
                                                            Admin Panel
                                                        </Link>
                                                    )}
                                                    <Link href="/pesanan" className="dropdown-item">
                                                        <ShoppingBag className="size-5" />
                                                        Pembelian
                                                    </Link>
                                                    <Link href="/user/profile" className="dropdown-item">
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
                <section className="py-16 border-b" style={{ background: 'rgba(26,45,90,0.3)', borderColor: 'rgba(59,130,246,0.1)' }}>
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Left: Image */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-900/30">
                                    <img
                                        src={slides[currentSlide].image}
                                        alt={slides[currentSlide].title}
                                        className={`w-full h-auto transition-opacity duration-300 ${imageAnimClass}`}
                                    />
                                </div>
                            </div>
                            {/* Right: Text Content */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <h2 className={`text-3xl lg:text-4xl font-bold text-[#e8f0fe] mb-4 leading-tight ${textAnimClass}`}>
                                    {slides[currentSlide].title}
                                </h2>
                                <p className={`text-[#7aa3e0] text-base lg:text-lg leading-relaxed mb-8 ${textAnimClass}`}>
                                    {slides[currentSlide].description}
                                </p>
                                <div className="flex items-center gap-4 justify-center lg:justify-start">
                                    <button
                                        onClick={handlePrev}
                                        className="w-12 h-12 bg-[#2264c0] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white">
                                            <path d="m15 18-6-6 6-6"/>
                                        </svg>
                                    </button>
                                    <div className="flex gap-2">
                                        {slides.map((_, index) => (
                                            <span
                                                key={index}
                                                className={`w-3 h-3 rounded-full transition-colors ${
                                                    index === currentSlide
                                                        ? 'bg-[#2264c0] carousel-dot-active'
                                                        : 'bg-[#2264c0]/30'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className="w-12 h-12 bg-[#2264c0] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
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

                {/* Search Section */}
                <section className="border-b" style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255,255,255,0.15)' }}>
                    <div className="mx-auto max-w-7xl px-4 py-6">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold text-white text-center">Temukan Kacamata Impianmu</h2>
                            <p className="text-center text-white/80 text-sm">Jelajahi berbagai koleksi kacamata terbaru dari berbagai merek ternama</p>
                            {/* Main Search Bar */}
                            <div className="w-full max-w-2xl mx-auto">
                                <div className="relative">
                                    {/* ✅ DIPERBAIKI: Search bar sekarang terhubung ke state */}
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        spellCheck={false}
                                        placeholder="Cari nama produk, merek, atau tipe kacamata..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ background: 'rgba(255, 255, 255, 0.25)', border: '1px solid rgba(255, 255, 255, 0.45)', color: '#ffffff' }}
                                        className="w-full h-9 pl-4 pr-12 rounded-full text-sm placeholder:text-white/70 disabled:bg-transparent appearance-none focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                                    />
                                    {/* ✅ TAMBAHAN: Tombol clear search */}
                                    {searchQuery ? (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2"
                                        >
                                            <X className="size-4 text-white hover:text-[#fde9cb]" />
                                        </button>
                                    ) : (
                                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-white" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Info & Filter Section */}
                <section className="bg-transparent">
                    <div className="mx-auto max-w-7xl px-4 py-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-slate-900"><span>{filteredProduk?.length || 0}</span> produk ditemukan</p>
                            <button
                                onClick={() => setShowFilter(true)}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${hasActiveFilters ? 'btn-orange-gradient' : 'bg-white/40 text-[#3668b5] border border-white/60 hover:bg-white/65'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" x2="20" y1="6" y2="6"/>
                                    <line x1="8" x2="16" y1="12" y2="12"/>
                                    <line x1="11" x2="13" y1="18" y2="18"/>
                                </svg>
                                Filter
                            </button>
                        </div>
                    </div>
                </section>

                {/* Filter Overlay */}
                {(showFilter || filterClosing) && (
                    <>
                        {/* Backdrop */}
                        <div
                            className={`fixed inset-0 bg-black/40 z-50 ${showFilter && !backdropClosing ? 'backdrop-enter' : ''} ${backdropClosing ? 'backdrop-exit' : ''}`}
                            onClick={() => {
                                setBackdropClosing(true);
                                setFilterClosing(true);
                                setTimeout(() => {
                                    setShowFilter(false);
                                    setFilterClosing(false);
                                    setBackdropClosing(false);
                                }, 300);
                            }}
                        />

                        {/* Filter Panel */}
                        <div className={`fixed top-0 right-0 h-full w-80 bg-white/95 border-l border-white/40 z-50 shadow-2xl overflow-y-auto ${showFilter && !filterClosing ? 'filter-panel-enter' : ''} ${filterClosing ? 'filter-panel-exit' : ''}`}>
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800">Filter</h3>
                                <button
                                    onClick={() => {
                                        setBackdropClosing(true);
                                        setFilterClosing(true);
                                        setTimeout(() => {
                                            setShowFilter(false);
                                            setFilterClosing(false);
                                            setBackdropClosing(false);
                                        }, 300);
                                    }}
                                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            {/* Filter Content */}
                            <div className="p-4 space-y-6">
                                {/* Merek with search */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Merek</h4>
                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            placeholder="Cari merek..."
                                            value={searchMerek}
                                            onChange={(e) => setSearchMerek(e.target.value)}
                                            style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#1e293b' }}
                                            className="w-full h-9 pl-3 pr-8 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-400"
                                        />
                                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                    </div>
                                    <div className="space-y-2">
                                        {filteredMereks.map((merek) => (
                                            <label key={merek} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedMerek.includes(merek)}
                                                    onChange={() => toggleFilter(selectedMerek, setSelectedMerek, merek)}
                                                    className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{merek}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Jenis Kelamin</h4>
                                    <div className="space-y-2">
                                        {jenisKelamins.map((jk) => (
                                            <label key={jk} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedJenisKelamin.includes(jk)}
                                                    onChange={() => toggleFilter(selectedJenisKelamin, setSelectedJenisKelamin, jk)}
                                                    className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{jk}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Warna */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Warna</h4>
                                    <div className="space-y-2">
                                        {warnas.map((warna) => (
                                            <label key={warna} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedWarna.includes(warna)}
                                                    onChange={() => toggleFilter(selectedWarna, setSelectedWarna, warna)}
                                                    className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{warna}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Material */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Material</h4>
                                    <div className="space-y-2">
                                        {materials.map((material) => (
                                            <label key={material} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedMaterial.includes(material)}
                                                    onChange={() => toggleFilter(selectedMaterial, setSelectedMaterial, material)}
                                                    className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{material}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Bentuk */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Bentuk</h4>
                                    <div className="space-y-2">
                                        {bentuks.map((bentuk) => (
                                            <label key={bentuk} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBentuk.includes(bentuk)}
                                                    onChange={() => toggleFilter(selectedBentuk, setSelectedBentuk, bentuk)}
                                                    className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{bentuk}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Harga */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Harga</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Min"
                                                value={displayMinHarga}
                                                onChange={(e) => {
                                                    const raw = parseFormattedNumber(e.target.value);
                                                    setMinHarga(raw);
                                                    setDisplayMinHarga(formatNumber(raw));
                                                    if (maxHarga && raw && Number(raw) > Number(maxHarga)) {
                                                        setHargaError('Harga minimum tidak boleh lebih besar dari harga maksimum');
                                                    } else {
                                                        setHargaError('');
                                                    }
                                                }}
                                                style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#1e293b' }}
                                                className={`w-full h-9 px-3 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none ${hargaError ? 'border-red-500' : 'focus:border-orange-400'}`}
                                            />
                                        </div>
                                        <span className="text-sm text-slate-400">-</span>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Max"
                                                value={displayMaxHarga}
                                                onChange={(e) => {
                                                    const raw = parseFormattedNumber(e.target.value);
                                                    setMaxHarga(raw);
                                                    setDisplayMaxHarga(formatNumber(raw));
                                                    if (minHarga && raw && Number(raw) < Number(minHarga)) {
                                                        setHargaError('Harga maksimum tidak boleh lebih kecil dari harga minimum');
                                                    } else {
                                                        setHargaError('');
                                                    }
                                                }}
                                                style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#1e293b' }}
                                                className={`w-full h-9 px-3 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none ${hargaError ? 'border-red-500' : 'focus:border-orange-400'}`}
                                            />
                                        </div>
                                    </div>
                                    {hargaError && (
                                        <p className="text-xs text-red-500 mt-2">{hargaError}</p>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex gap-3">
                                <button
                                    onClick={clearFilters}
                                    className="flex-1 py-2 text-sm font-semibold text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    Hapus Filter
                                </button>
                                <button
                                    onClick={() => {
                                        setBackdropClosing(true);
                                        setFilterClosing(true);
                                        setTimeout(() => {
                                            setShowFilter(false);
                                            setFilterClosing(false);
                                            setBackdropClosing(false);
                                        }, 300);
                                    }}
                                    className="flex-1 py-2 text-sm font-bold btn-orange-gradient rounded-lg"
                                >
                                    Tampilkan {filteredProduk?.length || 0}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Product Grid Section */}
                <section>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                        {filteredProduk?.map((item: any) => (
                            <div key={item.id} className="rounded-xl shadow-md bg-white hover:shadow-[0_8px_30px_rgba(54,104,181,0.18)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                                {/* Clickable area - navigates to product detail */}
                                <Link href={`/produk/${item.id}`} className="flex flex-col flex-1 cursor-pointer">
                                    {/* Product Image */}
                                    <div className="aspect-square overflow-hidden bg-white relative">
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            style={{ mixBlendMode: 'multiply' }}
                                            src={item.gambar ? `/images/produk/${encodeURIComponent(item.gambar)}` : '/images/placeholder.png'}
                                            alt={item.nama_produk ?? 'Produk'}
                                            onError={(e) => { (e.currentTarget.src = '/images/placeholder.png'); }}
                                        />
                                        {item.stok === 0 && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Habis</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-3 flex flex-col justify-between flex-1">
                                        <div>
                                            {/* Brand */}
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#3668b5] mb-0.5">
                                                {item.merek ?? '-'}
                                            </p>

                                            {/* Product Name */}
                                            <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-1.5 leading-tight group-hover:text-[#f28b27] transition-colors">
                                                {item.nama_produk ?? 'Nama tidak tersedia'}
                                            </h3>
                                        </div>

                                        {/* Price */}
                                        <p className="text-base font-bold text-slate-900">
                                            Rp {(Number(item.harga_produk ?? 0) || 0).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </Link>

                                {/* Action Buttons - outside Link so they work independently */}
                                <div className="px-3 pb-3 pt-0">
                                    <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => handleAddToCart(e, item)}
                                            disabled={item.stok === 0}
                                            className="flex-1 py-2 px-1 rounded-lg border border-[#3668b5]/50 text-[#3668b5] text-[10px] md:text-[11px] font-bold hover:bg-[#3668b5]/10 active:scale-95 transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            title="Tambah ke Keranjang"
                                        >
                                            <ShoppingCart className="size-3.5 flex-shrink-0" />
                                            <span>+ Keranjang</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => handleBeliLangsung(e, item)}
                                            disabled={item.stok === 0}
                                            className="flex-1 py-2 px-1 rounded-lg btn-orange-gradient text-[10px] md:text-[11px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            title="Beli Langsung"
                                        >
                                            <ShoppingBag className="size-3.5 flex-shrink-0" />
                                            <span>Beli</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Empty state jika tidak ada produk ditemukan */}
                        {filteredProduk?.length === 0 && (
                            <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-24 gap-3">
                                <Search className="size-12 text-slate-400" />
                                <p className="text-slate-700 font-bold">Produk tidak ditemukan</p>
                                <p className="text-sm text-slate-500">Coba kata kunci lain atau hapus filter yang aktif</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Pop Up Modal Pembelian Lensa */}
                {showPurchaseModal && selectedProduk && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
                        <div className="bg-white/95 backdrop-blur-md border border-white/60 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 flex flex-col gap-6 scale-100 transition-all duration-300">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                <h3 className="text-xl font-bold text-slate-900">Pilihan Pembelian</h3>
                                <button 
                                    onClick={() => setShowPurchaseModal(false)}
                                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100/50"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Product Info Card */}
                            <div className="flex gap-4 p-3 bg-white/50 rounded-2xl border border-white/40 items-center">
                                <img 
                                    src={selectedProduk.gambar ? `/images/produk/${encodeURIComponent(selectedProduk.gambar)}` : '/images/placeholder.png'} 
                                    alt={selectedProduk.nama_produk} 
                                    className="w-16 h-16 object-contain rounded-lg bg-white p-1"
                                    style={{ mixBlendMode: 'multiply' }}
                                    onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
                                />
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">{selectedProduk.nama_produk}</h4>
                                    <p className="text-[#f28b27] font-bold text-sm">Rp {Number(selectedProduk.harga_produk).toLocaleString('id-ID')}</p>
                                </div>
                            </div>

                            {/* Option Frame Saja / Frame + Lensa */}
                            <div>
                                <span className="block text-sm font-semibold text-slate-700 mb-2">Tipe Pembelian</span>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPurchaseType('Frame Saja')}
                                        className={`py-3 px-4 rounded-2xl border-2 font-bold text-sm transition-all text-center flex flex-col items-center justify-center gap-1 ${
                                            purchaseType === 'Frame Saja'
                                                ? 'border-[#3668b5] bg-[#3668b5]/5 text-[#3668b5]'
                                                : 'border-slate-200 bg-white/50 text-slate-600 hover:border-slate-300'
                                        }`}
                                    >
                                        <span>Frame Saja</span>
                                        <span className="text-[10px] opacity-75 font-normal">Hanya bingkai kacamata</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPurchaseType('Frame + Lensa')}
                                        className={`py-3 px-4 rounded-2xl border-2 font-bold text-sm transition-all text-center flex flex-col items-center justify-center gap-1 ${
                                            purchaseType === 'Frame + Lensa'
                                                ? 'border-[#3668b5] bg-[#3668b5]/5 text-[#3668b5]'
                                                : 'border-slate-200 bg-white/50 text-slate-600 hover:border-slate-300'
                                        }`}
                                    >
                                        <span>Frame + Lensa</span>
                                        <span className="text-[10px] opacity-75 font-normal">Termasuk lensa kustom</span>
                                    </button>
                                </div>
                            </div>

                            {/* Lens Option Details */}
                            {purchaseType === 'Frame + Lensa' && (
                                <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                    <h5 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">Ukuran & Tipe Lensa</h5>
                                    
                                    {/* Right Eye (OD) */}
                                    <div>
                                        <span className="block text-xs font-bold text-[#3668b5] uppercase tracking-wider mb-2">Mata Kanan (OD)</span>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Tipe</label>
                                                <select 
                                                    value={lensOdType} 
                                                    onChange={(e) => setLensOdType(e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#3668b5]"
                                                >
                                                    <option value="Minus">Minus</option>
                                                    <option value="Plus">Plus</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Ukuran (SPH)</label>
                                                <select 
                                                    value={lensOdValue} 
                                                    onChange={(e) => setLensOdValue(Number(e.target.value))}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#3668b5]"
                                                >
                                                    {lensValues.map(v => (
                                                        <option key={v} value={v}>{v.toFixed(2)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Silinder (CYL)</label>
                                                <select 
                                                    value={lensOdCyl} 
                                                    onChange={(e) => setLensOdCyl(Number(e.target.value))}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#3668b5]"
                                                >
                                                    {cylinderValues.map(v => (
                                                        <option key={v} value={v}>{v.toFixed(2)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Left Eye (OS) */}
                                    <div className="mt-2">
                                        <span className="block text-xs font-bold text-[#3668b5] uppercase tracking-wider mb-2">Mata Kiri (OS)</span>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Tipe</label>
                                                <select 
                                                    value={lensOsType} 
                                                    onChange={(e) => setLensOsType(e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#3668b5]"
                                                >
                                                    <option value="Minus">Minus</option>
                                                    <option value="Plus">Plus</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Ukuran (SPH)</label>
                                                <select 
                                                    value={lensOsValue} 
                                                    onChange={(e) => setLensOsValue(Number(e.target.value))}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#3668b5]"
                                                >
                                                    {lensValues.map(v => (
                                                        <option key={v} value={v}>{v.toFixed(2)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Silinder (CYL)</label>
                                                <select 
                                                    value={lensOsCyl} 
                                                    onChange={(e) => setLensOsCyl(Number(e.target.value))}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#3668b5]"
                                                >
                                                    {cylinderValues.map(v => (
                                                        <option key={v} value={v}>{v.toFixed(2)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fitur Tambahan */}
                                    <div className="border-t border-slate-200 pt-3 flex flex-col gap-2 mt-1">
                                        <span className="block text-xs font-bold text-slate-700">Fitur Tambahan Lensa</span>
                                        <div className="flex flex-col gap-2">
                                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={antiRadiasi} 
                                                    onChange={(e) => setAntiRadiasi(e.target.checked)}
                                                    className="rounded border-slate-300 text-[#3668b5] focus:ring-[#3668b5] w-4 h-4"
                                                />
                                                <span>Anti Radiasi (+Rp {Number(hargaAntiRadiasi).toLocaleString('id-ID')})</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={photochromic} 
                                                    onChange={(e) => setPhotochromic(e.target.checked)}
                                                    className="rounded border-slate-300 text-[#3668b5] focus:ring-[#3668b5] w-4 h-4"
                                                />
                                                <span>Photochromic (+Rp {Number(hargaPhotochromic).toLocaleString('id-ID')})</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Price Breakdown & Total */}
                            <div className="border-t border-slate-200 pt-4 flex flex-col gap-2">
                                <h5 className="font-bold text-slate-800 text-sm">Rincian Harga</h5>
                                <div className="flex justify-between text-xs text-slate-600 font-semibold">
                                    <span>Harga Bingkai:</span>
                                    <span>Rp {Number(selectedProduk.harga_produk).toLocaleString('id-ID')}</span>
                                </div>
                                {purchaseType === 'Frame + Lensa' && (
                                    <>
                                        {(lensOdValue > 0 || lensOdCyl > 0) && (
                                            <div className="flex justify-between text-xs text-slate-600 font-semibold">
                                                <span>Lensa Kanan (OD):</span>
                                                <span>Rp {Number(odPrice).toLocaleString('id-ID')}</span>
                                            </div>
                                        )}
                                        {(lensOsValue > 0 || lensOsCyl > 0) && (
                                            <div className="flex justify-between text-xs text-slate-600 font-semibold">
                                                <span>Lensa Kiri (OS):</span>
                                                <span>Rp {Number(osPrice).toLocaleString('id-ID')}</span>
                                            </div>
                                        )}
                                        {antiRadiasi && (
                                            <div className="flex justify-between text-xs text-slate-600 font-semibold">
                                                <span>Anti Radiasi:</span>
                                                <span>Rp {Number(hargaAntiRadiasi).toLocaleString('id-ID')}</span>
                                            </div>
                                        )}
                                        {photochromic && (
                                            <div className="flex justify-between text-xs text-slate-600 font-semibold">
                                                <span>Photochromic:</span>
                                                <span>Rp {Number(hargaPhotochromic).toLocaleString('id-ID')}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                                <div className="flex justify-between items-center text-slate-900 border-t border-slate-200 pt-2 mt-1">
                                    <span className="font-bold text-sm">Total:</span>
                                    <span className="font-bold text-lg text-[#f28b27]">Rp {calculateTotalPrice().toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            {/* Confirm Actions */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowPurchaseModal(false)}
                                    className="flex-1 py-3 border border-slate-300 rounded-full font-bold text-sm text-slate-600 hover:bg-slate-100 transition-colors text-center cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmPurchase}
                                    className="flex-1 py-3 rounded-full btn-orange-gradient text-white font-bold text-sm text-center cursor-pointer shadow-lg shadow-orange-500/20"
                                >
                                    {purchaseAction === 'buy' ? 'Beli Sekarang' : 'Masukkan Keranjang'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
