import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    BookOpen, LogOut, Search, Settings, ShoppingBag, User,
    LayoutGrid, Package, Users, DollarSign, CheckCircle,
    XCircle, Truck, ImageIcon, MapPin, X, ChevronDown,
    TrendingUp, TrendingDown, Download, Star, Trash2, MessageSquare, Calendar,
    Plus, Edit, MessageCircle, Send
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const safe = (v: any) => (v ?? "").toString().trim();

const STATUS_COLOR: Record<string, string> = {
    'Menunggu Konfirmasi Pembayaran': 'bg-amber-50 border border-amber-200 text-amber-700',
    'Dikemas':                        'bg-blue-50 border border-blue-200 text-blue-700',
    'Dikirim':                        'bg-sky-50 border border-sky-200 text-sky-700',
    'Pesanan Tiba di Tujuan':         'bg-purple-50 border border-purple-200 text-purple-700',
    'Selesai':                        'bg-emerald-50 border border-emerald-200 text-emerald-700',
    'Dibatalkan':                     'bg-red-50 border border-red-200 text-red-750',
};

const STATUS_OPTIONS = [
    'Menunggu Konfirmasi Pembayaran',
    'Dikemas',
    'Dikirim',
    'Pesanan Tiba di Tujuan',
    'Selesai',
    'Dibatalkan',
];

export default function Dashboard() {
    const {
        auth, totalProduk, totalPesanan, totalPengguna, totalPendapatan,
        pesananBulanIni, pendapatanBulanIni, menungguPembayaran, daftarPesanan,
        daftarPengguna, daftarUlasan, daftarProduk, laporanBulanan, flash,
        chatContacts, activeChatUserId, chatMessages
    } = usePage().props as any;

    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            return params.get('tab') || 'pesanan';
        }
        return 'pesanan';
    });

    // Tab 6: Chat States & Effects
    const [adminReplyText, setAdminReplyText] = useState('');
    const [searchContactQuery, setSearchContactQuery] = useState('');
    const adminMessagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll admin chat
    useEffect(() => {
        if (activeTab === 'chat') {
            adminMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, activeTab]);

    // Polling for admin chat every 5 seconds
    useEffect(() => {
        let interval: any;
        if (activeTab === 'chat') {
            interval = setInterval(() => {
                router.reload({
                    only: ['chatContacts', 'chatMessages'],
                    preserveScroll: true,
                    preserveState: true
                });
            }, 5000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeTab, activeChatUserId]);

    const handleAdminSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!adminReplyText.trim() || !activeChatUserId) return;

        router.post('/chat/kirim', {
            pesan: adminReplyText,
            penerima_id: activeChatUserId
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setAdminReplyText('');
                setTimeout(() => {
                    adminMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        });
    };
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    
    // Tab 1: Pesanan States
    const [filterStatus, setFilterStatus] = useState('Semua');
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState<any | null>(null);
    const [cancelReasonPopup, setCancelReasonPopup] = useState<any | null>(null);

    // Tab 2: Kelola Produk States
    const [searchProductQuery, setSearchProductQuery] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [productForm, setProductForm] = useState({
        nama_produk: '',
        merek: '',
        tipe_produk: 'Frame Kacamata',
        harga_produk: 0,
        stok: 0,
        jenis_kelamin: 'Unisex',
        warna: '',
        material: '',
        bentuk: '',
        bridge: '',
        diagonal: '',
        ukuran: '',
        status_produk: 'Aktif',
        gambar: '',
        gambar_file: null as File | null
    });

    // Tab 3: Kelola Pengguna States
    const [searchUserQuery, setSearchUserQuery] = useState('');

    // Tab 4: Ulasan States
    const [filterRating, setFilterRating] = useState('Semua');
    const [searchReviewQuery, setSearchReviewQuery] = useState('');
    const [expandedReviewImage, setExpandedReviewImage] = useState<string | null>(null);

    const userDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const pesananList = daftarPesanan || [];

    const filteredPesanan = filterStatus === 'Semua'
        ? pesananList
        : pesananList.filter((p: any) => p.status_pesanan === filterStatus);

    const filteredProducts = (daftarProduk || []).filter((p: any) =>
        safe(p.nama_produk).toLowerCase().includes(searchProductQuery.toLowerCase()) ||
        safe(p.merek).toLowerCase().includes(searchProductQuery.toLowerCase()) ||
        safe(p.tipe_produk).toLowerCase().includes(searchProductQuery.toLowerCase())
    );

    const filteredUsers = (daftarPengguna || []).filter((u: any) =>
        safe(u.username).toLowerCase().includes(searchUserQuery.toLowerCase()) ||
        safe(u.email).toLowerCase().includes(searchUserQuery.toLowerCase())
    );

    const filteredReviews = (daftarUlasan || []).filter((r: any) => {
        const matchesRating = filterRating === 'Semua' || r.rating === parseInt(filterRating);
        const matchesSearch = !searchReviewQuery ||
            safe(r.produk?.nama_produk).toLowerCase().includes(searchReviewQuery.toLowerCase()) ||
            safe(r.user?.username).toLowerCase().includes(searchReviewQuery.toLowerCase()) ||
            safe(r.komentar).toLowerCase().includes(searchReviewQuery.toLowerCase());
        return matchesRating && matchesSearch;
    });

    function formatRupiah(val: number) {
        return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
    }

    function formatShortRupiah(val: number) {
        if (val >= 1000000) {
            return 'Rp ' + (val / 1000000).toFixed(1) + ' Jt';
        } else if (val >= 1000) {
            return 'Rp ' + (val / 1000).toFixed(0) + ' Rb';
        }
        return 'Rp ' + val;
    }

    function formatTanggal(val: string | null) {
        if (!val) return '-';
        const d = new Date(val);
        if (isNaN(d.getTime())) return '-';
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function handleAdminUpdateStatus(pesananId: number, newStatus: string) {
        setUpdatingId(pesananId);
        router.patch(`/admin/pesanan/${pesananId}/status`, { status: newStatus }, {
            preserveScroll: true,
            onFinish: () => setUpdatingId(null),
        });
    }

    // Product CRUD handlers
    function resetProductForm() {
        setProductForm({
            nama_produk: '',
            merek: '',
            tipe_produk: 'Frame Kacamata',
            harga_produk: 0,
            stok: 0,
            jenis_kelamin: 'Unisex',
            warna: '',
            material: '',
            bentuk: '',
            bridge: '',
            diagonal: '',
            ukuran: '',
            status_produk: 'Aktif',
            gambar: '',
            gambar_file: null
        });
    }

    function startAddProduct() {
        setEditingProduct(null);
        resetProductForm();
        setShowProductModal(true);
    }

    function startEditProduct(p: any) {
        setEditingProduct(p);
        setProductForm({
            nama_produk: p.nama_produk || '',
            merek: p.merek || '',
            tipe_produk: p.tipe_produk || 'Frame Kacamata',
            harga_produk: p.harga_produk || 0,
            stok: p.stok || 0,
            jenis_kelamin: p.jenis_kelamin || 'Unisex',
            warna: p.warna || '',
            material: p.material || '',
            bentuk: p.bentuk || '',
            bridge: p.bridge || '',
            diagonal: p.diagonal || '',
            ukuran: p.ukuran || '',
            status_produk: p.status_produk || 'Aktif',
            gambar: p.gambar || '',
            gambar_file: null
        });
        setShowProductModal(true);
    }

    function handleSaveProduct(e: React.FormEvent) {
        e.preventDefault();
        
        // We use FormData for file upload support in Inertia
        const data = new FormData();
        data.append('nama_produk', productForm.nama_produk);
        data.append('merek', productForm.merek);
        data.append('tipe_produk', productForm.tipe_produk);
        data.append('harga_produk', productForm.harga_produk.toString());
        data.append('stok', productForm.stok.toString());
        data.append('jenis_kelamin', productForm.jenis_kelamin);
        data.append('warna', productForm.warna);
        data.append('material', productForm.material);
        data.append('bentuk', productForm.bentuk);
        data.append('bridge', productForm.bridge);
        data.append('diagonal', productForm.diagonal);
        data.append('ukuran', productForm.ukuran);
        data.append('status_produk', productForm.status_produk);
        data.append('gambar', productForm.gambar);
        
        if (productForm.gambar_file) {
            data.append('gambar_file', productForm.gambar_file);
        }

        if (editingProduct) {
            router.post(`/admin/produk/${editingProduct.id}`, data, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                    resetProductForm();
                }
            });
        } else {
            router.post('/admin/produk', data, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowProductModal(false);
                    resetProductForm();
                }
            });
        }
    }

    function handleHapusProduk(p: any) {
        if (p.jumlah_dipesan > 0) {
            alert('Produk ini tidak dapat dihapus karena sudah memiliki riwayat pemesanan oleh pelanggan.');
            return;
        }
        if (confirm(`Apakah Anda yakin ingin menghapus produk "${p.nama_produk}"?`)) {
            router.delete(`/admin/produk/${p.id}`, {
                preserveScroll: true,
            });
        }
    }

    // User management handlers
    function handleUpdatePeran(userId: number, newRole: string) {
        if (confirm(`Apakah Anda yakin ingin mengubah peran pengguna ini menjadi ${newRole}?`)) {
            router.patch(`/admin/pengguna/${userId}/peran`, { peran: newRole }, {
                preserveScroll: true,
            });
        }
    }

    function handleHapusPengguna(u: any) {
        if (u.jumlah_pesanan > 0) {
            alert('Pengguna ini tidak dapat dihapus karena memiliki riwayat transaksi/pesanan.');
            return;
        }
        if (confirm(`Apakah Anda yakin ingin menghapus akun pengguna "${u.username}"? Tindakan ini tidak dapat dibatalkan.`)) {
            router.delete(`/admin/pengguna/${u.id}`, {
                preserveScroll: true,
            });
        }
    }

    // Chart dimensions
    const chartWidth = 780;
    const chartHeight = 240;
    const paddingLeft = 80;
    const paddingRight = 20;
    const paddingTop = 25;
    const paddingBottom = 40;

    const graphWidth = chartWidth - paddingLeft - paddingRight;
    const graphHeight = chartHeight - paddingTop - paddingBottom;

    const reports = laporanBulanan || [];
    const maxRevenue = Math.max(...reports.map((r: any) => r.total_pendapatan || 0), 1000000);

    const getY = (val: number) => {
        return chartHeight - paddingBottom - (val / maxRevenue) * graphHeight;
    };

    const getX = (idx: number) => {
        const count = reports.length;
        if (count <= 1) return paddingLeft + graphWidth / 2;
        const spacing = graphWidth / (count - 1);
        return paddingLeft + idx * spacing;
    };

    const hasReports = reports.length > 0;

    return (
        <>
            <Head title="Admin Dashboard - EyeLit" />

            {/* Navbar - Premium light/blue admin header */}
            <nav className="relative z-50 border-b" style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(54, 104, 181, 0.95)', backdropFilter: 'blur(12px)' }}>
                <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                        <img src="/images/logo/AuthMobile.svg" alt="EyeLit Logo" className="h-10 w-auto brightness-0 invert" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white tracking-tight">EyeLit</span>
                            <span className="text-[10px] font-medium text-yellow-300 -mt-0.5 tracking-widest uppercase">Admin Panel</span>
                        </div>
                    </Link>

                    {/* Navbar Menu Spacer */}
                    <div className="flex-1" />

                    {/* Right Icons */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <Link href="/" className="p-2 rounded-lg hover:bg-blue-950/40 transition-colors text-blue-100 hover:text-white flex items-center gap-1.5 text-xs font-semibold" title="Buka Halaman Utama">
                            <BookOpen className="size-4" />
                            <span>Lihat Beranda</span>
                        </Link>

                        {/* User Dropdown */}
                        <div className="relative h-full flex items-center">
                            <div
                                onMouseEnter={() => { if (userDropdownTimer.current) clearTimeout(userDropdownTimer.current); setShowUserDropdown(true); }}
                                onMouseLeave={() => { userDropdownTimer.current = setTimeout(() => setShowUserDropdown(false), 100); }}
                            >
                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-950/40 transition-colors">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                        {auth.user?.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-slate-200 hidden sm:inline">{auth.user?.username}</span>
                                    <ChevronDown className="size-3.5 text-slate-400" />
                                </button>
                                {showUserDropdown && (
                                    <div className="dropdown-menu show" style={{ top: '56px', right: '0' }}
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
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <main className="min-h-screen bg-eyelit-theme pb-16">
                <div className="mx-auto max-w-[1440px] px-6 py-8">
                    
                    {/* Flash Notifications */}
                    {flash?.success && (
                        <div className="mb-6 p-4 rounded-xl border border-emerald-250 bg-emerald-50 text-emerald-800 text-sm font-medium flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-3">
                            <span className="flex items-center gap-2">
                                <CheckCircle className="size-4 text-emerald-650" />
                                {flash.success}
                            </span>
                            <button onClick={() => router.reload()} className="text-emerald-600 hover:text-emerald-800 transition-colors">
                                <X className="size-4" />
                            </button>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 p-4 rounded-xl border border-red-250 bg-red-50 text-red-800 text-sm font-medium flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-3">
                            <span className="flex items-center gap-2">
                                <XCircle className="size-4 text-red-650" />
                                {flash.error}
                            </span>
                            <button onClick={() => router.reload()} className="text-red-600 hover:text-red-800 transition-colors">
                                <X className="size-4" />
                            </button>
                        </div>
                    )}

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
                        <p className="text-blue-100 mt-1 text-sm">Selamat datang, <span className="font-semibold text-yellow-300">{auth.user?.username}</span>! Berikut ringkasan toko Anda.</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {/* Total Pendapatan */}
                        <div className="relative overflow-hidden rounded-2xl border p-5 shadow-lg flex flex-col justify-between hover:border-[#3668b5]/45 transition-all duration-300 card-glass-light">
                            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-emerald-500/10" />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-600">
                                        <DollarSign className="size-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">Total</span>
                                </div>
                                <p className="text-xs font-semibold text-slate-500">Total Pendapatan</p>
                                <p className="text-2xl font-bold mt-1 tracking-tight text-slate-900">{formatRupiah(totalPendapatan)}</p>
                                <p className="text-[11px] text-emerald-600 mt-2 font-medium">Bulan ini: {formatRupiah(pendapatanBulanIni)}</p>
                            </div>
                        </div>

                        {/* Total Pesanan */}
                        <div className="relative overflow-hidden rounded-2xl border p-5 shadow-lg flex flex-col justify-between hover:border-[#3668b5]/45 transition-all duration-300 card-glass-light">
                            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-blue-500/10" />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-blue-100 border border-blue-200 rounded-xl text-blue-600">
                                        <ShoppingBag className="size-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">Total</span>
                                </div>
                                <p className="text-xs font-semibold text-slate-500">Total Pesanan</p>
                                <p className="text-2xl font-bold mt-1 text-slate-900">{totalPesanan}</p>
                                <p className="text-[11px] text-blue-600 mt-2 font-medium">Bulan ini: {pesananBulanIni} pesanan</p>
                            </div>
                        </div>

                        {/* Total Produk */}
                        <div className="relative overflow-hidden rounded-2xl border p-5 shadow-lg flex flex-col justify-between hover:border-[#3668b5]/45 transition-all duration-300 card-glass-light">
                            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-purple-500/10" />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-purple-100 border border-purple-200 rounded-xl text-purple-600">
                                        <Package className="size-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/50">Katalog</span>
                                </div>
                                <p className="text-xs font-semibold text-slate-500">Total Produk</p>
                                <p className="text-2xl font-bold mt-1 text-slate-900">{totalProduk}</p>
                                <p className="text-[11px] text-purple-600 mt-2 font-medium">Produk aktif di katalog</p>
                            </div>
                        </div>

                        {/* Total Pengguna */}
                        <div className="relative overflow-hidden rounded-2xl border p-5 shadow-lg flex flex-col justify-between hover:border-[#3668b5]/45 transition-all duration-300 card-glass-light">
                            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-amber-500/10" />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-amber-100 border border-amber-200 rounded-xl text-amber-600">
                                        <Users className="size-5" />
                                    </div>
                                    {menungguPembayaran > 0 && (
                                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 animate-pulse">
                                            {menungguPembayaran} pending
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs font-semibold text-slate-500">Total Pelanggan</p>
                                <p className="text-2xl font-bold mt-1 text-slate-900">{totalPengguna}</p>
                                <p className="text-[11px] text-amber-600 mt-2 font-medium">Pelanggan terdaftar</p>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation (Main Content Area) */}
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
                        {[
                            { id: 'pesanan', label: 'Catatan Pesanan', icon: ShoppingBag },
                            { id: 'laporan', label: 'Laporan & Grafik', icon: DollarSign },
                            { id: 'produk', label: 'Kelola Produk', icon: Package },
                            { id: 'pengguna', label: 'Kelola Pengguna', icon: Users },
                            { id: 'ulasan', label: 'Ulasan Pelanggan', icon: MessageSquare },
                            { id: 'chat', label: 'Chat Pelanggan', icon: MessageCircle },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        // Reset query param when switching tabs to avoid keeping old chat_user_id active
                                        if (tab.id !== 'chat') {
                                            const params = new URLSearchParams(window.location.search);
                                            params.delete('chat_user_id');
                                            params.set('tab', tab.id);
                                            router.visit(`${window.location.pathname}?${params.toString()}`, { preserveScroll: true });
                                        } else {
                                            const params = new URLSearchParams(window.location.search);
                                            params.set('tab', 'chat');
                                            router.visit(`${window.location.pathname}?${params.toString()}`, { preserveScroll: true });
                                        }
                                    }}
                                    className={`flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all border cursor-pointer whitespace-nowrap shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                                        isActive
                                            ? 'btn-orange-gradient text-white border-transparent shadow-md'
                                            : 'bg-white/60 text-slate-700 border-slate-200/50 hover:bg-white/80 hover:text-slate-900'
                                    }`}
                                >
                                    <Icon className="size-4" />
                                    <span>{tab.label}</span>
                                    {tab.id === 'chat' && auth.unread_chat_count > 0 && (
                                        <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                            {auth.unread_chat_count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab 1: Pesanan */}
                    {activeTab === 'pesanan' && (
                        <div className="rounded-2xl border border-slate-200/60 shadow-lg overflow-hidden card-glass-light animate-in fade-in duration-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200/60 bg-white/30">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">Catatan Pesanan</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">Kelola semua pesanan dari pelanggan</p>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {['Semua', ...STATUS_OPTIONS].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setFilterStatus(status)}
                                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
                                                filterStatus === status
                                                    ? 'bg-[#3668b5] text-white border-transparent shadow-sm'
                                                    : 'bg-white/60 text-slate-700 border-slate-200/60 hover:bg-white/80 hover:text-slate-900'
                                            }`}
                                        >
                                            {status === 'Menunggu Konfirmasi Pembayaran' ? 'Menunggu' : status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {filteredPesanan.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                                    <Package className="size-12 mb-3 text-slate-400" />
                                    <p className="text-sm font-medium text-slate-700">Belum ada pesanan</p>
                                    <p className="text-xs text-slate-500 mt-1">Pesanan akan muncul di sini setelah pelanggan checkout</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-white/40 border-b border-slate-200/60">
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">No. Pesanan</th>
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Pelanggan</th>
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Produk</th>
                                                <th className="text-right px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Total</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Tanggal</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200/50">
                                            {filteredPesanan.map((p: any) => {
                                                const produkNames = (p.detail_pesanan ?? []).map((d: any) => d.produk?.nama_produk || '-').join(', ');
                                                return (
                                                    <tr key={p.id} className="hover:bg-white/40 transition-colors group">
                                                        <td className="px-6 py-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => setSelectedOrderDetail(p)}
                                                                className="text-sm font-mono font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors focus:outline-none text-left cursor-pointer"
                                                                title="Lihat Detail Pesanan"
                                                            >
                                                                {p.no_pesanan || '-'}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="text-sm font-semibold text-slate-800">{p.nama_pelanggan || '-'}</p>
                                                                <p className="text-xs text-slate-500">{p.email_pelanggan || ''}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <p className="text-sm text-slate-800 max-w-[200px] truncate" title={produkNames}>
                                                                {produkNames || '-'}
                                                            </p>
                                                            <p className="text-xs text-slate-500">{(p.detail_pesanan ?? []).length} item</p>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className="text-sm font-bold text-slate-900">{formatRupiah(p.total_harga)}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[p.status_pesanan] ?? 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                                                                {p.status_pesanan || '-'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-sm text-slate-600">{formatTanggal(p.tanggal_pemesanan)}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                             <div className="flex items-center justify-center gap-1.5">
                                                                 {['Dikemas', 'Dikirim', 'Pesanan Tiba di Tujuan', 'Selesai'].includes(p.status_pesanan) && (
                                                                     <button
                                                                         type="button"
                                                                         onClick={() => setSelectedReceipt(p)}
                                                                         className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                                                                         title="Lihat Bukti Pembayaran"
                                                                     >
                                                                         <ImageIcon className="size-4 text-emerald-650 hover:text-emerald-800" />
                                                                     </button>
                                                                 )}
                                                                {p.status_pesanan !== 'Selesai' && p.status_pesanan !== 'Dibatalkan' && (
                                                                    <select
                                                                        className="text-xs border bg-white border-slate-200 text-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer appearance-auto shadow-sm"
                                                                        value=""
                                                                        disabled={updatingId === p.id}
                                                                        onChange={(e) => {
                                                                            if (e.target.value) {
                                                                                handleAdminUpdateStatus(p.id, e.target.value);
                                                                                e.target.value = '';
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value="" className="bg-white">Update ▾</option>
                                                                        {STATUS_OPTIONS
                                                                            .filter((s) => s !== p.status_pesanan)
                                                                            .map((s) => (
                                                                                <option key={s} value={s} className="bg-white">{s}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                )}
                                                                {p.status_pesanan === 'Selesai' && (
                                                                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5">
                                                                        <CheckCircle className="size-3.5" /> Lunas
                                                                    </span>
                                                                )}
                                                                {p.status_pesanan === 'Dibatalkan' && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setCancelReasonPopup(p)}
                                                                        className="text-xs text-red-600 font-semibold flex items-center gap-0.5 hover:text-red-800 transition-colors cursor-pointer p-1 rounded-lg hover:bg-red-50"
                                                                        title="Lihat Alasan Pembatalan"
                                                                    >
                                                                        <XCircle className="size-3.5" /> Batal
                                                                    </button>
                                                                )}
                                                             </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {filteredPesanan.length > 0 && (
                                <div className="px-6 py-4 border-t border-slate-200/60 bg-white/30 flex items-center justify-between">
                                    <p className="text-sm text-slate-500">
                                        Menampilkan <span className="font-semibold text-slate-800">{filteredPesanan.length}</span> dari <span className="font-semibold text-slate-800">{pesananList.length}</span> pesanan
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 2: Laporan & Grafik */}
                    {activeTab === 'laporan' && (
                        <div className="space-y-6 animate-in fade-in duration-200">
                            {/* Action Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-200/60 shadow-lg card-glass-light">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">Laporan Penjualan Bulanan</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">Pantau pendapatan, jumlah transaksi, dan perbandingan performa penjualan antar-bulan.</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <a
                                        href="/admin/laporan/download"
                                        download
                                        target="_self"
                                        className="btn-orange-gradient flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 text-white cursor-pointer transition-all"
                                    >
                                        <Download className="size-4" />
                                        <span>Unduh Laporan (CSV)</span>
                                    </a>
                                </div>
                            </div>

                            {/* Chart Card */}
                            <div className="p-6 rounded-2xl border border-slate-200/60 shadow-lg card-glass-light">
                                <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <TrendingUp className="size-4 text-blue-600" />
                                    Grafik Perkembangan Pendapatan Bulanan
                                </h3>

                                {!hasReports ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                                        <Package className="size-12 mb-3 text-slate-400" />
                                        <p className="text-sm font-medium text-slate-700">Belum ada data penjualan</p>
                                        <p className="text-xs text-slate-500 mt-1">Data grafik akan muncul setelah pesanan lunas tercatat</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* SVG Chart */}
                                        <div className="overflow-x-auto">
                                            <div className="min-w-[800px] bg-white/40 p-4 rounded-xl border border-slate-200/50">
                                                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                                                    {/* Definitions for gradients */}
                                                    <defs>
                                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor="#3668b5" stopOpacity="0.85" />
                                                            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.25" />
                                                        </linearGradient>
                                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                                            <stop offset="0%" stopColor="#f8b84e" />
                                                            <stop offset="100%" stopColor="#f28b27" />
                                                        </linearGradient>
                                                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor="#f28b27" stopOpacity="0.18" />
                                                            <stop offset="100%" stopColor="#f28b27" stopOpacity="0.00" />
                                                        </linearGradient>
                                                    </defs>

                                                    {/* Y-Axis Gridlines */}
                                                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                                                        const val = maxRevenue * ratio;
                                                        const y = getY(val);
                                                        return (
                                                            <g key={idx} className="opacity-40">
                                                                <line
                                                                    x1={paddingLeft}
                                                                    y1={y}
                                                                    x2={chartWidth - paddingRight}
                                                                    y2={y}
                                                                    stroke="#94a3b8"
                                                                    strokeWidth="1"
                                                                    strokeDasharray="4 4"
                                                                />
                                                                <text
                                                                    x={paddingLeft - 10}
                                                                    y={y + 4}
                                                                    textAnchor="end"
                                                                    fill="#475569"
                                                                    className="text-[10px] font-semibold"
                                                                >
                                                                    {formatShortRupiah(val)}
                                                                </text>
                                                            </g>
                                                        );
                                                    })}

                                                    {/* Area under trend line */}
                                                    {reports.length > 1 && (
                                                        <path
                                                            d={`
                                                                M ${getX(0)} ${chartHeight - paddingBottom}
                                                                ${reports.map((r: any, idx: number) => `L ${getX(idx)} ${getY(r.total_pendapatan || 0)}`).join(' ')}
                                                                L ${getX(reports.length - 1)} ${chartHeight - paddingBottom}
                                                                Z
                                                            `}
                                                            fill="url(#areaGradient)"
                                                        />
                                                    )}

                                                    {/* Bars and Peak Connecting Lines */}
                                                    {reports.map((r: any, idx: number) => {
                                                        const x = getX(idx);
                                                        const y = getY(r.total_pendapatan || 0);
                                                        const barWidth = Math.min(graphWidth / (reports.length * 2.2), 48);
                                                        const barHeight = chartHeight - paddingBottom - y;

                                                        return (
                                                            <g key={idx} className="group/bar cursor-pointer">
                                                                <title>{`${r.label}\nPendapatan: ${formatRupiah(r.total_pendapatan)}\nTransaksi: ${r.total_pesanan} pesanan\nMoM: ${r.persen_pendapatan >= 0 ? '+' : ''}${r.persen_pendapatan}%`}</title>
                                                                {/* Bar Background Glow (on hover) */}
                                                                <rect
                                                                    x={x - barWidth / 2}
                                                                    y={paddingTop}
                                                                    width={barWidth}
                                                                    height={graphHeight}
                                                                    fill="#3668b5"
                                                                    opacity="0"
                                                                    className="group-hover/bar:opacity-5 transition-opacity duration-200"
                                                                />
                                                                {/* Actual revenue bar */}
                                                                <rect
                                                                    x={x - barWidth / 2}
                                                                    y={y}
                                                                    width={barWidth}
                                                                    height={Math.max(barHeight, 3)}
                                                                    fill="url(#barGradient)"
                                                                    stroke="#3668b5"
                                                                    strokeWidth="1"
                                                                    rx="4"
                                                                    className="transition-all duration-300 group-hover/bar:stroke-blue-750"
                                                                />
                                                                {/* Numeric label above bar - adjusted higher to y - 14 to avoid dot overlaps */}
                                                                <text
                                                                    x={x}
                                                                    y={y - 14}
                                                                    textAnchor="middle"
                                                                    fill="#1e293b"
                                                                    className="text-[9px] font-bold opacity-80 group-hover/bar:opacity-100 group-hover/bar:scale-105 origin-bottom transition-all"
                                                                >
                                                                    {formatShortRupiah(r.total_pendapatan)}
                                                                </text>
                                                                {/* X-Axis Label */}
                                                                <text
                                                                    x={x}
                                                                    y={chartHeight - 15}
                                                                    textAnchor="middle"
                                                                    fill="#334155"
                                                                    className="text-[10px] font-bold"
                                                                >
                                                                    {r.label.split(' ')[0]}
                                                                </text>
                                                            </g>
                                                        );
                                                    })}

                                                    {/* Trend Line Connecting Peak Circles */}
                                                    {reports.length > 1 && (
                                                        <path
                                                            d={reports.map((r: any, idx: number) => `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(r.total_pendapatan || 0)}`).join(' ')}
                                                            fill="none"
                                                            stroke="url(#lineGradient)"
                                                            strokeWidth="3.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="drop-shadow-sm"
                                                        />
                                                    )}

                                                    {/* Connecting Peak Dots */}
                                                    {reports.map((r: any, idx: number) => (
                                                        <circle
                                                            key={idx}
                                                            cx={getX(idx)}
                                                            cy={getY(r.total_pendapatan || 0)}
                                                            r="5"
                                                            fill="#f28b27"
                                                            stroke="#ffffff"
                                                            strokeWidth="2"
                                                            className="drop-shadow"
                                                        />
                                                    ))}

                                                    {/* X-Axis Bottom Line */}
                                                    <line
                                                        x1={paddingLeft}
                                                        y1={chartHeight - paddingBottom}
                                                        x2={chartWidth - paddingRight}
                                                        y2={chartHeight - paddingBottom}
                                                        stroke="#cbd5e1"
                                                        strokeWidth="1.5"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Table of statistics */}
                                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-white/40 border-b border-slate-200">
                                                        <th className="text-left px-5 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Bulan & Tahun</th>
                                                        <th className="text-right px-5 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Jumlah Transaksi</th>
                                                        <th className="text-right px-5 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Total Pendapatan</th>
                                                        <th className="text-center px-5 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Pertumbuhan (MoM)</th>
                                                        <th className="text-center px-5 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Tren</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200/50 bg-white/10">
                                                    {reports.map((r: any, idx: number) => {
                                                        const isUp = r.persen_pendapatan >= 0;
                                                        return (
                                                            <tr key={idx} className="hover:bg-white/20 transition-colors">
                                                                <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{r.label}</td>
                                                                <td className="px-5 py-3.5 text-sm text-slate-700 text-right font-medium">{r.total_pesanan} pesanan</td>
                                                                <td className="px-5 py-3.5 text-sm font-bold text-slate-900 text-right">{formatRupiah(r.total_pendapatan)}</td>
                                                                <td className="px-5 py-3.5 text-center">
                                                                    {idx === 0 ? (
                                                                        <span className="text-xs text-slate-400 italic font-medium">Bulan Awal</span>
                                                                    ) : (
                                                                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${isUp ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/50' : 'text-red-700 bg-red-50 border border-red-200/50'}`}>
                                                                            {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                                                                            {isUp ? '+' : ''}{r.persen_pendapatan}%
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-5 py-3.5 text-center">
                                                                    {idx === 0 ? (
                                                                        <span className="text-xs text-slate-400">-</span>
                                                                    ) : (
                                                                        <span className={`text-xs font-bold uppercase ${isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                                                                            {isUp ? 'Naik ▲' : 'Turun ▼'}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Kelola Produk */}
                    {activeTab === 'produk' && (
                        <div className="rounded-2xl border border-slate-200/60 shadow-lg overflow-hidden card-glass-light animate-in fade-in duration-200">
                            {/* Search & Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200/60 bg-white/30">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">Manajemen Produk</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">Tambah, edit, dan kelola katalog produk kacamata Anda.</p>
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative w-full md:w-64">
                                        <input
                                            type="text"
                                            placeholder="Cari produk..."
                                            value={searchProductQuery}
                                            onChange={(e) => setSearchProductQuery(e.target.value)}
                                            className="w-full h-9 pl-4 pr-10 rounded-lg text-sm text-slate-800 placeholder-slate-450 border border-slate-250 bg-white focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                    </div>
                                    <button
                                        onClick={startAddProduct}
                                        className="btn-orange-gradient flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg text-white shadow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex-shrink-0"
                                    >
                                        <Plus className="size-3.5" />
                                        <span>Tambah Produk</span>
                                    </button>
                                </div>
                            </div>

                            {/* Products Table */}
                            {filteredProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                                    <Package className="size-12 mb-3 text-slate-400" />
                                    <p className="text-sm font-medium text-slate-700">Produk tidak ditemukan</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-white/40 border-b border-slate-200/60">
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Gambar</th>
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Nama Produk</th>
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Merek / Tipe</th>
                                                <th className="text-right px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Harga</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Stok</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Gender</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200/50 bg-white/10">
                                            {filteredProducts.map((p: any) => {
                                                const hasOrderHistory = p.jumlah_dipesan > 0;
                                                return (
                                                    <tr key={p.id} className="hover:bg-white/20 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <img
                                                                src={p.gambar ? `/images/produk/${p.gambar}` : '/images/placeholder.png'}
                                                                alt={p.nama_produk}
                                                                className="w-12 h-12 object-contain bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm"
                                                                onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="text-sm font-bold text-slate-850 line-clamp-1">{p.nama_produk}</p>
                                                                <p className="text-[10px] text-slate-500 font-semibold font-mono">ID: {p.id}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="text-xs font-bold text-slate-700">{p.merek}</p>
                                                                <p className="text-[10px] text-slate-500 font-medium">{p.tipe_produk}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right font-bold text-slate-900 text-sm">
                                                            {formatRupiah(p.harga_produk)}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${p.stok > 0 ? 'bg-blue-50 border border-blue-250 text-blue-750' : 'bg-red-50 border border-red-250 text-red-750 animate-pulse'}`}>
                                                                {p.stok > 0 ? `${p.stok} unit` : 'Habis'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="text-xs font-semibold text-slate-700">{p.jenis_kelamin}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${p.status_produk === 'Aktif' ? 'bg-emerald-50 border-emerald-250 text-emerald-700' : 'bg-slate-50 border-slate-250 text-slate-600'}`}>
                                                                {p.status_produk}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="flex items-center justify-center gap-1">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => startEditProduct(p)}
                                                                    className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                                                                    title="Edit Produk"
                                                                >
                                                                    <Edit className="size-4" />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleHapusProduk(p)}
                                                                    disabled={hasOrderHistory}
                                                                    className={`p-1.5 rounded-lg transition-all ${
                                                                        hasOrderHistory 
                                                                            ? 'text-slate-300 cursor-not-allowed' 
                                                                            : 'hover:bg-red-50 text-red-500 hover:text-red-700 cursor-pointer'
                                                                    }`}
                                                                    title={hasOrderHistory ? 'Produk sudah pernah dipesan oleh pelanggan' : 'Hapus Produk'}
                                                                >
                                                                    <Trash2 className="size-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 4: Kelola Pengguna */}
                    {activeTab === 'pengguna' && (
                        <div className="rounded-2xl border border-slate-200/60 shadow-lg overflow-hidden card-glass-light animate-in fade-in duration-200">
                            {/* Search & Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200/60 bg-white/30">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">Manajemen Pengguna</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">Kelola hak akses dan peran pengguna terdaftar.</p>
                                </div>
                                <div className="w-full md:max-w-xs relative">
                                    <input
                                        type="text"
                                        placeholder="Cari nama atau email..."
                                        value={searchUserQuery}
                                        onChange={(e) => setSearchUserQuery(e.target.value)}
                                        className="w-full h-9 pl-4 pr-10 rounded-lg text-sm text-slate-800 placeholder-slate-450 border border-slate-250 bg-white focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                </div>
                            </div>

                            {/* User Table */}
                            {filteredUsers.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                                    <Users className="size-12 mb-3 text-slate-400" />
                                    <p className="text-sm font-medium text-slate-700">Tidak ada pengguna ditemukan</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-white/40 border-b border-slate-200/60">
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Nama Pengguna</th>
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Email</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Transaksi</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Peran (Role)</th>
                                                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Tanggal Daftar</th>
                                                <th className="text-center px-6 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200/50 bg-white/10">
                                            {filteredUsers.map((u: any) => {
                                                const isSelf = auth.user?.id === u.id;
                                                const canDelete = u.jumlah_pesanan === 0 && !isSelf;

                                                return (
                                                    <tr key={u.id} className="hover:bg-white/20 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                                                    {u.username?.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                                                                        {u.username}
                                                                        {isSelf && (
                                                                            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">Anda</span>
                                                                        )}
                                                                    </p>
                                                                    <p className="text-[10px] text-slate-500 font-medium font-mono">ID: {u.id}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">{u.email}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            {u.jumlah_pesanan > 0 ? (
                                                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 border border-blue-250 text-blue-750">
                                                                    {u.jumlah_pesanan} pesanan
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs text-slate-400 italic">0 transaksi</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <select
                                                                value={u.peran}
                                                                disabled={isSelf}
                                                                onChange={(e) => handleUpdatePeran(u.id, e.target.value)}
                                                                className={`text-xs border rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm font-semibold ${
                                                                    u.peran === 'Admin' 
                                                                        ? 'bg-purple-50 border-purple-250 text-purple-750' 
                                                                        : 'bg-slate-50 border-slate-250 text-slate-700'
                                                                }`}
                                                            >
                                                                <option value="Pengguna">Pengguna</option>
                                                                <option value="Admin">Admin</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-slate-600">
                                                            {formatTanggal(u.tanggal_daftar || u.created_at)}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleHapusPengguna(u)}
                                                                disabled={!canDelete}
                                                                className={`p-2 rounded-lg transition-all ${
                                                                    canDelete 
                                                                        ? 'hover:bg-red-50 text-red-500 hover:text-red-700 border border-transparent hover:border-red-200 cursor-pointer' 
                                                                        : 'text-slate-300 border border-transparent cursor-not-allowed'
                                                                }`}
                                                                title={isSelf ? 'Anda tidak dapat menghapus diri sendiri' : u.jumlah_pesanan > 0 ? 'Pengguna memiliki pesanan aktif' : 'Hapus Pengguna'}
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 5: Ulasan Pelanggan */}
                    {activeTab === 'ulasan' && (
                        <div className="rounded-2xl border border-slate-200/60 shadow-lg overflow-hidden card-glass-light animate-in fade-in duration-200">
                            {/* Filter and Search header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200/60 bg-white/30">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">Ulasan Pelanggan</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">Pantau feedback produk and rating dari pelanggan.</p>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                                    {/* Rating filter */}
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-semibold text-slate-500">Rating:</span>
                                        <select
                                            value={filterRating}
                                            onChange={(e) => setFilterRating(e.target.value)}
                                            className="text-xs bg-white border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer shadow-sm"
                                        >
                                            <option value="Semua">Semua Rating ▾</option>
                                            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                            <option value="4">⭐⭐⭐⭐ (4)</option>
                                            <option value="3">⭐⭐⭐ (3)</option>
                                            <option value="2">⭐⭐ (2)</option>
                                            <option value="1">⭐ (1)</option>
                                        </select>
                                    </div>
                                    {/* Review search */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Cari ulasan..."
                                            value={searchReviewQuery}
                                            onChange={(e) => setSearchReviewQuery(e.target.value)}
                                            className="h-9 pl-4 pr-10 rounded-lg text-sm text-slate-850 placeholder-slate-450 border border-slate-250 bg-white focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Reviews list */}
                            {filteredReviews.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                                    <MessageSquare className="size-12 mb-3 text-slate-400" />
                                    <p className="text-sm font-medium text-slate-700">Belum ada ulasan</p>
                                    <p className="text-xs text-slate-500 mt-1">Ulasan dari pelanggan pasca transaksi akan tampil di sini</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-200/50 bg-white/10">
                                    {filteredReviews.map((r: any) => (
                                        <div key={r.id} className="p-6 flex flex-col md:flex-row gap-5 hover:bg-white/20 transition-all">
                                            {/* Left Column: User & Rating */}
                                            <div className="w-full md:w-56 flex-shrink-0 space-y-2.5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-250 flex items-center justify-center text-slate-700 font-bold text-xs uppercase shadow-inner">
                                                        {r.user?.username?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-850 truncate max-w-[150px]">{r.user?.username || 'Pelanggan'}</p>
                                                        <p className="text-[10px] text-slate-500 truncate max-w-[150px]">{r.user?.email || ''}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star
                                                                key={s}
                                                                className={`size-4 ${s <= (r.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-350'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                                                        <Calendar className="size-3" />
                                                        {formatTanggal(r.tanggal_ulasan || r.created_at)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Center Column: Review Text & Photo */}
                                            <div className="flex-1 space-y-3">
                                                <div className="bg-white/50 p-4 rounded-xl border border-slate-200/60 shadow-inner">
                                                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                                                        {r.komentar || <span className="text-slate-400 italic">"Tidak ada komentar tertulis."</span>}
                                                    </p>
                                                </div>

                                                {/* Optional Review Image */}
                                                {r.foto_ulasan && (
                                                    <div className="inline-block relative group/img cursor-pointer">
                                                        <img
                                                            src={`/images/ulasan/${r.foto_ulasan}`}
                                                            alt="Foto Ulasan"
                                                            onClick={() => setExpandedReviewImage(`/images/ulasan/${r.foto_ulasan}`)}
                                                            className="h-16 w-16 object-cover rounded-lg border border-slate-200 p-0.5 bg-white shadow-sm hover:scale-105 hover:shadow transition-all duration-200"
                                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Column: Associated Product */}
                                            <div className="w-full md:w-60 flex-shrink-0">
                                                {r.produk ? (
                                                    <div className="flex gap-3 p-3 bg-white/40 border border-slate-200 rounded-xl hover:bg-white/60 transition-colors">
                                                        <img
                                                            src={r.produk.gambar ? `/images/produk/${r.produk.gambar}` : '/images/placeholder.png'}
                                                            alt={r.produk.nama_produk}
                                                            className="w-12 h-12 object-contain bg-white border border-slate-200 rounded-lg p-0.5 flex-shrink-0"
                                                            onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
                                                        />
                                                        <div className="min-w-0">
                                                            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-wider">{r.produk.merek}</p>
                                                            <p className="text-xs font-bold text-slate-800 truncate" title={r.produk.nama_produk}>{r.produk.nama_produk}</p>
                                                            <Link
                                                                href={`/produk/${r.produk.id}`}
                                                                className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline font-semibold block mt-0.5"
                                                            >
                                                                Lihat Halaman Produk →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-slate-400 italic p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                                                        Produk tidak teridentifikasi
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {filteredReviews.length > 0 && (
                                <div className="px-6 py-4 border-t border-slate-200/60 bg-white/30 flex items-center justify-between">
                                    <p className="text-sm text-slate-500">
                                        Menampilkan <span className="font-semibold text-slate-800">{filteredReviews.length}</span> dari <span className="font-semibold text-slate-800">{daftarUlasan?.length || 0}</span> ulasan
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 6: Chat Pelanggan */}
                    {activeTab === 'chat' && (
                        <div className="flex flex-col lg:flex-row rounded-2xl border border-slate-200/60 shadow-lg overflow-hidden card-glass-light h-[650px] animate-in fade-in duration-200">
                            {/* Left Column: Chat Contacts */}
                            <div className="w-full lg:w-80 border-r border-slate-200/60 flex flex-col bg-white/20">
                                <div className="p-4 border-b border-slate-200/60 bg-white/30">
                                    <h3 className="font-bold text-slate-800 text-sm">Percakapan Pelanggan</h3>
                                    <p className="text-[11px] text-slate-500 mt-0.5">Pilih pelanggan untuk membalas</p>
                                    <div className="relative mt-3">
                                        <input
                                            type="text"
                                            placeholder="Cari kontak..."
                                            value={searchContactQuery}
                                            onChange={(e) => setSearchContactQuery(e.target.value)}
                                            className="w-full h-8 pl-3 pr-8 rounded-lg text-xs text-slate-800 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto divide-y divide-slate-100/50">
                                    {chatContacts && chatContacts.filter((c: any) => 
                                        safe(c.username).toLowerCase().includes(searchContactQuery.toLowerCase()) ||
                                        safe(c.email).toLowerCase().includes(searchContactQuery.toLowerCase())
                                    ).length === 0 ? (
                                        <div className="p-6 text-center text-xs text-slate-500">Tidak ada kontak chat</div>
                                    ) : (
                                        chatContacts && chatContacts.filter((c: any) => 
                                            safe(c.username).toLowerCase().includes(searchContactQuery.toLowerCase()) ||
                                            safe(c.email).toLowerCase().includes(searchContactQuery.toLowerCase())
                                        ).map((contact: any) => {
                                            const isSelected = activeChatUserId === contact.id;
                                            return (
                                                <button
                                                    key={contact.id}
                                                    onClick={() => router.visit(`/dashboard?tab=chat&chat_user_id=${contact.id}`, { preserveScroll: true })}
                                                    className={`w-full text-left p-4 flex gap-3 transition-colors hover:bg-white/30 cursor-pointer ${
                                                        isSelected ? 'bg-white/40 border-l-4 border-orange-500 pl-3 font-semibold' : ''
                                                    }`}
                                                >
                                                    <div className="w-9 h-9 rounded-full bg-[#3668b5]/10 border border-[#3668b5]/20 text-[#3668b5] font-bold text-sm flex items-center justify-center flex-shrink-0">
                                                        {contact.username?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-baseline">
                                                            <p className="text-xs font-bold text-slate-800 truncate">{contact.username}</p>
                                                            {contact.last_message_time && (
                                                                <span className="text-[9px] text-slate-400">
                                                                    {new Date(contact.last_message_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{contact.last_message || 'Kirim gambar/pesan...'}</p>
                                                    </div>
                                                    {contact.unread_count > 0 && (
                                                        <span className="w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                                                            {contact.unread_count}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Chat Messages View */}
                            <div className="flex-1 flex flex-col bg-slate-50/10 backdrop-blur-[2px]">
                                {!activeChatUserId ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 gap-3">
                                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-[#3668b5]">
                                            <MessageCircle className="size-10 stroke-[1.5]" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-855 text-sm">Pilih Pelanggan</h3>
                                            <p className="text-xs text-slate-500 mt-1 max-w-[280px]">Pilih salah satu chat pelanggan di panel kiri untuk mulai membalas pesan.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Chat Area Header */}
                                        <div className="px-6 py-4 border-b border-slate-200/60 bg-white/30 flex items-center justify-between flex-shrink-0">
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-800">
                                                    {chatContacts.find((c: any) => c.id === activeChatUserId)?.username || 'Pelanggan'}
                                                </h4>
                                                <p className="text-[10px] text-slate-500 font-medium">
                                                    {chatContacts.find((c: any) => c.id === activeChatUserId)?.email || ''}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Hubungan Aktif</span>
                                            </div>
                                        </div>

                                        {/* Messages List */}
                                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                            {chatMessages && chatMessages.length === 0 ? (
                                                <div className="text-center text-xs text-slate-400 py-10">Belum ada pesan</div>
                                            ) : (
                                                chatMessages && chatMessages.map((m: any) => {
                                                    const isMe = m.pengirim_id === auth.user.id;
                                                    return (
                                                        <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}>
                                                            <div className="max-w-[70%] flex flex-col gap-1">
                                                                {/* Optional Product context card inside bubble */}
                                                                {m.produk && (
                                                                    <div className={`p-2 rounded-t-2xl border flex items-center gap-2.5 ${
                                                                        isMe 
                                                                            ? 'bg-orange-600/10 border-orange-500/20 text-orange-950' 
                                                                            : 'bg-blue-600/10 border-blue-500/20 text-blue-950'
                                                                    }`}>
                                                                        <img
                                                                            src={m.produk.gambar ? `/images/produk/${encodeURIComponent(m.produk.gambar)}` : '/images/placeholder.png'}
                                                                            alt={m.produk.nama_produk}
                                                                            className="h-8 w-8 object-contain rounded-md bg-white p-0.5 border"
                                                                        />
                                                                        <div className="min-w-0">
                                                                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{m.produk.merek}</p>
                                                                            <p className="text-[10px] font-bold truncate max-w-[150px]">{m.produk.nama_produk}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className={`px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                                                                    isMe
                                                                        ? `btn-orange-gradient text-white rounded-tr-none ${m.produk ? 'rounded-tl-none' : ''}`
                                                                        : `bg-white text-slate-800 border border-slate-200/60 rounded-tl-none ${m.produk ? 'rounded-tr-none' : ''}`
                                                                }`}>
                                                                    <p>{m.pesan}</p>
                                                                </div>
                                                                <span className={`text-[9px] text-slate-400 mt-0.5 ${isMe ? 'text-right' : 'text-left'}`}>
                                                                    {new Date(m.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                            <div ref={adminMessagesEndRef} />
                                        </div>

                                        {/* Input Box */}
                                        <form onSubmit={handleAdminSendReply} className="p-4 border-t border-slate-200/60 bg-white/40 flex items-center gap-3 flex-shrink-0">
                                            <input
                                                type="text"
                                                value={adminReplyText}
                                                onChange={(e) => setAdminReplyText(e.target.value)}
                                                placeholder="Ketik balasan Anda ke pembeli..."
                                                className="flex-1 px-4 h-10 bg-white border border-slate-200/60 rounded-xl text-xs font-medium focus:outline-none focus:border-[#3668b5] focus:ring-1 focus:ring-[#3668b5] transition-all text-slate-800"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!adminReplyText.trim()}
                                                className="h-10 w-10 flex items-center justify-center rounded-xl btn-orange-gradient text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                <Send className="size-4" />
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal Tambah/Edit Produk */}
            {showProductModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-350 animate-in fade-in">
                    <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden transform scale-100 transition-transform duration-300 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 flex-shrink-0">
                            <div>
                                <h3 className="text-base font-bold text-slate-850">
                                    {editingProduct ? 'Edit Produk Kacamata' : 'Tambah Produk Baru'}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {editingProduct ? 'Perbarui data spesifikasi produk.' : 'Isi formulir untuk menambahkan kacamata baru.'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowProductModal(false)}
                                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-750 transition-colors cursor-pointer"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSaveProduct} className="flex flex-col flex-1 overflow-hidden">
                            {/* Scrollable Form Body */}
                            <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white text-slate-750">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Nama Produk */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Nama Produk *</label>
                                        <input
                                            type="text"
                                            required
                                            value={productForm.nama_produk}
                                            onChange={(e) => setProductForm({ ...productForm, nama_produk: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-850 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    {/* Merek */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Merek *</label>
                                        <input
                                            type="text"
                                            required
                                            value={productForm.merek}
                                            onChange={(e) => setProductForm({ ...productForm, merek: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Tipe Produk */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Tipe Produk *</label>
                                        <input
                                            type="text"
                                            required
                                            value={productForm.tipe_produk}
                                            onChange={(e) => setProductForm({ ...productForm, tipe_produk: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    {/* Harga Produk */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Harga (Rp) *</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={productForm.harga_produk}
                                            onChange={(e) => setProductForm({ ...productForm, harga_produk: parseInt(e.target.value) || 0 })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    {/* Stok */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Stok Unit *</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={productForm.stok}
                                            onChange={(e) => setProductForm({ ...productForm, stok: parseInt(e.target.value) || 0 })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Jenis Kelamin */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Gender *</label>
                                        <select
                                            value={productForm.jenis_kelamin}
                                            onChange={(e) => setProductForm({ ...productForm, jenis_kelamin: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500 appearance-auto"
                                        >
                                            <option value="Pria">Pria</option>
                                            <option value="Wanita">Wanita</option>
                                            <option value="Unisex">Unisex</option>
                                        </select>
                                    </div>
                                    {/* Warna */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Warna *</label>
                                        <input
                                            type="text"
                                            required
                                            value={productForm.warna}
                                            onChange={(e) => setProductForm({ ...productForm, warna: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    {/* Material */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Material *</label>
                                        <input
                                            type="text"
                                            required
                                            value={productForm.material}
                                            onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    {/* Bentuk */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Bentuk *</label>
                                        <input
                                            type="text"
                                            required
                                            value={productForm.bentuk}
                                            onChange={(e) => setProductForm({ ...productForm, bentuk: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    {/* Bridge */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Bridge (mm)</label>
                                        <input
                                            type="text"
                                            value={productForm.bridge}
                                            onChange={(e) => setProductForm({ ...productForm, bridge: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    {/* Diagonal */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Diagonal (mm)</label>
                                        <input
                                            type="text"
                                            value={productForm.diagonal}
                                            onChange={(e) => setProductForm({ ...productForm, diagonal: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    {/* Ukuran */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Ukuran (mm)</label>
                                        <input
                                            type="text"
                                            value={productForm.ukuran}
                                            onChange={(e) => setProductForm({ ...productForm, ukuran: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Status Produk */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Status Katalog *</label>
                                        <select
                                            value={productForm.status_produk}
                                            onChange={(e) => setProductForm({ ...productForm, status_produk: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500 appearance-auto"
                                        >
                                            <option value="Aktif">Aktif (Tampil di Katalog)</option>
                                            <option value="Nonaktif">Nonaktif (Sembunyikan)</option>
                                        </select>
                                    </div>
                                    {/* Gambar Manual */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600 block">Nama File Gambar (opsional)</label>
                                        <input
                                            type="text"
                                            placeholder="misal: kacamata-baru.png"
                                            value={productForm.gambar}
                                            onChange={(e) => setProductForm({ ...productForm, gambar: e.target.value })}
                                            className="w-full h-9 px-3 rounded-lg text-sm text-slate-855 border border-slate-250 bg-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Gambar File Upload */}
                                <div className="space-y-1 p-3 rounded-xl border border-slate-200 bg-slate-50">
                                    <label className="text-xs font-bold text-slate-600 block">Unggah Gambar Baru</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files ? e.target.files[0] : null;
                                            setProductForm({ ...productForm, gambar_file: file });
                                        }}
                                        className="text-xs text-slate-600 mt-1 cursor-pointer block file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">Format: JPG, JPEG, PNG (Maks 2MB). Jika diunggah, nama file di atas akan diabaikan.</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setShowProductModal(false)}
                                    className="flex-1 py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 px-4 btn-orange-gradient text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center shadow-md"
                                >
                                    {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Popup Alasan Pembatalan */}
            {cancelReasonPopup && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setCancelReasonPopup(null)}
                >
                    <div
                        className="relative w-full max-w-sm bg-white border border-red-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top bar merah */}
                        <div className="h-1.5 bg-gradient-to-r from-red-400 via-red-500 to-rose-500" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-red-100 bg-red-50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
                                    <XCircle className="size-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-red-700">Alasan Pembatalan</p>
                                    <p className="text-[11px] text-red-400 font-mono">{cancelReasonPopup.no_pesanan}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCancelReasonPopup(null)}
                                className="p-1.5 rounded-lg hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-5 py-5 space-y-3">
                            {cancelReasonPopup.tanggal_pembatalan && (
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Calendar className="size-3.5 text-slate-400" />
                                    <span>Dibatalkan pada: <span className="font-semibold text-slate-700">{formatTanggal(cancelReasonPopup.tanggal_pembatalan)}</span></span>
                                </div>
                            )}
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                                <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1.5">Alasan</p>
                                <p className="text-sm text-red-700 font-medium leading-relaxed">
                                    {cancelReasonPopup.alasan_pembatalan || 'Tidak ada alasan yang dicatat.'}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 pb-5">
                            <button
                                type="button"
                                onClick={() => setCancelReasonPopup(null)}
                                className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Bukti Kuitansi Pembayaran Digital (Lunas) */}
            {selectedReceipt && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
                    <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden transform scale-100 transition-transform duration-300 animate-in zoom-in-95 duration-200">
                        {/* Top decorative gradient bar */}
                        <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />
                        
                        {/* Modal Header */}
                        <div className="p-6 flex flex-col items-center border-b border-dashed border-slate-200 bg-slate-50">
                            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-250 mb-3 shadow-inner">
                                <CheckCircle className="size-6" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800 tracking-tight">TRANSAKSI BERHASIL</h3>
                            <p className="text-[11px] font-bold text-emerald-600 tracking-widest uppercase mt-0.5 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
                                LUNAS
                            </p>
                        </div>

                        {/* Receipt Content */}
                        <div className="p-6 space-y-4 bg-white relative">
                            {/* Wavy/decorative background circles for receipt look */}
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full border border-slate-200" />
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full border border-slate-200" />
                            
                            <div className="flex justify-center items-center gap-1.5 opacity-80 mb-2">
                                <img src="/images/logo/AuthMobile.svg" alt="EyeLit Logo" className="h-6 w-auto" />
                                <span className="text-sm font-bold text-slate-800 tracking-tight">EyeLit Receipt</span>
                            </div>

                            <div className="space-y-2.5 text-xs text-slate-600">
                                <div className="flex justify-between gap-4">
                                    <span className="text-slate-500">ID Pembayaran (Xendit)</span>
                                    <span className="font-mono font-semibold text-slate-800 text-right select-all truncate max-w-[200px]" title={selectedReceipt.xendit_payment_id}>
                                        {selectedReceipt.xendit_payment_id || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="text-slate-500">No. Pesanan</span>
                                    <span className="font-mono font-bold text-blue-600 text-right">
                                        {selectedReceipt.no_pesanan || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Waktu Transaksi</span>
                                    <span className="font-medium text-slate-800 text-right">
                                        {formatTanggal(selectedReceipt.tanggal_konfirmasi_pembayaran || selectedReceipt.updated_at)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Metode Pembayaran</span>
                                    <span className="font-medium text-slate-800 text-right">
                                        {selectedReceipt.metode_pembayaran || 'QRIS / Transfer Bank'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Pengirim (Pelanggan)</span>
                                    <span className="font-medium text-slate-800 text-right">
                                        {selectedReceipt.nama_pelanggan || '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Penerima</span>
                                    <span className="font-medium text-slate-800 text-right">
                                        EyeLit Official Store
                                    </span>
                                </div>
                                
                                <div className="pt-3 border-t border-dashed border-slate-200 mt-2 font-bold text-slate-850">
                                    <div className="flex justify-between items-center">
                                        <span>Total Nominal</span>
                                        <span className="text-base font-bold text-emerald-600">
                                            {formatRupiah(selectedReceipt.total_harga)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
                            <button
                                type="button"
                                onClick={() => { window.print(); }}
                                className="flex-1 py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
                            >
                                Cetak Kuitansi
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedReceipt(null)}
                                className="flex-1 py-2.5 px-4 bg-[#3668b5] hover:bg-[#2e5aa1] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer text-center shadow"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Detail Pesanan Pelanggan (In-place Popup) */}
            {selectedOrderDetail && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
                    <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden transform scale-100 transition-transform duration-300 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                            <div>
                                <h3 className="text-base font-bold text-slate-800">Detail Pesanan</h3>
                                <p className="text-xs text-slate-500 mt-0.5">No. Pesanan: <span className="font-mono font-semibold text-blue-600">{selectedOrderDetail.no_pesanan || '-'}</span></p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedOrderDetail(null)}
                                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-750 transition-colors cursor-pointer"
                                title="Tutup"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1">
                            {/* Status & Tanggal */}
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div>
                                    <span className="text-xs text-slate-500 block font-medium">Tanggal Pemesanan</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatTanggal(selectedOrderDetail.tanggal_pemesanan)}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-slate-500 block font-medium mb-1">Status Pesanan</span>
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[selectedOrderDetail.status_pesanan] ?? 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                                        {selectedOrderDetail.status_pesanan || '-'}
                                    </span>
                                </div>
                            </div>

                            {/* Alasan Pembatalan */}
                            {selectedOrderDetail.status_pesanan === 'Dibatalkan' && (
                                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                                    <XCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-red-700 mb-0.5">Pesanan Dibatalkan</p>
                                        {selectedOrderDetail.tanggal_pembatalan && (
                                            <p className="text-[11px] text-red-500 mb-1.5">
                                                Dibatalkan pada: {formatTanggal(selectedOrderDetail.tanggal_pembatalan)}
                                            </p>
                                        )}
                                        <p className="text-xs text-red-600 font-medium bg-red-100 px-3 py-2 rounded-lg border border-red-200">
                                            {selectedOrderDetail.alasan_pembatalan || 'Tidak ada alasan yang dicatat.'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Daftar Produk */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                                    <Package className="size-4 text-blue-600" /> Produk Dipesan
                                </h4>
                                <div className="space-y-3.5">
                                    {(selectedOrderDetail.detail_pesanan ?? []).map((d: any) => (
                                        <div key={d.id} className="flex gap-4 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-150 transition-colors">
                                            <img
                                                src={d.produk?.gambar ? `/images/produk/${d.produk.gambar}` : '/images/placeholder.png'}
                                                alt={safe(d.produk?.nama_produk)}
                                                className="w-16 h-16 object-contain rounded-lg bg-white border border-slate-200 p-1 flex-shrink-0"
                                                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] text-blue-600 font-semibold tracking-wider uppercase">{safe(d.produk?.merek)}</p>
                                                <p className="text-sm font-bold text-slate-800 truncate">{safe(d.produk?.nama_produk)}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{safe(d.tipe_pembelian)} · ×{d.jumlah ?? 0}</p>
                                                
                                                {safe(d.tipe_pembelian) === 'Frame + Lensa' && (
                                                    <div className="text-[11px] text-slate-600 mt-1.5 space-y-0.5 bg-white p-2 rounded-lg border border-slate-200">
                                                        {d.jenis_lensa_od && <p><span className="font-semibold text-slate-800">OD:</span> {safe(d.jenis_lensa_od)} {safe(d.nilai_lensa_od)}{d.silinder_od ? ` / Sil ${safe(d.silinder_od)}` : ''}</p>}
                                                        {d.jenis_lensa_os && <p><span className="font-semibold text-slate-800">OS:</span> {safe(d.jenis_lensa_os)} {safe(d.nilai_lensa_os)}{d.silinder_os ? ` / Sil ${safe(d.silinder_os)}` : ''}</p>}
                                                        {d.anti_radiasi && <p className="text-blue-600 font-semibold">+ Anti Radiasi</p>}
                                                        {d.photochromic && <p className="text-indigo-600 font-semibold">+ Photochromic</p>}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-bold text-blue-600">Rp {Number(d.subtotal ?? 0).toLocaleString('id-ID')}</p>
                                                <p className="text-[10px] text-slate-500 mt-0.5">Rp {Number(d.harga_frame ?? 0).toLocaleString('id-ID')} / pcs</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Alamat Pengiriman */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col">
                                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                                        <MapPin className="size-4 text-blue-600" /> Alamat Pengiriman
                                    </h4>
                                    {selectedOrderDetail.alamat ? (
                                        <div className="text-xs text-slate-500 space-y-2 flex-1">
                                            <p className="font-bold text-slate-850 text-sm">
                                                {safe(selectedOrderDetail.alamat.nama_penerima)}
                                            </p>
                                            <p className="font-medium text-slate-650 font-semibold">
                                                {safe(selectedOrderDetail.alamat.no_hp_penerima)}
                                            </p>
                                            <p className="leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium">
                                                {safe(selectedOrderDetail.alamat.alamat_lengkap)}, Kec. {safe(selectedOrderDetail.alamat.kecamatan)}, {safe(selectedOrderDetail.alamat.kota_kabupaten)}, Prov. {safe(selectedOrderDetail.alamat.provinsi?.nama_provinsi)}, {safe(selectedOrderDetail.alamat.kode_pos)}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 italic">Alamat pengiriman tidak ditentukan.</p>
                                    )}
                                </div>

                                {/* Detail Pengiriman & Pembayaran */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col">
                                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                                        <Truck className="size-4 text-blue-600" /> Kurir & Pembayaran
                                    </h4>
                                    <div className="text-xs text-slate-500 space-y-2.5 flex-1">
                                        <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                                            <span className="text-slate-500 font-medium">Ekspedisi</span>
                                            <span className="font-semibold text-slate-700">{safe(selectedOrderDetail.ekspedisi?.nama_ekspedisi) || '-'}</span>
                                        </div>
                                        {selectedOrderDetail.no_resi && (
                                            <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                                                <span className="text-slate-500 font-medium">No. Resi</span>
                                                <span className="font-mono font-semibold text-blue-600 select-all">{safe(selectedOrderDetail.no_resi)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                                            <span className="text-slate-500 font-medium">Metode</span>
                                            <span className="font-semibold text-slate-700">{safe(selectedOrderDetail.metode_pembayaran) || '-'}</span>
                                        </div>
                                        
                                        <div className="pt-2 border-t border-slate-200 space-y-1.5">
                                            <div className="flex justify-between text-slate-500">
                                                <span>Ongkos Kirim</span>
                                                <span className="text-slate-755 font-medium">Rp {Number(selectedOrderDetail.ongkos_kirim ?? 0).toLocaleString('id-ID')}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-slate-850 text-sm pt-1 border-t border-slate-200/60">
                                                <span>Total Bayar</span>
                                                <span className="text-blue-600 text-base font-bold">Rp {Number(selectedOrderDetail.total_harga ?? 0).toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3 flex-shrink-0">
                            <Link
                                href={`/pesanan/${selectedOrderDetail.id}`}
                                className="flex-1 py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                                onClick={() => setSelectedOrderDetail(null)}
                            >
                                Buka Halaman Detail
                            </Link>
                            {['Dikemas', 'Dikirim', 'Pesanan Tiba di Tujuan', 'Selesai'].includes(selectedOrderDetail.status_pesanan) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedReceipt(selectedOrderDetail);
                                        setSelectedOrderDetail(null);
                                    }}
                                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center shadow-sm"
                                >
                                    Kuitansi Lunas
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setSelectedOrderDetail(null)}
                                className="py-2.5 px-6 bg-[#3668b5] hover:bg-[#2b5493] text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center shadow"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Zoom Foto Ulasan */}
            {expandedReviewImage && (
                <div
                    onClick={() => setExpandedReviewImage(null)}
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-200"
                >
                    <div className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-white border border-white/20 p-2 shadow-2xl">
                        <img
                            src={expandedReviewImage}
                            alt="Ulasan Pembeli Zoom"
                            className="max-w-full max-h-[80vh] object-contain rounded-xl"
                        />
                        <button
                            onClick={() => setExpandedReviewImage(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors shadow"
                        >
                            <X className="size-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [],
};
