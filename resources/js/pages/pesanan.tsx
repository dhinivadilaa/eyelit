import { Head, Link, usePage } from '@inertiajs/react';
import { Bell, BookOpen, ClipboardList, LayoutGrid, LogOut, Package, Settings, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useRef, useState } from 'react';

const safe = (v: any) => (v ?? "").toString().trim();

interface DetailPesanan {
    id: number;
    produk?: { nama_produk: string; gambar: string; merek: string };
    jumlah: number;
    subtotal: number;
}

interface Pesanan {
    id: number;
    no_pesanan: string;
    status_pesanan: string;
    metode_pembayaran: string;
    tanggal_pemesanan: string;
    total_harga: number;
    ongkos_kirim: number;
    ekspedisi?: { nama_ekspedisi: string };
    detail_pesanan: DetailPesanan[];
}

const STATUS_COLOR: Record<string, string> = {
    'Menunggu Konfirmasi Pembayaran': 'bg-amber-50 border border-amber-200 text-amber-600',
    'Dikemas':                        'bg-blue-50 border border-blue-200 text-blue-600',
    'Dikirim':                        'bg-indigo-50 border border-indigo-200 text-indigo-600',
    'Pesanan Tiba di Tujuan':         'bg-purple-50 border border-purple-200 text-purple-600',
    'Selesai':                        'bg-emerald-50 border border-emerald-200 text-emerald-600',
    'Dibatalkan':                     'bg-red-50 border border-red-200 text-red-600',
};

const STATUS_TABS = ['Semua', 'Menunggu Konfirmasi Pembayaran', 'Dikemas', 'Dikirim', 'Selesai', 'Dibatalkan'];

export default function Pesanan() {
    const { auth, pesanan } = usePage().props as any;

    console.log("DATA PESANAN:", pesanan);

    const items: Pesanan[] = Array.isArray(pesanan) ? pesanan : [];
    const keranjangCount: number = auth.keranjang_count || 0;

    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState('Semua');
    const userDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifications: any[] = auth.user?.notifications || [];
    const unreadNotificationsCount = notifications.filter((n: any) => !n.dibaca).length;

    const filtered = activeTab === 'Semua' ? items : items.filter(p => safe(p.status_pesanan) === activeTab);

    function formatTanggal(val: string | null | undefined) {
        if (!val) return '-';
        const d = new Date(val);
        if (isNaN(d.getTime())) return '-';
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    return (
        <>
            <Head title="Pesanan Saya - EyeLit" />
            <div className="min-h-screen animate-fade-in bg-eyelit-theme">
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
                                        <button className="p-2 rounded-full" style={{ color: '#ffffff' }}><User className="size-5" /></button>
                                        {showUserDropdown && (
                                            <div className="dropdown-menu show" style={{ top: '64px', right: '24px' }}
                                                onMouseEnter={() => { if (userDropdownTimer.current) clearTimeout(userDropdownTimer.current); }}
                                                onMouseLeave={() => { userDropdownTimer.current = setTimeout(() => setShowUserDropdown(false), 100); }}
                                            >
                                                <div className="dropdown-header">
                                                    <div className="dropdown-avatar">{auth.user?.username?.charAt(0).toUpperCase()}</div>
                                                    <div className="dropdown-user-info">
                                                        <span className="dropdown-user-name text-[#e8f0fe]">{auth.user?.username}</span>
                                                        <span className="dropdown-user-email text-[#7aa3e0]">{auth.user?.email}</span>
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
                        </div>
                    </div>
                </nav>

                {/* Breadcrumb */}
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-white font-medium">Pesanan Saya</span>
                    </div>
                </div>

                <main className="mx-auto max-w-7xl px-4 pb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="size-6 text-white" />
                        <h1 className="text-2xl font-bold text-white">Pesanan Saya</h1>
                    </div>

                    {/* Tabs */}
                    <div className="card-glass-light flex gap-1 overflow-x-auto mb-6 p-1 rounded-xl border">
                        {STATUS_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                                    activeTab === tab
                                        ? 'btn-orange-gradient text-white shadow'
                                        : 'text-slate-600 hover:bg-white/30 hover:text-slate-800'
                                }`}
                            >
                                {tab}
                                {tab !== 'Semua' && (
                                    <span className="ml-1.5 opacity-80">
                                        ({items.filter(p => safe(p.status_pesanan) === tab).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* List Pesanan */}
                    {filtered.length === 0 ? (
                        <div className="card-glass-light rounded-xl border py-16 flex flex-col items-center gap-3 shadow-lg">
                            <Package className="size-12 text-slate-400" />
                            <p className="text-sm font-semibold text-slate-600">Belum ada pesanan</p>
                            <Link href="/katalog" className="mt-2 px-5 py-2.5 btn-orange-gradient rounded-full text-sm font-semibold transition-colors shadow-lg">
                                Mulai Belanja
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filtered.map((p: any) => {
                                const firstItem = p.detail_pesanan?.[0];
                                const extraCount = (p.detail_pesanan?.length ?? 0) - 1;
                                const gambarSrc = firstItem?.produk?.gambar
                                    ? `/images/produk/${firstItem.produk.gambar}`
                                    : '/images/placeholder.png';
                                return (
                                    <Link
                                        key={p.id}
                                        href={`/pesanan/${p.id}`}
                                        className="card-glass-light rounded-xl border p-5 hover:border-blue-400 hover:shadow-md transition-all block shadow-sm"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono font-bold text-slate-800">
                                                    {safe(p.no_pesanan)}
                                                </span>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[safe(p.status_pesanan)] ?? 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                                    {safe(p.status_pesanan) || '-'}
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-500">{formatTanggal(p.tanggal_pemesanan)}</span>
                                        </div>

                                        {/* Produk preview */}
                                        <div className="flex items-center gap-4 mb-4">
                                            {firstItem && (
                                                <img
                                                    src={gambarSrc}
                                                    alt={safe(firstItem.produk?.nama_produk)}
                                                    className="w-16 h-16 object-contain rounded-lg bg-white/40 p-1 flex-shrink-0 border border-slate-200"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-blue-700 font-semibold">{safe(firstItem?.produk?.merek)}</p>
                                                <p className="text-sm font-semibold text-slate-800 truncate">{safe(firstItem?.produk?.nama_produk)}</p>
                                                <p className="text-xs text-slate-500">×{firstItem?.jumlah}</p>
                                                {extraCount > 0 && (
                                                    <p className="text-xs text-slate-500 mt-0.5">+{extraCount} produk lainnya</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                            <div className="text-xs text-slate-500">
                                                <span className="font-semibold text-slate-700">{safe(p.ekspedisi?.nama_ekspedisi) || '-'}</span>
                                                <span className="mx-1.5">·</span>
                                                <span>{safe(p.metode_pembayaran) || '-'}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-slate-500">Total</p>
                                                <p className="text-sm font-bold text-blue-700">
                                                    Rp {Number(p.total_harga ?? (p.detail_pesanan?.reduce((s: number, d: any) => s + d.subtotal, 0) ?? 0) + (p.ongkos_kirim ?? 0)).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
