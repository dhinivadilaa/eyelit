import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Bell, BookOpen, LayoutGrid, LogOut, Settings, ShoppingBag, ShoppingCart, Star, User, MessageSquare, Plus, X, Check, Glasses } from 'lucide-react';
import { useRef, useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';

export default function ProdukDetail() {
    const { auth, produk, lensa, ratingData, totalTerjual, ulasans, userCanReview, userAlreadyReviewed } = usePage().props as any;

    const ulasanList = ulasans || [];
    const totalUlasan = ulasanList.length;
    const averageRating = ratingData?.avg_rating || null;
    const keranjangCount: number = auth.keranjang_count || 0;

    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [cartHover, setCartHover] = useState(false);
    const [chatHover, setChatHover] = useState(false);

    const userDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const notifications: any[] = auth.user?.notifications || [];
    const unreadNotificationsCount = notifications.filter((n: any) => !n.dibaca).length;

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const productImages = [
        produk.gambar ? `/images/produk/${encodeURIComponent(produk.gambar)}` : '/images/placeholder.png',
        produk.gambar_2 ? `/images/produk/${encodeURIComponent(produk.gambar_2)}` : '/images/placeholder.png',
        produk.gambar_3 ? `/images/produk/${encodeURIComponent(produk.gambar_3)}` : '/images/placeholder.png',
        produk.gambar_4 ? `/images/produk/${encodeURIComponent(produk.gambar_4)}` : '/images/placeholder.png',
        produk.gambar_5 ? `/images/produk/${encodeURIComponent(produk.gambar_5)}` : '/images/placeholder.png'
    ];

    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
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

    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [showReviewOverlay, setShowReviewOverlay] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [editingReview, setEditingReview] = useState<any>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const allProduk: any[] = (usePage().props as any).allProduk || [];
    const searchSuggestions = searchQuery.trim()
        ? allProduk.filter((p: any) => p.nama_produk?.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
        : [];

    const lensValues = Array.from({ length: 41 }, (_, i) => i * 0.25); // 0.00 to 10.00
    const cylinderValues = Array.from({ length: 17 }, (_, i) => i * 0.25); // 0.00 to 4.00

    // Flash notification handler
    const page = usePage();
    const flash = (page.props as any).flash;
    const prevFlash = useRef<string | null>(null);
    useEffect(() => {
        const msg = flash?.success || flash?.error;
        if (msg && msg !== prevFlash.current) {
            prevFlash.current = msg;
            if (flash.success) {
                toast.success(flash.success);
            } else if (flash.error) {
                toast.error(flash.error);
            }
        }
    }, [flash]);

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
        let total = Number(produk.harga_produk ?? 0);
        if (purchaseType === 'Frame + Lensa') {
            total += odPrice;
            total += osPrice;
            total += Number(hargaAntiRadiasi);
            total += Number(hargaPhotochromic);
        }
        return total;
    };

    const filteredUlasans = useMemo(() => {
        if (selectedRating === null) return ulasanList;
        return ulasanList.filter((u: any) => u.rating === selectedRating);
    }, [ulasanList, selectedRating]);

    function openPurchaseModal(action: 'cart' | 'buy') {
        if (!auth.user) {
            router.visit('/login');
            return;
        }
        setPurchaseAction(action);
        setShowPurchaseModal(true);
    }

    function handleConfirmPurchase() {
        if (purchaseType === 'Frame + Lensa' && (lensOdValue === 0 && lensOsValue === 0)) {
            toast.error('Mohon pilih ukuran lensa untuk mata kanan (OD) atau mata kiri (OS)');
            return;
        }

        const payload = {
            produk_id: produk.id,
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
    }

    const handleSendReview = () => {
        if (reviewRating === 0) {
            toast.error('Pilih rating terlebih dahulu');
            return;
        }
        if (editingReview) {
            router.put(`/ulasan/${editingReview.id}`, {
                rating: reviewRating,
                komentar: reviewComment,
            }, {
                onSuccess: () => {
                    setShowReviewOverlay(false);
                    toast.success('Ulasan berhasil diperbarui');
                    setEditingReview(null);
                },
            });
        } else {
            router.post('/ulasan', {
                produk_id: produk.id,
                rating: reviewRating,
                komentar: reviewComment,
            }, {
                onSuccess: () => {
                    setShowReviewOverlay(false);
                    toast.success('Ulasan berhasil ditambahkan');
                },
            });
        }
    };

    const details = [
        { label: 'Merek', value: produk.merek },
        { label: 'Tipe Produk', value: produk.tipe_produk },
        { label: 'Jenis Kelamin', value: produk.jenis_kelamin },
        { label: 'Warna', value: produk.warna },
        { label: 'Material', value: produk.material },
        { label: 'Bentuk', value: produk.bentuk },
        { label: 'Bridge', value: produk.bridge },
        { label: 'Diagonal', value: produk.diagonal },
        { label: 'Ukuran', value: produk.ukuran },
        { label: 'Stok', value: produk.stok > 0 ? `${produk.stok} unit` : 'Habis' },
    ].filter((d) => d.value);

    return (
        <>
            <Head title={`${produk.nama_produk ?? 'Produk'} - EyeLit`} />
            <div className="min-h-screen bg-eyelit-theme">
                {/* Navbar */}
                <nav className="relative z-50 border-b" style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(54,104,181,0.95)', backdropFilter: 'blur(12px)' }}>
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-4">
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <img src="/images/logo/AuthMobile.svg" alt="EyeLit Logo" className="h-10 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold text-white">EyeLit</span>
                        </Link>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-lg ml-6 max-[439px]:hidden">
                            <div className="relative">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    spellCheck={false}
                                    placeholder="Cari produk kacamata..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    className="w-full h-9 pl-4 pr-12 rounded-full border border-white/30 bg-white/10 text-sm text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:border-white focus:ring-1 focus:ring-white"
                                />
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {showSuggestions && searchSuggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50">
                                        {searchSuggestions.map((item: any, idx: number) => (
                                            <Link key={idx} href={`/produk/${item.id}`} onClick={() => setShowSuggestions(false)} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 last:border-b-0">
                                                <img src={`/images/produk/${item.gambar}`} alt={item.nama_produk} className="w-10 h-10 rounded-lg object-cover bg-white" style={{ mixBlendMode: 'multiply' }} onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-800 truncate">{item.nama_produk}</p>
                                                    <p className="text-xs text-slate-500">{item.merek}</p>
                                                </div>
                                                <span className="text-sm font-bold text-[#f28b27]">Rp {(Number(item.harga_produk) || 0).toLocaleString('id-ID')}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Link href="/katalog" className="p-2 rounded-full hover:bg-white/10" style={{ color: '#ffffff' }}>
                                <BookOpen className="size-5" />
                            </Link>

                            {auth.user && (
                                <Link
                                    href="/notifications"
                                    className="p-2 rounded-full hover:bg-white/10 relative"
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

                            {auth.user && (
                                <Link href="/keranjang" className="p-2 rounded-full hover:bg-white/10 relative" style={{ color: '#ffffff' }}>
                                    <ShoppingCart className="size-5" />
                                    {keranjangCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f28b27] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {keranjangCount}
                                        </span>
                                    )}
                                </Link>
                            )}

                            {auth.user && (
                                <div className="relative h-full flex items-center">
                                    <div
                                        onMouseEnter={() => { if (userDropdownTimer.current) clearTimeout(userDropdownTimer.current); setShowUserDropdown(true); }}
                                        onMouseLeave={() => { userDropdownTimer.current = setTimeout(() => setShowUserDropdown(false), 100); }}
                                    >
                                        <button className="p-2 rounded-full hover:bg-white/10" style={{ color: '#ffffff' }}>
                                            <User className="size-5" />
                                        </button>
                                        {showUserDropdown && (
                                            <div
                                                className="dropdown-menu show shadow-xl"
                                                style={{ top: '64px', right: '24px' }}
                                                onMouseEnter={() => { if (userDropdownTimer.current) clearTimeout(userDropdownTimer.current); }}
                                                onMouseLeave={() => { userDropdownTimer.current = setTimeout(() => setShowUserDropdown(false), 100); }}
                                            >
                                                <div className="dropdown-header">
                                                    <div className="dropdown-avatar">{auth.user?.username?.charAt(0).toUpperCase()}</div>
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
                                                    <Link href="/pesanan" className="dropdown-item"><ShoppingBag className="size-5" />Pembelian</Link>
                                                    <Link href="/user/profile" className="dropdown-item"><Settings className="size-5" />Pengaturan</Link>
                                                    <form method="POST" action="/logout">
                                                        <input type="hidden" name="_token" value={auth.csrf} />
                                                        <button type="submit" className="dropdown-item logout w-full text-left"><LogOut className="size-5" />Keluar Akun</button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {!auth.user && (
                                <div className="flex items-center gap-2">
                                    <Link href="/login" className="px-4 py-2 text-sm font-semibold text-white hover:text-[#fde9cb] transition-colors">Masuk</Link>
                                    <Link href="/register" className="px-5 py-2 text-sm font-bold btn-orange-gradient rounded-full">Daftar</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Breadcrumb */}
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-800">
                        <Link href="/" className="hover:text-[#3668b5] transition-colors">Beranda</Link>
                        <span>/</span>
                        <Link href="/katalog" className="hover:text-[#3668b5] transition-colors">Katalog</Link>
                        <span>/</span>
                        <span className="text-slate-900 font-bold truncate max-w-xs">{produk.nama_produk ?? 'Produk'}</span>
                    </div>
                </div>

                {/* Detail Produk */}
                <main className="mx-auto max-w-7xl px-4 pb-16">
                    <Link href="/katalog" className="inline-flex items-center gap-2 text-sm text-[#3668b5] hover:text-[#f28b27] font-semibold transition-colors mb-6">
                        <ArrowLeft className="size-4" />
                        Kembali ke Katalog
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Gambar Produk dengan Gallery 5 Gambar */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-center rounded-2xl p-8 shadow-md bg-white border border-slate-200 aspect-[4/3] relative overflow-hidden min-h-[320px]">
                                <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                                    {activeImageIndex === 1 ? (
                                        /* 3D Perspective simulation */
                                        <img
                                            src={productImages[activeImageIndex]}
                                            alt={produk.nama_produk ?? 'Produk'}
                                            className="max-h-80 w-full object-contain"
                                            style={{
                                                transform: 'perspective(800px) rotateY(-25deg) rotateX(10deg) rotateZ(-2deg) scale(1.05)',
                                                filter: 'drop-shadow(10px 15px 12px rgba(0,0,0,0.15))',
                                                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s',
                                                mixBlendMode: 'multiply'
                                            }}
                                            onError={(e) => { (e.currentTarget.src = '/images/placeholder.png'); }}
                                        />
                                    ) : activeImageIndex === 2 ? (
                                        /* Macro zoomed-in view */
                                        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-white">
                                            <img
                                                src={productImages[activeImageIndex]}
                                                alt={produk.nama_produk ?? 'Produk'}
                                                className="w-full h-full object-cover"
                                                style={{
                                                    transform: 'scale(1.8) translate(0px, 0px)',
                                                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    mixBlendMode: 'multiply'
                                                }}
                                                onError={(e) => { (e.currentTarget.src = '/images/placeholder.png'); }}
                                            />
                                        </div>
                                    ) : (
                                        /* Normal view for index 0, 3, 4 */
                                        <img
                                            src={productImages[activeImageIndex]}
                                            alt={produk.nama_produk ?? 'Produk'}
                                            className="max-h-80 w-full object-contain transition-all duration-500 hover:scale-105"
                                            style={{
                                                filter: 'drop-shadow(4px 6px 8px rgba(0,0,0,0.08))',
                                                mixBlendMode: 'multiply'
                                            }}
                                            onError={(e) => { (e.currentTarget.src = '/images/placeholder.png'); }}
                                        />
                                    )}
                                </div>
                                
                                {/* Caption Overlay */}
                                <div className="absolute bottom-3 right-3 bg-slate-950/70 text-xs text-white px-3 py-1 rounded-full backdrop-blur-md font-medium">
                                    {activeImageIndex === 0 && "Tampilan Utama"}
                                    {activeImageIndex === 1 && "Simulasi Perspektif 3D"}
                                    {activeImageIndex === 2 && "Detail Zoom Makro"}
                                    {activeImageIndex === 3 && "Premium EyeLit Case"}
                                    {activeImageIndex === 4 && "Panduan Dimensi Frame"}
                                </div>
                            </div>
                            
                            {/* Thumbnails */}
                            <div className="grid grid-cols-5 gap-2">
                                {productImages.map((imgUrl, idx) => {
                                    let label = "";
                                    let inlineStyle: React.CSSProperties = {};
                                    if (idx === 0) label = "Utama";
                                    else if (idx === 1) {
                                        label = "Simulasi 3D";
                                        inlineStyle = { transform: 'perspective(100px) rotateY(-15deg) rotateX(5deg)' };
                                    } else if (idx === 2) {
                                        label = "Macro Zoom";
                                        inlineStyle = { transform: 'scale(1.3)', objectFit: 'cover' };
                                    } else if (idx === 3) label = "Premium Case";
                                    else if (idx === 4) label = "Dimensi";
 
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative aspect-square rounded-xl overflow-hidden border-2 p-1 bg-white transition-all hover:scale-105 ${
                                                activeImageIndex === idx
                                                    ? 'border-[#3668b5] ring-2 ring-[#3668b5]/20 shadow-md'
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
                                                <img
                                                    src={imgUrl}
                                                    alt={label}
                                                    className="w-full h-full object-contain"
                                                    style={{
                                                        ...inlineStyle,
                                                        mixBlendMode: 'multiply'
                                                    }}
                                                    onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
                                                />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/60 text-[9px] text-white py-0.5 text-center truncate px-1 font-semibold">
                                                {label}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Info Produk */}
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-sm font-bold text-[#3668b5] uppercase tracking-wide">{produk.merek ?? '-'}</p>
                                <h1 className="text-2xl font-bold text-slate-900 mt-1">{produk.nama_produk ?? 'Nama tidak tersedia'}</h1>
                                {averageRating && (
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`size-4 ${
                                                        star <= Math.round(Number(averageRating))
                                                            ? 'text-amber-400 fill-amber-400'
                                                            : 'text-slate-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{Number(averageRating).toFixed(1)}</span>
                                        <span className="text-xs text-slate-500">({totalUlasan} ulasan)</span>
                                    </div>
                                )}
                                <p className="text-3xl font-bold text-[#f28b27] mt-3">
                                    Rp {(Number(produk.harga_produk ?? 0) || 0).toLocaleString('id-ID')}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${produk.stok > 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-300/50' : 'bg-red-100 text-red-800 border-red-300/50'}`}>
                                    {produk.stok > 0 ? 'Tersedia' : 'Stok Habis'}
                                </span>
                                {produk.stok > 0 && (
                                    <span className="text-sm text-slate-600">{produk.stok} unit tersisa</span>
                                )}
                            </div>

                            {/* Spesifikasi */}
                            <div className="rounded-xl overflow-hidden shadow-md card-glass-light border border-white/40">
                                <div className="px-4 py-3 border-b border-slate-200 bg-white/20">
                                    <h2 className="text-sm font-bold text-slate-900">Spesifikasi Produk</h2>
                                </div>
                                <div className="divide-y divide-slate-200/80">
                                    {details.map((d) => (
                                        <div key={d.label} className="flex px-4 py-3 text-sm">
                                            <span className="w-36 text-slate-500 flex-shrink-0">{d.label}</span>
                                            <span className="text-slate-800 font-medium">{d.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    disabled={produk.stok === 0}
                                    onClick={() => openPurchaseModal('buy')}
                                    className="flex-1 py-3 rounded-full btn-orange-gradient font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center text-white"
                                >
                                    Beli Sekarang
                                </button>
                                <button
                                    disabled={produk.stok === 0}
                                    onClick={() => openPurchaseModal('cart')}
                                    onMouseEnter={() => setCartHover(true)}
                                    onMouseLeave={() => setCartHover(false)}
                                    className="flex-1 py-3 rounded-full border border-[#3668b5] text-[#3668b5] font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center shadow-sm transition-colors"
                                    style={{
                                        backgroundColor: cartHover ? 'rgba(54, 104, 181, 0.12)' : '#ffffff',
                                        borderColor: '#3668b5',
                                        color: '#3668b5',
                                        opacity: 1
                                    }}
                                >
                                    + Keranjang
                                </button>
                                <Link
                                    href={`/chat?produk_id=${produk.id}`}
                                    onMouseEnter={() => setChatHover(true)}
                                    onMouseLeave={() => setChatHover(false)}
                                    className="p-3 rounded-full border border-[#3668b5] text-[#3668b5] transition-colors flex items-center justify-center cursor-pointer flex-shrink-0 aspect-square shadow-sm"
                                    style={{
                                        width: '46px',
                                        height: '46px',
                                        backgroundColor: chatHover ? 'rgba(54, 104, 181, 0.12)' : '#ffffff',
                                        borderColor: '#3668b5',
                                        color: '#3668b5',
                                        opacity: 1
                                    }}
                                    title="Tanya Penjual"
                                >
                                    <MessageSquare className="size-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Ulasan Pelanggan Section */}
                    <div className="mt-12 rounded-2xl overflow-hidden shadow-md card-glass-light border border-white/40">
                        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white/20">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Star className="size-5 text-amber-500 fill-amber-500" />
                                Ulasan Pelanggan ({totalUlasan})
                            </h2>
                            <div className="flex items-center gap-2">
                                {averageRating && (
                                    <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                                        <span className="text-sm font-bold text-amber-600">{Number(averageRating).toFixed(1)} / 5.0</span>
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`size-3.5 ${
                                                        star <= Math.round(Number(averageRating))
                                                            ? 'text-amber-500 fill-amber-500'
                                                            : 'text-slate-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {auth.user && userCanReview && !userAlreadyReviewed && (
                                    <button
                                        onClick={() => {
                                            setEditingReview(null);
                                            setReviewRating(0);
                                            setReviewComment('');
                                            setShowReviewOverlay(true);
                                        }}
                                        className="px-4 py-1.5 bg-[#2264c0] text-white text-xs font-bold rounded-full hover:bg-[#1a4f9a] transition-colors"
                                    >
                                        + Tambah Ulasan
                                    </button>
                                )}
                                {auth.user && userAlreadyReviewed && (
                                    <button
                                        onClick={() => {
                                            const myReview = ulasanList.find((u: any) => u.user_id === auth.user.id);
                                            if (myReview) {
                                                setEditingReview(myReview);
                                                setReviewRating(myReview.rating);
                                                setReviewComment(myReview.komentar || '');
                                            }
                                            setShowReviewOverlay(true);
                                        }}
                                        className="px-4 py-1.5 bg-[#2264c0] text-white text-xs font-bold rounded-full hover:bg-[#1a4f9a] transition-colors"
                                    >
                                        Edit Ulasan
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Buttons */}
                        <div className="px-6 pt-4 flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedRating(null)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                    selectedRating === null
                                        ? 'bg-[#3668b5] text-white'
                                        : 'bg-white/40 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                Semua
                            </button>
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = ulasanList.filter((u: any) => u.rating === star).length;
                                return (
                                    <button
                                        key={star}
                                        onClick={() => setSelectedRating(star)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                            selectedRating === star
                                                ? 'bg-[#3668b5] text-white'
                                                : 'bg-white/40 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    >
                                        <Star className={`size-3 ${selectedRating === star ? 'fill-white text-white' : 'text-amber-500 fill-amber-500'}`} />
                                        {star} <span className="text-[10px] opacity-70">({count})</span>
                                    </button>
                                );
                            })}
                        </div>

                        {filteredUlasans.length === 0 ? (
                            <div className="p-10 text-center text-slate-500 flex flex-col items-center gap-3">
                                <Star className="size-10 text-slate-400 stroke-[1.5]" />
                                <p className="text-sm font-medium">Belum ada ulasan untuk rating ini.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-200/50 p-6 space-y-6">
                                {filteredUlasans.map((u: any) => (
                                    <div key={u.id} className="pt-6 first:pt-0 flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[#3668b5]/10 border border-[#3668b5]/20 text-[#3668b5] font-bold text-sm flex items-center justify-center">
                                                    {(u.username || 'P').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">{u.username || 'Pelanggan'}</p>
                                                    <div className="flex items-center gap-0.5 mt-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`size-3 ${
                                                                    star <= u.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-500">
                                                {u.tanggal_ulasan ? new Date(u.tanggal_ulasan).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                }) : '-'}
                                            </span>
                                        </div>
                                        {u.komentar ? (
                                            <p className="text-sm text-slate-700 leading-relaxed pl-10 font-medium">{u.komentar}</p>
                                        ) : (
                                            <p className="text-xs text-slate-500 italic pl-10">Pengguna tidak menulis komentar.</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                {/* Pop Up Modal Pembelian Lensa */}
                {showPurchaseModal && (
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
                                    src={produk.gambar ? `/images/produk/${encodeURIComponent(produk.gambar)}` : '/images/placeholder.png'} 
                                    alt={produk.nama_produk} 
                                    className="w-16 h-16 object-contain rounded-lg bg-white p-1"
                                    style={{ mixBlendMode: 'multiply' }}
                                    onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
                                />
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">{produk.nama_produk}</h4>
                                    <p className="text-[#f28b27] font-bold text-sm">Rp {Number(produk.harga_produk).toLocaleString('id-ID')}</p>
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
                                    <span>Rp {Number(produk.harga_produk).toLocaleString('id-ID')}</span>
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

                {/* Review Overlay Modal */}
                {showReviewOverlay && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
                        <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900">{editingReview ? 'Edit Ulasan' : 'Tambah Ulasan'}</h2>
                                <button
                                    onClick={() => setShowReviewOverlay(false)}
                                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                                >
                                    <X className="size-5 text-slate-500" />
                                </button>
                            </div>
                            <div className="px-6 py-5">
                                <p className="text-sm text-slate-500 mb-4">Berikan rating dan ulasan untuk produk ini:</p>

                                {/* Rating Bintang */}
                                <div className="flex items-center gap-2 mb-4">
                                    <p className="text-sm font-medium text-slate-800 mr-2">Rating:</p>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} onClick={() => setReviewRating(star)} className="focus:outline-none">
                                            <Star
                                                className={`size-7 transition-colors ${
                                                    star <= reviewRating
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-slate-300 hover:text-amber-300'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Komentar */}
                                <div>
                                    <label className="text-sm font-medium text-slate-800 block mb-2">Komentar (opsional)</label>
                                    <textarea
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder="Tulis ulasan Anda secara rinci..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm resize-none focus:outline-none focus:border-[#3668b5]"
                                    />
                                </div>
                            </div>
                            <div className="px-6 pb-6 flex gap-3">
                                <button
                                    onClick={() => setShowReviewOverlay(false)}
                                    className="flex-1 py-3 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSendReview}
                                    className="flex-1 py-3 rounded-full bg-[#3668b5] text-white font-semibold text-sm hover:bg-[#2d589c] transition-colors"
                                >
                                    {editingReview ? 'Simpan Perubahan' : 'Kirim Ulasan'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Navigasi</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Beranda</Link></li>
                                    <li><Link href="/katalog" className="text-sm text-white/60 hover:text-white transition-colors">Katalog</Link></li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Bantuan</h3>
                                <ul className="space-y-3">
                                    <li><Link href="/kebijakan-privasi" className="text-sm text-white/60 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Kontak</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="text-sm text-white/60">Jl. Sudirman No. 123, Jakarta Pusat 10220, Indonesia</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-sm text-white/40">&copy; 2026 EyeLit. Hak cipta dilindungi.</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
