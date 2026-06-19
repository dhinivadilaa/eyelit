import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Bell, BookOpen, LayoutGrid, LogOut, Minus, Plus, Settings, ShoppingBag, ShoppingCart, Trash2, User, MessageCircle } from 'lucide-react';
import { useRef, useState } from 'react';

interface KeranjangItem {
    id: number;
    produk_id: number;
    nama_produk: string;
    merek: string;
    gambar: string;
    harga_produk: number;
    stok: number;
    jumlah: number;
    tipe_pembelian: string;
    jenis_lensa_od: string | null;
    nilai_lensa_od: number | null;
    silinder_od: number | null;
    jenis_lensa_os: string | null;
    nilai_lensa_os: number | null;
    silinder_os: number | null;
    anti_radiasi: boolean;
    photochromic: boolean;
    harga_lensa: number;
    subtotal: number;
}

export default function Keranjang() {
    const { auth, keranjang, total } = usePage().props as any;
    const items: KeranjangItem[] = keranjang || [];

    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const userDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const notifications: any[] = auth.user?.notifications || [];
    const unreadNotificationsCount = notifications.filter((n: any) => !n.dibaca).length;

    function updateJumlah(id: number, jumlah: number) {
        if (jumlah < 1) return;
        router.patch(`/keranjang/${id}`, { jumlah }, { preserveScroll: true });
    }

    function hapusItem(id: number) {
        router.delete(`/keranjang/${id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Keranjang - EyeLit" />
            <div className="min-h-screen bg-eyelit-theme">
                {/* Navbar */}
                <nav className="relative z-50 border-b" style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(54,104,181,0.95)', backdropFilter: 'blur(12px)' }}>
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-4">
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <img src="/images/logo/AuthMobile.svg" alt="EyeLit Logo" className="h-10 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold text-white">EyeLit</span>
                        </Link>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Link href="/katalog" className="p-2 rounded-full" style={{ color: '#ffffff' }}>
                                <BookOpen className="size-5" />
                            </Link>

                            {auth.user && (
                                <Link
                                    href="/notifications"
                                    className="p-2 rounded-full relative"
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
                                <Link href="/keranjang" className="p-2 rounded-full relative" style={{ color: '#ffffff' }}>
                                    <ShoppingCart className="size-5" />
                                    {items.length > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f28b27] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {items.length}
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
                                        <button className="p-2 rounded-full" style={{ color: '#ffffff' }}>
                                            <User className="size-5" />
                                        </button>
                                        {showUserDropdown && (
                                            <div className="dropdown-menu show" style={{ top: '64px', right: '24px' }}
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
                                                        <Link href="/dashboard" className="dropdown-item" style={{ color: '#2264c0', fontWeight: 600 }}>
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
                                    <Link href="/login" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">Masuk</Link>
                                    <Link href="/register" className="px-4 py-2 text-sm font-medium btn-orange-gradient rounded-full transition-colors shadow-lg">Daftar</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Breadcrumb */}
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-white font-medium">Keranjang</span>
                    </div>
                </div>

                {/* Konten */}
                <main className="mx-auto max-w-7xl px-4 pb-16">
                    <Link href="/katalog" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="size-4" />
                        Lanjut Belanja
                    </Link>

                    <h1 className="text-2xl font-bold text-white mb-6">Keranjang Belanja</h1>

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-800">
                            <ShoppingCart className="size-16 text-slate-800/40" />
                            <p className="text-lg font-semibold text-slate-800">Keranjangmu masih kosong</p>
                            <Link href="/katalog" className="px-6 py-2 btn-orange-gradient rounded-full text-sm font-semibold transition-colors">
                                Mulai Belanja
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Daftar Item */}
                            <div className="lg:col-span-2 flex flex-col gap-4">
                                {items.map((item) => (
                                    <div key={item.id} className="card-glass-light rounded-xl border p-4 flex gap-4 shadow-lg">
                                        <Link href={`/produk/${item.produk_id}`} className="flex-shrink-0 bg-white/40 p-2 rounded-lg">
                                            <img
                                                src={`/images/produk/${item.gambar}`}
                                                alt={item.nama_produk}
                                                className="w-24 h-24 object-contain rounded-lg"
                                                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                                            />
                                        </Link>

                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-xs text-blue-700 font-semibold">{item.merek}</p>
                                                    <Link href={`/produk/${item.produk_id}`} className="text-sm font-semibold text-slate-800 hover:text-blue-700 transition-colors">
                                                        {item.nama_produk}
                                                    </Link>
                                                    <p className="text-xs text-slate-500 mt-0.5">{item.tipe_pembelian}</p>
                                                </div>
                                                <button
                                                    onClick={() => hapusItem(item.id)}
                                                    className="p-1.5 rounded-full hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors flex-shrink-0"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>

                                            {item.tipe_pembelian === 'Frame + Lensa' && (
                                                <div className="text-xs text-slate-600 bg-white/40 border border-white/50 rounded-lg px-3 py-2 space-y-0.5">
                                                    {item.jenis_lensa_od && <p>OD: {item.jenis_lensa_od} {item.nilai_lensa_od}{item.silinder_od ? ` / Sil ${item.silinder_od}` : ''}</p>}
                                                    {item.jenis_lensa_os && <p>OS: {item.jenis_lensa_os} {item.nilai_lensa_os}{item.silinder_os ? ` / Sil ${item.silinder_os}` : ''}</p>}
                                                    {item.anti_radiasi && <p>+ Anti Radiasi</p>}
                                                    {item.photochromic && <p>+ Photochromic</p>}
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateJumlah(item.id, item.jumlah - 1)}
                                                        disabled={item.jumlah <= 1}
                                                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <Minus className="size-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-semibold text-slate-800">{item.jumlah}</span>
                                                    <button
                                                        onClick={() => updateJumlah(item.id, item.jumlah + 1)}
                                                        disabled={item.jumlah >= item.stok}
                                                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <Plus className="size-3" />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-bold text-blue-700">
                                                    Rp {item.subtotal.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Ringkasan */}
                            <div className="lg:col-span-1">
                                <div className="card-glass-light rounded-xl border p-5 sticky top-6 shadow-xl">
                                    <h2 className="text-base font-semibold text-slate-800 mb-4">Ringkasan Belanja</h2>
                                    <div className="flex flex-col gap-3 text-sm">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between text-slate-600">
                                                <span className="truncate max-w-[160px]">{item.nama_produk} ×{item.jumlah}</span>
                                                <span>Rp {item.subtotal.toLocaleString('id-ID')}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-slate-300 pt-3 flex justify-between font-bold text-slate-800">
                                            <span>Total</span>
                                            <span className="text-blue-700">Rp {(total as number).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => router.visit('/checkout')} className="mt-5 w-full py-3 btn-orange-gradient rounded-full font-semibold text-sm transition-colors shadow-lg">
                                        Lanjut ke Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
