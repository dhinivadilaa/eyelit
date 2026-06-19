import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Bell, BookOpen, LayoutGrid, LogOut, MapPin, Package, Settings, ShoppingBag, ShoppingCart, Star, Truck, User, CheckCircle, XCircle, FileText } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// 🔥 safe helper — aman untuk nilai null/undefined
const safe = (v: any) => (v ?? "").toString().trim();

const STATUS_STEPS = [
    'Menunggu Konfirmasi Pembayaran',
    'Dikemas',
    'Dikirim',
    'Pesanan Tiba di Tujuan',
    'Selesai',
];

const STATUS_COLOR: Record<string, string> = {
    'Menunggu Konfirmasi Pembayaran': 'bg-amber-50 border border-amber-200 text-amber-600',
    'Dikemas':                        'bg-blue-50 border border-blue-200 text-blue-600',
    'Dikirim':                        'bg-indigo-50 border border-indigo-200 text-indigo-600',
    'Pesanan Tiba di Tujuan':         'bg-purple-50 border border-purple-200 text-purple-600',
    'Selesai':                        'bg-emerald-50 border border-emerald-200 text-emerald-600',
    'Dibatalkan':                     'bg-red-50 border border-red-200 text-red-600',
};

export default function PesananDetail() {
    const { auth, pesanan, subtotal_produk, grand_total, xendit_payment_url, xendit_payment_info, ulasan, flash } = usePage().props as any;
    const keranjangCount: number = auth.keranjang_count || 0;
    const ulasanList = ulasan || [];

    const [statusPesanan, setStatusPesanan] = useState(safe(pesanan?.status_pesanan));
    const [copied, setCopied] = useState(false);
    const [simulating, setSimulating] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);

    // Update local state when prop changes
    useEffect(() => {
        if (pesanan) {
            setStatusPesanan(safe(pesanan.status_pesanan));
        }
    }, [pesanan]);

    // Auto-open receipt modal on success payment simulation
    useEffect(() => {
        if (flash?.success && (flash.success.includes('Pembayaran') || flash.success.includes('terkonfirmasi') || flash.success.includes('lunas')) && ['Dikemas', 'Dikirim', 'Pesanan Tiba di Tujuan', 'Selesai'].includes(statusPesanan)) {
            setShowReceiptModal(true);
        }
    }, [flash, statusPesanan]);

    // Polling payment status
    useEffect(() => {
        if (!pesanan || statusPesanan !== 'Menunggu Konfirmasi Pembayaran') return;

        const interval = setInterval(async () => {
            try {
                const response = await fetch(`/pesanan/${pesanan.id}/status-pembayaran`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.status_pesanan && data.status_pesanan !== 'Menunggu Konfirmasi Pembayaran') {
                        clearInterval(interval);
                        router.reload({ preserveScroll: true });
                    }
                }
            } catch (err) {
                console.error("Error polling payment status:", err);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [statusPesanan, pesanan?.id]);

    const handleCopyVa = () => {
        if (xendit_payment_info?.account_number) {
            navigator.clipboard.writeText(xendit_payment_info.account_number);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSimulatePayment = () => {
        if (!pesanan) return;
        setSimulating(true);
        router.post(`/simulasi-pembayaran/${pesanan.no_pesanan}/proses`, {
            status: 'lunas'
        }, {
            preserveScroll: true,
            onFinish: () => setSimulating(false)
        });
    };

    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const userDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifications: any[] = auth.user?.notifications || [];
    const unreadNotificationsCount = notifications.filter((n: any) => !n.dibaca).length;

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState('Salah mengisi detail produk');
    const [customReason, setCustomReason] = useState('');

    const handleConfirmCancel = () => {
        const finalReason = selectedReason === 'Lainnya' ? customReason : selectedReason;
        setShowCancelModal(false);
        router.post(`/pesanan/${pesanan.id}/batalkan`, {
            alasan: finalReason
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedReason('Salah mengisi detail produk');
                setCustomReason('');
            }
        });
    };

    // 🔥 PERBAIKAN UTAMA: guard pesanan undefined + safe status
    if (!pesanan) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-700 bg-eyelit-theme">
                <p>Data pesanan tidak ditemukan.</p>
            </div>
        );
    }

    // 🔥 PERBAIKAN: gunakan safe() agar tidak crash saat status_pesanan undefined
    const currentStep = STATUS_STEPS.indexOf(statusPesanan);

    function formatTanggal(val: string | null) {
        if (!val) return '-';
        const d = new Date(val);
        if (isNaN(d.getTime())) return '-';
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function handleUpdateStatus(status: string) {
        router.patch(`/pesanan/${pesanan.id}/status`, { status }, {
            preserveScroll: true
        });
    }

    return (
        <>
            <Head title={`Pesanan ${safe(pesanan.no_pesanan)} - EyeLit`} />
            <div className="min-h-screen animate-fade-in animate-fade-in-long bg-eyelit-theme">
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
                        <Link href="/pesanan" className="hover:text-white transition-colors">Pesanan Saya</Link>
                        <span>/</span>
                        <span className="text-white font-medium">Detail Pesanan</span>
                    </div>
                </div>

                <main className="mx-auto max-w-7xl px-4 pb-16">
                    <Link href="/pesanan" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="size-4" />
                        Kembali ke Pesanan
                    </Link>

                    {flash?.success && (
                        <div className="mb-6 bg-emerald-600 border border-emerald-500 text-white rounded-xl p-4 text-xs font-semibold flex items-center gap-2 shadow-md animate-fade-in">
                            <CheckCircle className="size-4 text-white flex-shrink-0" />
                            <span>{flash.success}</span>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 bg-red-600 border border-red-500 text-white rounded-xl p-4 text-xs font-semibold flex items-center gap-2 shadow-md animate-fade-in">
                            <XCircle className="size-4 text-white flex-shrink-0" />
                            <span>{flash.error}</span>
                        </div>
                    )}

                    {/* Ucapan Terima Kasih setelah Pembayaran (Status: Dikemas) */}
                    {statusPesanan === 'Dikemas' && (
                        <div className="mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-500/30 rounded-xl p-5 shadow-lg animate-fade-in flex flex-col md:flex-row items-center gap-4 text-white">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 animate-bounce">
                                <CheckCircle className="size-7 text-white" />
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-1">
                                <h3 className="font-bold text-base" style={{ color: '#ffffff' }}>Terima Kasih atas Pembayaran Anda!</h3>
                                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>Pembayaran untuk pesanan <span className="font-mono font-bold" style={{ color: '#fef08a' }}>{pesanan.no_pesanan}</span> telah kami terima. Tim kami sedang mengemas produk kacamata premium Anda. Kami akan segera mengirimkan nomor resi setelah kurir mengambil paket.</p>
                            </div>
                        </div>
                    )}

                    {/* Ucapan Terima Kasih setelah Transaksi Selesai */}
                    {statusPesanan === 'Selesai' && (
                        <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-650 border border-blue-500/30 rounded-xl p-5 shadow-lg animate-fade-in flex flex-col md:flex-row items-center gap-4 text-white">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                <Star className="size-7 text-white fill-white animate-pulse" />
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-1">
                                <h3 className="font-bold text-base" style={{ color: '#ffffff' }}>Transaksi Telah Selesai!</h3>
                                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>Terima kasih banyak telah mempercayakan kebutuhan penglihatan Anda kepada <span className="font-semibold" style={{ color: '#fef08a' }}>EyeLit</span>. Kepuasan Anda adalah prioritas kami. Silakan berikan ulasan Anda di bawah untuk membantu kami terus berkembang.</p>
                            </div>
                        </div>
                    )}

                    {/* Status & Aksi Pesanan */}
                    <div className="mb-6 card-glass-light rounded-xl border p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
                        <div>
                            <p className="text-sm font-bold text-blue-700">
                                {statusPesanan === 'Menunggu Konfirmasi Pembayaran' 
                                    ? 'Selesaikan Pembayaran Anda' 
                                    : statusPesanan === 'Pesanan Tiba di Tujuan' && auth.user?.peran !== 'Admin'
                                        ? 'Tandai Pesanan Selesai'
                                        : 'Status Transaksi'}
                            </p>
                            {statusPesanan === 'Menunggu Konfirmasi Pembayaran' ? (
                                <p className="text-xs text-slate-500 mt-1">
                                    Ikuti instruksi pembayaran di bawah. Status pesanan akan otomatis terupdate setelah pembayaran berhasil.
                                </p>
                            ) : statusPesanan === 'Pesanan Tiba di Tujuan' && auth.user?.peran !== 'Admin' ? (
                                <p className="text-xs text-slate-500 mt-1">
                                    Silakan konfirmasi penerimaan barang dengan menandai pesanan telah selesai.
                                </p>
                            ) : (
                                <p className="text-xs text-slate-500 mt-1">
                                    Status saat ini: <span className="font-semibold text-slate-800">{statusPesanan}</span>.
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2 flex-shrink-0">
                            {['Menunggu Konfirmasi Pembayaran', 'Dikemas'].includes(statusPesanan) && (
                                <button
                                    type="button"
                                    onClick={() => setShowCancelModal(true)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer animate-fade-in"
                                >
                                    Batalkan Pesanan
                                </button>
                            )}
                            {statusPesanan === 'Pesanan Tiba di Tujuan' && (
                                <>
                                    {auth.user?.peran === 'Admin' ? (
                                        <span className="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg">
                                            Pesanan Tiba (Menunggu Konfirmasi Pembeli)
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleUpdateStatus('Selesai')}
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                                        >
                                            <CheckCircle className="size-4" /> Pesanan Selesai
                                        </button>
                                    )}
                                </>
                            )}
                            {statusPesanan === 'Selesai' && (
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                    ✓ Transaksi Selesai
                                </span>
                            )}
                            {statusPesanan === 'Dibatalkan' && (
                                <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                                    ✕ Transaksi Dibatalkan
                                </span>
                            )}
                        </div>
                    </div>

                    {/* ═══════════════════════════════════════════════
                         PAYMENT GATEWAY CARD — Embedded di EyeLit
                    ═══════════════════════════════════════════════ */}
                    {statusPesanan === 'Menunggu Konfirmasi Pembayaran' && (xendit_payment_url || xendit_payment_info) && (
                        <div className="mb-6 animate-fade-in">
                            {/* ─── QRIS Payment ─── */}
                            {pesanan.metode_pembayaran === 'QRIS' && (
                                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white max-w-md">
                                    {/* Header */}
                                    <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #0f2951 0%, #1a4a8a 100%)' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-white">
                                                    <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm11 0h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2v-2h2v-2h-4zm2-2h2v2h-2v-2zM13 13h2v2h-2v-2z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Pembayaran QRIS</p>
                                                <p className="text-white/60 text-[10px]">Scan dengan aplikasi e-wallet Anda</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/60 text-[10px] mb-0.5">Total Tagihan</p>
                                            <p className="text-white font-bold text-base">Rp {Number(grand_total ?? 0).toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>

                                    {/* QR Code Area */}
                                    <div className="bg-slate-50 px-5 py-6 flex flex-col items-center gap-4">
                                        {/* QR Image */}
                                        <div className="relative">
                                            <div className="w-56 h-56 bg-white rounded-2xl shadow-md border-2 border-slate-100 flex items-center justify-center p-3">
                                                {xendit_payment_info?.qr_string ? (
                                                    <img
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(xendit_payment_info.qr_string)}`}
                                                        alt="QRIS Code"
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : xendit_payment_info?.qr_code ? (
                                                    <img
                                                        src={xendit_payment_info.qr_code}
                                                        alt="QRIS Code"
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                                        <div className="animate-spin w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full"></div>
                                                        <p className="text-xs">Membuat kode QRIS...</p>
                                                    </div>
                                                )}
                                            </div>
                                            {/* QRIS logo corner */}
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                                                <span className="text-[10px] font-black tracking-widest text-[#e62e2e]">QRIS</span>
                                            </div>
                                        </div>

                                        {/* Merchant info */}
                                        <div className="text-center pt-2">
                                            <p className="text-sm font-bold text-slate-800">EyeLit Store</p>
                                            <p className="text-xs text-slate-500 font-mono mt-0.5">{pesanan.no_pesanan}</p>
                                        </div>

                                        {/* Supported wallets */}
                                        <div className="flex items-center gap-1.5 flex-wrap justify-center">
                                            {['GoPay','OVO','Dana','ShopeePay','LinkAja','M-Banking'].map(w => (
                                                <span key={w} className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-medium">{w}</span>
                                            ))}
                                        </div>

                                        {/* Timer indicator */}
                                        <div className="w-full flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0"></div>
                                            <p className="text-xs text-amber-700 font-medium">Menunggu pembayaran • Status akan terupdate otomatis</p>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="px-5 py-4 border-t border-slate-100 bg-white">
                                        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Cara Bayar</p>
                                        <ol className="space-y-1.5 text-xs text-slate-600">
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1a4a8a] text-white text-[9px] font-bold flex items-center justify-center">1</span><span>Buka aplikasi e-wallet atau M-Banking Anda</span></li>
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1a4a8a] text-white text-[9px] font-bold flex items-center justify-center">2</span><span>Pilih menu <strong>Bayar</strong> / <strong>Scan QR</strong></span></li>
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1a4a8a] text-white text-[9px] font-bold flex items-center justify-center">3</span><span>Arahkan kamera ke QR code di atas</span></li>
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1a4a8a] text-white text-[9px] font-bold flex items-center justify-center">4</span><span>Konfirmasi pembayaran <strong>Rp {Number(grand_total ?? 0).toLocaleString('id-ID')}</strong></span></li>
                                        </ol>
                                    </div>

                                    {/* Simulate — discreet */}
                                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={handleSimulatePayment}
                                            disabled={simulating}
                                            className="text-[10px] text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors cursor-pointer disabled:opacity-40"
                                        >
                                            {simulating ? 'Memproses...' : '[Sandbox] Simulasi Pembayaran Lunas'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ─── Virtual Account BCA Payment ─── */}
                            {pesanan.metode_pembayaran === 'Virtual Account BCA' && (
                                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white max-w-md">
                                    {/* Header */}
                                    <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #003d82 0%, #0060c7 100%)' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                                <span className="text-[#003d82] font-black text-xs tracking-tight">BCA</span>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Transfer Virtual Account</p>
                                                <p className="text-white/60 text-[10px]">Bank Central Asia</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/60 text-[10px] mb-0.5">Total Tagihan</p>
                                            <p className="text-white font-bold text-base">Rp {Number(grand_total ?? 0).toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>

                                    {/* VA Number Card */}
                                    <div className="bg-slate-50 px-5 py-5 flex flex-col gap-4">
                                        {/* VA Number */}
                                        <div className="bg-white rounded-xl border-2 border-[#003d82]/10 p-4">
                                            <p className="text-xs text-slate-500 mb-1.5">Nomor Virtual Account BCA</p>
                                            {xendit_payment_info?.account_number ? (
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono font-black text-xl text-slate-900 tracking-widest flex-1">
                                                        {xendit_payment_info.account_number}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={handleCopyVa}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                                                            copied 
                                                                ? 'bg-emerald-500 text-white' 
                                                                : 'bg-[#003d82] hover:bg-[#002a5c] text-white'
                                                        }`}
                                                    >
                                                        {copied ? '✓ Tersalin' : 'Salin'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <div className="animate-spin w-4 h-4 border-2 border-slate-200 border-t-blue-500 rounded-full"></div>
                                                    <span className="text-xs">Membuat nomor Virtual Account...</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Transfer details */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-slate-500">Nama Pemilik VA</span>
                                                <span className="text-xs font-semibold text-slate-800">{xendit_payment_info?.name || auth.user?.username}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-slate-500">No. Pesanan</span>
                                                <span className="text-xs font-mono text-slate-700">{pesanan.no_pesanan}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-t border-slate-200 pt-2 mt-1">
                                                <span className="text-sm font-bold text-slate-700">Jumlah Transfer</span>
                                                <span className="text-base font-black text-[#003d82]">Rp {Number(grand_total ?? 0).toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>

                                        {/* Status indicator */}
                                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0"></div>
                                            <p className="text-xs text-amber-700 font-medium">Menunggu transfer • Pastikan nominal transfer <strong>tepat</strong></p>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="px-5 py-4 border-t border-slate-100 bg-white">
                                        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Cara Transfer via m-BCA</p>
                                        <ol className="space-y-1.5 text-xs text-slate-600">
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#003d82] text-white text-[9px] font-bold flex items-center justify-center">1</span><span>Buka aplikasi <strong>myBCA</strong> atau <strong>ATM BCA</strong></span></li>
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#003d82] text-white text-[9px] font-bold flex items-center justify-center">2</span><span>Pilih menu <strong>Transfer</strong> → <strong>BCA Virtual Account</strong></span></li>
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#003d82] text-white text-[9px] font-bold flex items-center justify-center">3</span><span>Masukkan nomor VA di atas</span></li>
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#003d82] text-white text-[9px] font-bold flex items-center justify-center">4</span><span>Masukkan nominal <strong>Rp {Number(grand_total ?? 0).toLocaleString('id-ID')}</strong> persis</span></li>
                                            <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#003d82] text-white text-[9px] font-bold flex items-center justify-center">5</span><span>Konfirmasi dan masukkan PIN untuk selesai</span></li>
                                        </ol>
                                    </div>

                                    {/* Simulate — discreet */}
                                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={handleSimulatePayment}
                                            disabled={simulating}
                                            className="text-[10px] text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors cursor-pointer disabled:opacity-40"
                                        >
                                            {simulating ? 'Memproses...' : '[Sandbox] Simulasi Pembayaran Lunas'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Header Pesanan */}
                    <div className="card-glass-light rounded-xl border p-5 mb-5 shadow-lg">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-xs text-slate-500">No. Pesanan</p>
                                {/* 🔥 PERBAIKAN: safe() untuk no_pesanan & tanggal */}
                                <p className="text-lg font-bold text-slate-800">{safe(pesanan.no_pesanan) || '-'}</p>
                                <p className="text-xs text-slate-500 mt-1">Dipesan pada {formatTanggal(pesanan.tanggal_pemesanan)}</p>
                            </div>
                            {/* 🔥 PERBAIKAN: gunakan statusPesanan (sudah di-safe) */}
                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_COLOR[statusPesanan] ?? 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                {statusPesanan || '-'}
                            </span>
                        </div>

                        {/* Progress Bar Status */}
                        {statusPesanan !== 'Dibatalkan' && (
                            <div className="mt-6 overflow-x-auto pb-2">
                                <div className="flex items-center min-w-[650px] px-2">
                                    {STATUS_STEPS.map((step, i) => (
                                        <div key={step} className="flex items-center flex-1 last:flex-none">
                                            <div className="flex flex-col items-center flex-shrink-0">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                                    i <= currentStep
                                                        ? 'btn-orange-gradient border-none text-white shadow'
                                                        : 'bg-slate-100 border-slate-300 text-slate-400'
                                                }`}>
                                                    {i < currentStep ? '✓' : i + 1}
                                                </div>
                                                <p className={`text-[10px] mt-2 text-center max-w-[90px] leading-tight ${i <= currentStep ? 'text-blue-700 font-semibold' : 'text-slate-400'}`}>
                                                    {step}
                                                </p>
                                            </div>
                                            {i < STATUS_STEPS.length - 1 && (
                                                <div className={`flex-1 h-0.5 mx-1 mb-5 transition-colors duration-300 ${i < currentStep ? 'bg-orange-400' : 'bg-slate-200'}`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Kiri */}
                        <div className="lg:col-span-2 flex flex-col gap-5">

                            {/* Produk */}
                            <div className="card-glass-light rounded-xl border overflow-hidden shadow-lg">
                                <div className="flex items-center gap-2 px-5 py-4 border-b border-white/20 bg-white/10">
                                    <Package className="size-4 text-blue-600" />
                                    <h2 className="text-sm font-semibold text-slate-800">Produk Dipesan</h2>
                                </div>
                                <div className="divide-y divide-slate-200">
                                    {/* 🔥 PERBAIKAN: guard detail_pesanan dengan ?? [] */}
                                    {(pesanan.detail_pesanan ?? []).map((d: any) => (
                                        <div key={d.id} className="p-5 flex flex-col gap-4">
                                            <div className="flex gap-4">
                                                {/* 🔥 PERBAIKAN: fallback gambar */}
                                                <img
                                                    src={d.produk?.gambar ? `/images/produk/${d.produk.gambar}` : '/images/placeholder.png'}
                                                    alt={safe(d.produk?.nama_produk)}
                                                    className="w-20 h-20 object-contain rounded-lg bg-white/40 p-1 flex-shrink-0 border border-slate-200"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                                                />
                                                <div className="flex-1">
                                                    {/* 🔥 PERBAIKAN: safe() untuk merek, nama_produk, tipe_pembelian */}
                                                    <p className="text-xs text-blue-700 font-semibold">{safe(d.produk?.merek)}</p>
                                                    <p className="text-sm font-semibold text-slate-800">{safe(d.produk?.nama_produk)}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{safe(d.tipe_pembelian)} · ×{d.jumlah ?? 0}</p>
                                                    {safe(d.tipe_pembelian) === 'Frame + Lensa' && (
                                                        <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                                                            {d.jenis_lensa_od && <p>OD: {safe(d.jenis_lensa_od)} {safe(d.nilai_lensa_od)}{d.silinder_od ? ` / Sil ${safe(d.silinder_od)}` : ''}</p>}
                                                            {d.jenis_lensa_os && <p>OS: {safe(d.jenis_lensa_os)} {safe(d.nilai_lensa_os)}{d.silinder_os ? ` / Sil ${safe(d.silinder_os)}` : ''}</p>}
                                                            {d.anti_radiasi && <p>+ Anti Radiasi</p>}
                                                            {d.photochromic && <p>+ Photochromic</p>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-sm font-bold text-blue-700">Rp {Number(d.subtotal ?? 0).toLocaleString('id-ID')}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">Rp {Number(d.harga_frame ?? 0).toLocaleString('id-ID')} / pcs</p>
                                                </div>
                                            </div>

                                            {/* Section Ulasan */}
                                            {statusPesanan === 'Selesai' && (
                                                <div className="mt-2 pt-4 border-t border-dashed border-slate-200">
                                                    {(() => {
                                                        const review = ulasanList.find((u: any) => u.detail_pesanan_id === d.id);
                                                        if (review) {
                                                            return (
                                                                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200 flex flex-col gap-2 shadow-inner">
                                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                                        <span className="text-xs font-semibold text-slate-800">Ulasan Anda:</span>
                                                                        <div className="flex items-center gap-0.5">
                                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                                <Star
                                                                                    key={star}
                                                                                    className={`size-3.5 ${
                                                                                        star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                                                                                    }`}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                        <span className="text-xs font-semibold text-slate-600">
                                                                            ({review.rating === 5 && 'Sangat Puas'}
                                                                            {review.rating === 4 && 'Puas'}
                                                                            {review.rating === 3 && 'Cukup'}
                                                                            {review.rating === 2 && 'Buruk'}
                                                                            {review.rating === 1 && 'Sangat Buruk'})
                                                                        </span>
                                                                    </div>
                                                                    {review.komentar ? (
                                                                        <p className="text-sm text-slate-700 italic font-semibold">"{review.komentar}"</p>
                                                                    ) : (
                                                                        <p className="text-xs text-slate-400 italic">Tidak ada komentar.</p>
                                                                    )}
                                                                    <p className="text-[10px] text-slate-400">
                                                                        Dikirim pada {formatTanggal(review.tanggal_ulasan)}
                                                                    </p>
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <ReviewForm detailPesananId={d.id} pesananId={pesanan.id} />
                                                            );
                                                        }
                                                    })()}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Alamat & Ekspedisi */}
                            <div className="card-glass-light rounded-xl border overflow-hidden shadow-lg">
                                <div className="flex items-center gap-2 px-5 py-4 border-b border-white/20 bg-white/10">
                                    <MapPin className="size-4 text-blue-600" />
                                    <h2 className="text-sm font-semibold text-slate-800">Pengiriman</h2>
                                </div>
                                <div className="p-5 flex flex-col gap-3 text-sm">
                                    <div className="flex gap-2">
                                        <Truck className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            {/* 🔥 PERBAIKAN: safe() untuk nama_ekspedisi & no_resi */}
                                            <p className="font-semibold text-slate-800">{safe(pesanan.ekspedisi?.nama_ekspedisi) || '-'}</p>
                                            {pesanan.no_resi && <p className="text-xs text-slate-500">No. Resi: <span className="font-mono">{safe(pesanan.no_resi)}</span></p>}
                                        </div>
                                    </div>
                                    {pesanan.alamat && (
                                        <div className="flex gap-2">
                                            <MapPin className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                {/* 🔥 PERBAIKAN: safe() untuk semua field alamat */}
                                                <p className="font-semibold text-slate-800">{safe(pesanan.alamat.nama_penerima)} · <span className="text-slate-500">{safe(pesanan.alamat.no_hp_penerima)}</span></p>
                                                <p className="text-slate-600 text-xs mt-0.5">
                                                    {safe(pesanan.alamat.alamat_lengkap)}, {safe(pesanan.alamat.kecamatan)}, {safe(pesanan.alamat.kota_kabupaten)}, {safe(pesanan.alamat.provinsi?.nama_provinsi)}, {safe(pesanan.alamat.kode_pos)}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Ringkasan Pembayaran */}
                        <div className="lg:col-span-1">
                            <div className="card-glass-light rounded-xl border p-5 sticky top-6 shadow-lg">
                                <h2 className="text-base font-semibold text-slate-800 mb-4">Ringkasan Pembayaran</h2>
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Subtotal Produk</span>
                                        <span className="text-slate-800">Rp {Number(subtotal_produk ?? 0).toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Ongkos Kirim</span>
                                        <span className="text-slate-800">Rp {Number(pesanan.ongkos_kirim ?? 0).toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200">
                                        <span>Total</span>
                                        <span className="text-blue-700">Rp {Number(grand_total ?? 0).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-2 text-sm">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Metode Pembayaran</span>
                                        {/* 🔥 PERBAIKAN: safe() untuk metode_pembayaran */}
                                        <span className="font-semibold text-slate-800">{safe(pesanan.metode_pembayaran) || '-'}</span>
                                    </div>
                                    {pesanan.batas_waktu_pembayaran && statusPesanan === 'Menunggu Konfirmasi Pembayaran' && (
                                        <div className="flex justify-between text-slate-500">
                                            <span>Batas Bayar</span>
                                            <span className="font-semibold text-red-600">{formatTanggal(pesanan.batas_waktu_pembayaran)}</span>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href="/katalog"
                                    className="mt-5 block w-full py-3 btn-orange-gradient text-white rounded-full font-semibold text-sm transition-colors text-center shadow-lg"
                                >
                                    Lanjut Belanja
                                </Link>
                            </div>

                            {/* Tombol Kuitansi Pembayaran Digital */}
                            {['Dikemas', 'Dikirim', 'Pesanan Tiba di Tujuan', 'Selesai'].includes(statusPesanan) && (
                                <button
                                    type="button"
                                    onClick={() => setShowReceiptModal(true)}
                                    className="mt-5 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                                >
                                    <FileText className="size-4" /> Lihat Kuitansi Pembayaran
                                </button>
                            )}

                        </div>
                    </div>
                </main>

                {/* Modal Kuitansi Pembayaran Digital */}
                {showReceiptModal && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                        <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-scale-in text-slate-800">
                            {/* Top decorative gradient bar */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />

                            {/* Stempel Lunas */}
                            <div className="absolute -right-4 -bottom-4 w-28 h-28 border-4 border-dashed border-emerald-500/10 rounded-full flex items-center justify-center rotate-12 select-none pointer-events-none">
                                <span className="text-emerald-500/10 font-black text-xl tracking-widest font-mono">LUNAS</span>
                            </div>

                            {/* Header Modal */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-bold text-slate-800 text-sm">Kuitansi Pembayaran</h3>
                                <button
                                    onClick={() => setShowReceiptModal(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-slate-650 hover:bg-slate-100 transition-all cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Konten Kuitansi */}
                            <div className="p-6">
                                <div className="flex flex-col items-center pb-4 border-b border-dashed border-slate-200">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200 mb-2 shadow-inner">
                                        <CheckCircle className="size-6 animate-pulse" />
                                    </div>
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight">TRANSAKSI BERHASIL</h4>
                                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded border border-emerald-100 mt-1 uppercase">
                                        LUNAS
                                    </span>
                                </div>

                                <div className="space-y-3 text-xs text-slate-550 mt-5 relative">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-slate-500">No. Pesanan</span>
                                        <span className="font-mono font-bold text-slate-800">{safe(pesanan.no_pesanan)}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-slate-500">ID Pembayaran</span>
                                        <span className="font-mono font-semibold text-slate-800 truncate max-w-[200px] text-right" title={pesanan.xendit_payment_id}>
                                            {pesanan.xendit_payment_id || '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Waktu Bayar</span>
                                        <span className="font-medium text-slate-800 text-right">{formatTanggal(pesanan.tanggal_konfirmasi_pembayaran || pesanan.updated_at)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Metode</span>
                                        <span className="font-medium text-slate-800 text-right">{safe(pesanan.metode_pembayaran)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Nama Pelanggan</span>
                                        <span className="font-medium text-slate-800 text-right">{safe(pesanan.alamat?.nama_penerima || auth.user?.username)}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-dashed border-slate-200 mt-2 font-bold text-slate-800 text-sm">
                                        <span>Jumlah Dibayar</span>
                                        <span className="text-emerald-600 font-extrabold text-base">Rp {Number(grand_total ?? 0).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Modal */}
                            <div className="flex gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/50 justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowReceiptModal(false);
                                        window.print();
                                    }}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                                >
                                    Cetak Kuitansi
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowReceiptModal(false)}
                                    className="px-4 py-2 bg-[#1e3a6e] hover:bg-[#162a50] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cancellation Reason Modal */}
                {showCancelModal && (
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Batalkan Pesanan</h3>
                            <p className="text-xs text-slate-500 mb-4">Silakan pilih alasan pembatalan pesanan Anda. Stok produk akan dikembalikan otomatis.</p>
                            
                            <div className="space-y-2 mb-4">
                                {[
                                    'Salah mengisi detail produk',
                                    'Salah mengisi alamat',
                                    'Ingin mengganti produk',
                                    'Berubah pikiran',
                                    'Lainnya'
                                ].map((reason) => (
                                    <label key={reason} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs font-semibold text-slate-700">
                                        <input
                                            type="radio"
                                            name="cancelReason"
                                            value={reason}
                                            checked={selectedReason === reason}
                                            onChange={(e) => {
                                                setSelectedReason(e.target.value);
                                                if (e.target.value !== 'Lainnya') {
                                                    setCustomReason('');
                                                }
                                            }}
                                            className="text-orange-500 focus:ring-orange-500 size-4 cursor-pointer"
                                        />
                                        <span>{reason}</span>
                                    </label>
                                ))}
                            </div>

                            {selectedReason === 'Lainnya' && (
                                <div className="mb-4">
                                    <textarea
                                        value={customReason}
                                        onChange={(e) => setCustomReason(e.target.value)}
                                        placeholder="Tulis alasan pembatalan Anda di sini..."
                                        rows={3}
                                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none text-slate-850 bg-white"
                                        required
                                    />
                                </div>
                            )}

                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCancelModal(false);
                                        setSelectedReason('Salah mengisi detail produk');
                                        setCustomReason('');
                                    }}
                                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmCancel}
                                    disabled={selectedReason === 'Lainnya' && !customReason.trim()}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                                >
                                    Ya, Batalkan Pesanan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

function ReviewForm({ detailPesananId, pesananId }: { detailPesananId: number, pesananId: number }) {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [komentar, setKomentar] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        router.post(`/pesanan/${pesananId}/ulasan`, {
            detail_pesanan_id: detailPesananId,
            rating: rating,
            komentar: komentar
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="bg-slate-50/70 rounded-xl p-4 border border-slate-200 flex flex-col gap-3 shadow-sm text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <p className="text-sm font-semibold text-slate-800">Beri Ulasan Produk</p>
                    <p className="text-xs text-slate-500">Bagikan penilaian Anda untuk membantu pembeli lain.</p>
                </div>
                
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                           key={star}
                           type="button"
                           onClick={() => setRating(star)}
                           onMouseEnter={() => setHoverRating(star)}
                           onMouseLeave={() => setHoverRating(0)}
                           className="focus:outline-none transition-transform hover:scale-110 duration-150"
                        >
                            <Star
                               className={`size-6 cursor-pointer ${
                                   star <= (hoverRating || rating)
                                       ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]'
                                       : 'text-slate-200'
                               }`}
                            />
                        </button>
                    ))}
                    <span className="text-xs font-semibold text-slate-600 ml-2 w-24">
                        {rating === 5 && 'Sangat Puas'}
                        {rating === 4 && 'Puas'}
                        {rating === 3 && 'Cukup'}
                        {rating === 2 && 'Buruk'}
                        {rating === 1 && 'Sangat Buruk'}
                    </span>
                </div>
            </div>

            <div className="flex gap-2">
                <textarea
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                    placeholder="Tulis pendapat Anda tentang produk ini (opsional)..."
                    rows={2}
                    maxLength={1000}
                    className="flex-1 text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none transition-shadow"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 btn-orange-gradient text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 self-end flex items-center justify-center h-10 min-w-[100px]"
                >
                    {loading ? 'Mengirim...' : 'Kirim'}
                </button>
            </div>
        </form>
    );
}
