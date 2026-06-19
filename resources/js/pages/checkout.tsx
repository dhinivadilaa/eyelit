import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Bell, BookOpen, LogOut, MapPin, Plus, Settings, ShoppingBag, ShoppingCart, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// 🔥 safe helper — aman untuk nilai null/undefined
const safe = (v: any) => (v ?? "").toString().trim();

interface Item {
    id: number | string;
    produk_id: number;
    nama_produk: string;
    merek: string;
    gambar: string;
    harga_produk: number;
    jumlah: number;
    tipe_pembelian: string;
    harga_lensa: number;
    subtotal: number;
    is_langsung?: boolean;
    jenis_lensa_od?: string | null;
    nilai_lensa_od?: string | null;
    silinder_od?: string | null;
    jenis_lensa_os?: string | null;
    nilai_lensa_os?: string | null;
    silinder_os?: string | null;
    anti_radiasi?: boolean | number;
    photochromic?: boolean | number;
}

interface Alamat {
    id: number;
    nama_penerima: string;
    no_hp_penerima: string;
    kode_kota?: string | null; // ← TAMBAHKAN FIELD INI
    kota_kabupaten: string;
    kecamatan: string;
    kode_pos: string;
    alamat_lengkap: string;
    alamat_utama: boolean;
    provinsi: { id: number; nama_provinsi: string; ongkir?: { harga: number; estimasi_hari_min: string; estimasi_hari_max: string } };
}

interface Provinsi {
    id: number;
    nama_provinsi: string;
    ongkir?: { harga: number; estimasi_hari_min: string; estimasi_hari_max: string };
}

interface Kota {
    id: number;
    nama_kota: string;
    kode_kota: string;
    provinsi_id: number;
}

interface Ekspedisi {
    id: number;
    nama_ekspedisi: string;
    kode: string;
}

export default function Checkout() {
    const pageProps = usePage().props as any;
    const { auth, items, total, alamat, ekspedisi } = pageProps;
    const keranjangCount: number = auth.keranjang_count || 0;

    // 🔥 guard array props agar tidak crash saat undefined
    const alamatList: Alamat[]       = Array.isArray(alamat)    ? alamat    : [];
    const ekspedisiList: Ekspedisi[] = Array.isArray(ekspedisi) ? ekspedisi : [];
    const itemList: Item[]           = Array.isArray(items)     ? items     : [];
    const totalHarga: number         = Number(total ?? 0);

    const [showUserDropdown, setShowUserDropdown]   = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [showTambahAlamat, setShowTambahAlamat]   = useState(false);
    const [editingAlamatId, setEditingAlamatId]     = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting]           = useState(false);


    const userDropdownTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notifications: any[] = auth.user?.notifications || [];
    const unreadNotificationsCount = notifications.filter((n: any) => !n.dibaca).length;

    // Provinsi states - sekarang fetch dari API RajaOngkir
    const [provinsiList, setProvinsiList] = useState<Provinsi[]>([]);
    const [loadingProvinsi, setLoadingProvinsi] = useState<boolean>(true);

    // guard find/[0] dengan fallback null
    const [selectedAlamat, setSelectedAlamat] = useState<Alamat | null>(
        alamatList.find((a) => a.alamat_utama) || alamatList[0] || null
    );

    // Keep selectedAlamat synchronized when alamat list changes
    useEffect(() => {
        if (selectedAlamat) {
            const fresh = alamatList.find((a) => a.id === selectedAlamat.id);
            if (fresh) {
                setSelectedAlamat(fresh);
            } else {
                setSelectedAlamat(alamatList.find((a) => a.alamat_utama) || alamatList[0] || null);
            }
        } else if (alamatList.length > 0) {
            setSelectedAlamat(alamatList.find((a) => a.alamat_utama) || alamatList[0] || null);
        }
    }, [alamat, selectedAlamat?.id]);
    const [selectedEkspedisi, setSelectedEkspedisi] = useState<Ekspedisi | null>(
        ekspedisiList[0] || null
    );
    const [metodePembayaran, setMetodePembayaran] = useState<string>('QRIS');

    // Kota states
    const [kotaList, setKotaList]       = useState<Kota[]>([]);
    const [loadingKota, setLoadingKota] = useState<boolean>(false);
    const [selectedKota, setSelectedKota] = useState<Kota | null>(null);
    const [kotaError, setKotaError]     = useState<string | null>(null);

    // Kota states untuk form tambah alamat
    const [alamatKotaList, setAlamatKotaList] = useState<Kota[]>([]);
    const [loadingAlamatKota, setLoadingAlamatKota] = useState<boolean>(false);

    // Fetch provinsi dari API RajaOngkir saat komponen mount
    useEffect(() => {
        const fetchProvinsi = async () => {
            try {
                setLoadingProvinsi(true);
                const response = await fetch('/api/provinsi');
                if (!response.ok) throw new Error('Gagal memuat daftar provinsi');
                const raw: any[] = await response.json();
                console.log('Provinsi API returned:', raw);

                const mapped: Provinsi[] = raw.map((item: any) => ({
                    id: item.id,
                    nama_provinsi: item.nama_provinsi ?? item.province ?? '',
                }));

                setProvinsiList(mapped);
            } catch (error) {
                console.error('Error fetching provinsi:', error);
                // Fallback ke hardcoded provinsi jika API gagal
                setProvinsiList([
                    { id: 1, nama_provinsi: 'Aceh' },
                    { id: 2, nama_provinsi: 'Sumatera Utara' },
                    { id: 3, nama_provinsi: 'Sumatera Barat' },
                    { id: 4, nama_provinsi: 'Riau' },
                    { id: 5, nama_provinsi: 'Jambi' },
                    { id: 6, nama_provinsi: 'Sumatera Selatan' },
                    { id: 7, nama_provinsi: 'Bengkulu' },
                    { id: 8, nama_provinsi: 'Lampung' },
                    { id: 9, nama_provinsi: 'DKI Jakarta' },
                    { id: 10, nama_provinsi: 'Jawa Barat' },
                    { id: 11, nama_provinsi: 'Jawa Tengah' },
                    { id: 12, nama_provinsi: 'DI Yogyakarta' },
                    { id: 13, nama_provinsi: 'Jawa Timur' },
                    { id: 14, nama_provinsi: 'Banten' },
                    { id: 15, nama_provinsi: 'Bali' },
                    { id: 16, nama_provinsi: 'Nusa Tenggara Barat' },
                    { id: 17, nama_provinsi: 'Nusa Tenggara Timur' },
                    { id: 18, nama_provinsi: 'Kalimantan Barat' },
                    { id: 19, nama_provinsi: 'Kalimantan Tengah' },
                    { id: 20, nama_provinsi: 'Kalimantan Selatan' },
                    { id: 21, nama_provinsi: 'Kalimantan Timur' },
                    { id: 22, nama_provinsi: 'Kalimantan Utara' },
                    { id: 23, nama_provinsi: 'Sulawesi Utara' },
                    { id: 24, nama_provinsi: 'Sulawesi Tengah' },
                    { id: 25, nama_provinsi: 'Sulawesi Selatan' },
                    { id: 26, nama_provinsi: 'Sulawesi Tenggara' },
                    { id: 27, nama_provinsi: 'Gorontalo' },
                    { id: 28, nama_provinsi: 'Sulawesi Barat' },
                    { id: 29, nama_provinsi: 'Maluku' },
                    { id: 30, nama_provinsi: 'Maluku Utara' },
                    { id: 31, nama_provinsi: 'Papua Barat' },
                    { id: 32, nama_provinsi: 'Papua' },
                    { id: 33, nama_provinsi: 'Papua Tengah' },
                    { id: 34, nama_provinsi: 'Papua Pegunungan' },
                    { id: 35, nama_provinsi: 'Papua Selatan' },
                    { id: 36, nama_provinsi: 'Papua Barat Daya' },
                ]);
            } finally {
                setLoadingProvinsi(false);
            }
        };

        fetchProvinsi();
    }, []);

    // ✅ FIX UTAMA: mapping fleksibel agar cocok dengan semua kemungkinan field dari backend
    const fetchKota = async (provinsiId: string) => {
        if (!provinsiId) {
            setKotaList([]);
            setSelectedKota(null);
            setKotaError(null);
            return;
        }
        setLoadingKota(true);
        setKotaError(null);
        try {
            const response = await fetch(`/api/kota/${provinsiId}`);
            if (!response.ok) throw new Error('Gagal memuat daftar kota');
            const raw: any[] = await response.json();

            // 🔥 FIX: mapping fleksibel — support semua kemungkinan field dari backend
            // Prioritas: nama_kota → nama → name → fallback string(id)
            // Prioritas kode: kode_kota → kode → fallback string(id)
            const mapped: Kota[] = raw.map((item: any) => ({
                id:          item.id,
                nama_kota:   item.nama_kota   ?? item.nama   ?? item.name ?? String(item.id),
                kode_kota:   item.kode_kota   ?? item.kode   ?? String(item.id),
                provinsi_id: item.provinsi_id ?? Number(provinsiId),
            }));

            setKotaList(mapped);
            setSelectedKota(mapped[0] || null);
        } catch (error) {
            console.error('Error fetching kota:', error);
            setKotaError('Gagal memuat daftar kota. Coba lagi.');
            setKotaList([]);
            setSelectedKota(null);
        } finally {
            setLoadingKota(false);
        }
    };

    // Function untuk fetch kota di form tambah alamat
    const fetchAlamatKota = async (provinsiId: string, provinsiNama: string = '') => {
        console.log('fetchAlamatKota called with provinsiId:', provinsiId, 'provinsiNama:', provinsiNama);
        if (!provinsiId) {
            setAlamatKotaList([]);
            alamatForm.setData('kode_kota', '');
            alamatForm.setData('nama_kota', '');
            alamatForm.setData('kota_kabupaten', '');
            return;
        }

        setAlamatKotaList([]);
        alamatForm.setData('kode_kota', '');
        alamatForm.setData('nama_kota', '');
        alamatForm.setData('kota_kabupaten', '');
        setLoadingAlamatKota(true);
        try {
            const query = provinsiNama ? `?provinsi_name=${encodeURIComponent(provinsiNama)}` : '';
            console.log('Fetching from API:', `/api/kota/${provinsiId}${query}`);
            const response = await fetch(`/api/kota/${provinsiId}${query}`);
            console.log('Response status:', response.status);
            if (!response.ok) {
                console.error('Response not ok:', response.status, response.statusText);
                throw new Error('Gagal memuat daftar kota');
            }
            const raw: any[] = await response.json();
            console.log('API returned data:', raw);

            const mapped: Kota[] = raw.map((item: any) => ({
                id:          item.id,
                nama_kota:   item.nama_kota   ?? item.nama   ?? item.name ?? String(item.id),
                kode_kota:   item.kode_kota   ?? item.kode   ?? String(item.id),
                provinsi_id: item.provinsi_id ?? Number(provinsiId),
            }));

            console.log('Mapped kota data:', mapped);
            setAlamatKotaList(mapped);
        } catch (error) {
            console.error('Error in fetchAlamatKota:', error);
            setAlamatKotaList([]);
        } finally {
            setLoadingAlamatKota(false);
        }
    };

    const [ongkirMap, setOngkirMap]       = useState<Record<number, { harga: number; estimasi_hari_min: string; estimasi_hari_max: string }>>({});
    const [loadingOngkir, setLoadingOngkir] = useState(false);
    const selectedKotaKode = selectedKota?.kode_kota || (selectedAlamat as any)?.kode_kota || '';
    const ongkirInfo = selectedEkspedisi ? (ongkirMap[selectedEkspedisi.id] ?? null) : null;
    const ongkir     = Number(ongkirInfo?.harga ?? 0);
    const estimasi   = ongkirInfo
        ? `${ongkirInfo.estimasi_hari_min}–${ongkirInfo.estimasi_hari_max} hari`
        : '-';
    const grandTotal = totalHarga + ongkir;

    useEffect(() => {
        if (!selectedAlamat || !selectedKotaKode) {
            setOngkirMap({});
            return;
        }
        setLoadingOngkir(true);
        const csrfToken = pageProps.csrf || auth.csrf || document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        const firstItem = itemList[0];
        const extraPayload: any = {};
        if (firstItem && firstItem.is_langsung) {
            extraPayload.produk_id = firstItem.produk_id;
            extraPayload.jumlah = firstItem.jumlah;
        }

        Promise.all(
            ekspedisiList.map((e) =>
                fetch('/checkout/ongkir', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({
                        alamat_id: selectedAlamat?.id,
                        ekspedisi_id: e.id,
                        ...extraPayload
                    }),
                })
                    .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
                    .then(data => ({ id: e.id, data }))
                    .catch(() => ({ id: e.id, data: { harga: 0, estimasi_hari_min: '1', estimasi_hari_max: '3' } }))
            )
        ).then(results => {
            const map: Record<number, { harga: number; estimasi_hari_min: string; estimasi_hari_max: string }> = {};
            results.forEach(({ id, data }) => { map[id] = data; });
            setOngkirMap(map);
        }).finally(() => setLoadingOngkir(false));
    }, [selectedAlamat?.id, selectedKotaKode, ekspedisiList.length, itemList[0]?.produk_id, itemList[0]?.jumlah]);

    const alamatForm = useForm({
        nama_penerima: '',
        no_hp_penerima: '',
        provinsi_id: '',
        kode_kota: '',
        nama_kota: '',
        kota_kabupaten: '',
        kecamatan: '',
        kode_pos: '',
        alamat_lengkap: '',
    });

    function handleSetUtama(id: number) {
        router.patch(`/checkout/alamat/${id}/utama`, {}, {
            preserveScroll: true,
        });
    }

    function handleHapusAlamat(id: number) {
        router.delete(`/checkout/alamat/${id}`, {
            preserveScroll: true,
        });
    }

    async function handleEditAlamatClick(a: Alamat) {
        setEditingAlamatId(a.id);
        
        // Fill form fields
        alamatForm.setData({
            nama_penerima: a.nama_penerima || '',
            no_hp_penerima: a.no_hp_penerima || '',
            provinsi_id: String(a.provinsi_id || ''),
            kode_kota: String(a.kode_kota || ''),
            nama_kota: a.nama_kota || '',
            kota_kabupaten: a.kota_kabupaten || '',
            kecamatan: a.kecamatan || '',
            kode_pos: a.kode_pos || '',
            alamat_lengkap: a.alamat_lengkap || '',
        });

        // We also need to fetch cities for this province!
        if (a.provinsi_id) {
            setLoadingAlamatKota(true);
            try {
                const query = a.provinsi?.nama_provinsi ? `?provinsi_name=${encodeURIComponent(a.provinsi.nama_provinsi)}` : '';
                const response = await fetch(`/api/kota/${a.provinsi_id}${query}`);
                if (response.ok) {
                    const raw: any[] = await response.json();
                    const mapped: Kota[] = raw.map((item: any) => ({
                        id:          item.id,
                        nama_kota:   item.nama_kota   ?? item.nama   ?? item.name ?? String(item.id),
                        kode_kota:   item.kode_kota   ?? item.kode   ?? String(item.id),
                        provinsi_id: item.provinsi_id ?? Number(a.provinsi_id),
                    }));
                    setAlamatKotaList(mapped);
                }
            } catch (error) {
                console.error('Error fetching kota for edit:', error);
            } finally {
                setLoadingAlamatKota(false);
            }
        }
        
        setShowTambahAlamat(true);
    }

    function submitAlamat(e: React.FormEvent) {
        e.preventDefault();
        if (editingAlamatId) {
            alamatForm.patch(`/checkout/alamat/${editingAlamatId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowTambahAlamat(false);
                    setEditingAlamatId(null);
                    alamatForm.reset();
                },
            });
        } else {
            alamatForm.post('/checkout/alamat', {
                preserveScroll: true,
                onSuccess: () => {
                    setShowTambahAlamat(false);
                    alamatForm.reset();
                },
            });
        }
    }

    const canSubmitCheckout = Boolean(
        selectedAlamat &&
        selectedEkspedisi &&
        !loadingOngkir &&
        !isSubmitting &&
        ongkirInfo &&
        ongkir > 0
    );

    function submitCheckout() {
        if (!canSubmitCheckout || !selectedAlamat || !selectedEkspedisi || isSubmitting) return;

        const payload: any = {
            alamat_id:         selectedAlamat.id,
            ekspedisi_id:      selectedEkspedisi.id,
            metode_pembayaran: metodePembayaran,
        };

        const firstItem = itemList[0];
        if (firstItem && firstItem.is_langsung) {
            payload.produk_id = firstItem.produk_id;
            payload.jumlah = firstItem.jumlah;
            payload.tipe_pembelian = firstItem.tipe_pembelian;
            payload.jenis_lensa_od = firstItem.jenis_lensa_od;
            payload.nilai_lensa_od = firstItem.nilai_lensa_od;
            payload.silinder_od = firstItem.silinder_od;
            payload.jenis_lensa_os = firstItem.jenis_lensa_os;
            payload.nilai_lensa_os = firstItem.nilai_lensa_os;
            payload.silinder_os = firstItem.silinder_os;
            payload.anti_radiasi = firstItem.anti_radiasi ? 1 : 0;
            payload.photochromic = firstItem.photochromic ? 1 : 0;
        }

        router.post('/checkout', payload, {
            onStart: () => setIsSubmitting(true),
            onFinish: () => setIsSubmitting(false),
        });
    }


    return (
        <>
            <Head title="Checkout - EyeLit" />
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
                        <Link href="/keranjang" className="hover:text-white transition-colors">Keranjang</Link>
                        <span>/</span>
                        <span className="text-white font-medium">Checkout</span>
                    </div>
                </div>

                <main className="mx-auto max-w-7xl px-4 pb-16">
                    <Link href="/keranjang" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="size-4" />
                        Kembali ke Keranjang
                    </Link>

                    <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Kiri: Alamat + Ekspedisi + Pembayaran */}
                        <div className="lg:col-span-2 flex flex-col gap-5">

                            {/* Alamat Pengiriman */}
                            <div className="card-glass-light rounded-xl border overflow-hidden shadow-lg">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-white/20 bg-white/10">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="size-4 text-blue-600" />
                                        <h2 className="text-sm font-semibold text-slate-800">Alamat Pengiriman</h2>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setEditingAlamatId(null);
                                            alamatForm.reset();
                                            setAlamatKotaList([]);
                                            setLoadingAlamatKota(false);
                                            setShowTambahAlamat(true);
                                        }}
                                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        <Plus className="size-3" /> Tambah Alamat
                                    </button>
                                </div>

                                {alamatList.length === 0 ? (
                                    <div className="px-5 py-8 text-center text-sm text-slate-500">
                                        Belum ada alamat. Tambahkan alamat pengiriman terlebih dahulu.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-200">
                                        {alamatList.map((a) => (
                                            <label key={a.id} className="flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-white/20 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="alamat"
                                                    checked={selectedAlamat?.id === a.id}
                                                    onChange={() => setSelectedAlamat(a)}
                                                    className="mt-1 accent-blue-500"
                                                />
                                                <div className="flex-1 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-slate-800">{safe(a.nama_penerima)}</span>
                                                        <span className="text-slate-500">{safe(a.no_hp_penerima)}</span>
                                                        {a.alamat_utama && (
                                                            <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-600 text-xs rounded-full font-medium">Utama</span>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-600 mt-0.5">
                                                        {safe(a.alamat_lengkap)}, {safe(a.kecamatan)}, {safe(a.kota_kabupaten)}, {safe(a.provinsi?.nama_provinsi)}, {safe(a.kode_pos)}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                                                        {!a.alamat_utama && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleSetUtama(a.id);
                                                                }}
                                                                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
                                                            >
                                                                Jadikan Utama
                                                            </button>
                                                        )}
                                                        {!a.alamat_utama && <span className="text-slate-300">|</span>}
                                                        <button
                                                            onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleEditAlamatClick(a);
                                                                }}
                                                            className="text-xs text-amber-600 hover:text-amber-800 font-medium transition-colors cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>
                                                        <span className="text-slate-300">|</span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
                                                                    handleHapusAlamat(a.id);
                                                                }
                                                            }}
                                                            className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Ekspedisi */}
                            <div className="card-glass-light rounded-xl border overflow-hidden shadow-lg">
                                <div className="px-5 py-4 border-b border-white/20 bg-white/10">
                                    <h2 className="text-sm font-semibold text-slate-800">Ekspedisi</h2>
                                    {!selectedAlamat && (
                                        <p className="text-xs text-slate-500 mt-1">Pilih alamat terlebih dahulu untuk melihat ongkos kirim</p>
                                    )}
                                </div>
                                <div className="divide-y divide-slate-200">
                                    {ekspedisiList.map((e) => {
                                        const info = ongkirMap[e.id] ?? null;
                                        return (
                                            <label
                                                key={e.id}
                                                className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors ${
                                                    selectedEkspedisi?.id === e.id ? 'bg-white/30' : 'hover:bg-white/10'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="ekspedisi"
                                                    checked={selectedEkspedisi?.id === e.id}
                                                    onChange={() => setSelectedEkspedisi(e)}
                                                    className="accent-blue-500"
                                                />
                                                <div className="flex-1 flex items-center justify-between text-sm">
                                                    <span className="font-medium text-slate-800">{safe(e.nama_ekspedisi)}</span>
                                                    <div className="text-right">
                                                        {!selectedAlamat ? (
                                                            <span className="text-slate-400 text-xs">Pilih alamat dulu</span>
                                                        ) : loadingOngkir ? (
                                                            <span className="text-blue-600 text-xs">Menghitung...</span>
                                                        ) : info && info.harga > 0 ? (
                                                            <div>
                                                                <span className="font-semibold text-blue-700">Rp {Number(info.harga).toLocaleString('id-ID')}</span>
                                                                <span className="text-slate-500 text-xs block mt-1">Garansi tiba dalam {safe(info.estimasi_hari_min)}–{safe(info.estimasi_hari_max)} hari</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-slate-400 text-xs">Tidak tersedia</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Metode Pembayaran */}
                            <div className="card-glass-light rounded-xl border overflow-hidden shadow-lg">
                                <div className="px-5 py-4 border-b border-white/20 bg-white/10">
                                    <h2 className="text-sm font-semibold text-slate-800">Metode Pembayaran</h2>
                                </div>
                                <div className="divide-y divide-slate-200">
                                    {['QRIS', 'Virtual Account BCA'].map((m) => (
                                        <label key={m} className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-white/20 transition-colors">
                                            <input
                                                type="radio"
                                                name="pembayaran"
                                                checked={metodePembayaran === m}
                                                onChange={() => setMetodePembayaran(m)}
                                                className="accent-blue-500"
                                            />
                                            <span className="text-sm font-medium text-slate-800">{m}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Ringkasan */}
                        <div className="lg:col-span-1">
                            <div className="card-glass-light rounded-xl border p-5 sticky top-6 shadow-lg">
                                <h2 className="text-base font-semibold text-slate-800 mb-4">Ringkasan Pesanan</h2>

                                <div className="flex flex-col gap-2 text-sm mb-4">
                                    {itemList.map((item) => (
                                        <div key={item.id} className="flex gap-3 items-center">
                                            <img
                                                src={item.gambar ? `/images/produk/${item.gambar}` : '/images/placeholder.png'}
                                                alt={safe(item.nama_produk)}
                                                className="w-10 h-10 object-contain rounded bg-white/40 p-1 flex-shrink-0"
                                                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="truncate font-semibold text-slate-800">{safe(item.nama_produk)}</p>
                                                <p className="text-slate-500 text-xs">×{item.jumlah ?? 0} · {safe(item.tipe_pembelian)}</p>
                                            </div>
                                            <span className="text-slate-800 font-semibold flex-shrink-0">Rp {Number(item.subtotal ?? 0).toLocaleString('id-ID')}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-slate-200 pt-3 flex flex-col gap-2 text-sm">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal Produk</span>
                                        <span className="text-slate-800">Rp {totalHarga.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Ongkos Kirim</span>
                                        <span className="text-slate-800">{ongkir > 0 ? `Rp ${ongkir.toLocaleString('id-ID')}` : '-'}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200">
                                        <span>Total</span>
                                        <span className="text-blue-700">Rp {grandTotal.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={submitCheckout}
                                    disabled={!canSubmitCheckout}
                                    className="mt-5 w-full py-3 btn-orange-gradient rounded-full font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Memproses Pesanan...
                                        </>
                                    ) : (
                                        'Buat Pesanan'
                                    )}
                                </button>
                                <p className="text-xs text-slate-500 mt-2">
                                    Pastikan ongkir sudah terhitung terlebih dahulu. API Xendit akan dipanggil saat pesanan dibuat.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal Tambah Alamat */}
            {showTambahAlamat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
                    <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl text-slate-800">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                                                            <h3 className="text-base font-semibold text-slate-800">{editingAlamatId ? 'Edit Alamat' : 'Tambah Alamat Baru'}</h3>
                                                            <button onClick={() => {
                                                                setShowTambahAlamat(false);
                                                                setEditingAlamatId(null);
                                                                alamatForm.reset();
                                                            }} className="p-1 rounded-full hover:bg-slate-100">
                                                                <X className="size-5 text-slate-500" />
                                                            </button>
                                                        </div>
                        <form onSubmit={submitAlamat} className="px-6 py-5 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-slate-600">Nama Penerima</label>
                                    <input
                                        type="text"
                                        value={alamatForm.data.nama_penerima}
                                        onChange={(e) => alamatForm.setData('nama_penerima', e.target.value)}
                                        className="h-9 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                                        placeholder="Nama lengkap"
                                    />
                                    {alamatForm.errors.nama_penerima && <p className="text-xs text-red-500">{alamatForm.errors.nama_penerima}</p>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-slate-600">No. HP</label>
                                    <input
                                        type="text"
                                        value={alamatForm.data.no_hp_penerima}
                                        onChange={(e) => alamatForm.setData('no_hp_penerima', e.target.value)}
                                        className="h-9 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    {alamatForm.errors.no_hp_penerima && <p className="text-xs text-red-500">{alamatForm.errors.no_hp_penerima}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-slate-600">Provinsi</label>
                                <select
                                    value={alamatForm.data.provinsi_id}
                                    onChange={(e) => {
                                        const selectedProvinsiId = e.target.value;
                                        console.log('Provinsi selected:', selectedProvinsiId);
                                        alamatForm.setData('provinsi_id', selectedProvinsiId);
                                        alamatForm.setData('kode_kota', '');
                                        alamatForm.setData('nama_kota', '');
                                        alamatForm.setData('kota_kabupaten', '');
                                        setSelectedKota(null);
                                        const selectedProvinsiName = provinsiList.find((p) => String(p.id) === selectedProvinsiId)?.nama_provinsi || '';
                                        if (selectedProvinsiId) {
                                            console.log('Calling fetchAlamatKota with:', selectedProvinsiId, selectedProvinsiName);
                                            fetchAlamatKota(selectedProvinsiId, selectedProvinsiName);
                                        } else {
                                            console.log('Provinsi cleared, clearing kota list');
                                            setAlamatKotaList([]);
                                            setLoadingAlamatKota(false);
                                        }
                                    }}
                                    className="h-9 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" className="bg-white">Pilih Provinsi</option>
                                    {provinsiList.map((p) => (
                                        <option key={p.id} value={p.id} className="bg-white">{safe(p.nama_provinsi)}</option>
                                    ))}
                                </select>
                                {alamatForm.errors.provinsi_id && <p className="text-xs text-red-500">{alamatForm.errors.provinsi_id}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-slate-600">Kota / Kabupaten</label>
                                {loadingAlamatKota ? (
                                    <div className="h-9 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm flex items-center text-slate-400">Memuat kota...</div>
                                ) : (
                                    <select
                                        value={alamatForm.data.kode_kota}
                                        onChange={(e) => {
                                            // 🔥 FIX: cari berdasarkan kode_kota (sudah di-mapping, pasti ada)
                                            const kota = alamatKotaList.find((k) => String(k.kode_kota) === e.target.value);
                                            alamatForm.setData('kode_kota', e.target.value);
                                            alamatForm.setData('nama_kota', kota?.nama_kota || '');
                                            alamatForm.setData('kota_kabupaten', kota?.nama_kota || '');
                                            setSelectedKota(kota || null);
                                        }}
                                        disabled={alamatKotaList.length === 0}
                                        className="h-9 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200"
                                    >
                                        <option value="" className="bg-white">{alamatKotaList.length === 0 ? 'Pilih provinsi dulu' : 'Pilih Kota'}</option>
                                        {alamatKotaList.map((k) => (
                                            // 🔥 FIX: pakai nama_kota & kode_kota hasil mapping — selalu ada
                                            <option key={k.id} value={k.kode_kota} className="bg-white">{safe(k.nama_kota)}</option>
                                        ))}
                                    </select>
                                )}
                                {alamatForm.errors.kode_kota && <p className="text-xs text-red-500">{alamatForm.errors.kode_kota}</p>}
                                {alamatForm.errors.nama_kota && <p className="text-xs text-red-500">{alamatForm.errors.nama_kota}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-slate-600">Kecamatan</label>
                                    <input
                                        type="text"
                                        value={alamatForm.data.kecamatan}
                                        onChange={(e) => alamatForm.setData('kecamatan', e.target.value)}
                                        className="h-9 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                                    />
                                    {alamatForm.errors.kecamatan && <p className="text-xs text-red-500">{alamatForm.errors.kecamatan}</p>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-slate-600">Kode Pos</label>
                                    <input
                                        type="text"
                                        value={alamatForm.data.kode_pos}
                                        onChange={(e) => alamatForm.setData('kode_pos', e.target.value)}
                                        className="h-9 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                                        placeholder="12345"
                                    />
                                    {alamatForm.errors.kode_pos && <p className="text-xs text-red-500">{alamatForm.errors.kode_pos}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-slate-600">Alamat Lengkap</label>
                                <textarea
                                    value={alamatForm.data.alamat_lengkap}
                                    onChange={(e) => alamatForm.setData('alamat_lengkap', e.target.value)}
                                    rows={3}
                                    className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                                    placeholder="Nama jalan, nomor rumah, RT/RW, dll."
                                />
                                {alamatForm.errors.alamat_lengkap && <p className="text-xs text-red-500">{alamatForm.errors.alamat_lengkap}</p>}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowTambahAlamat(false);
                                        setEditingAlamatId(null);
                                        alamatForm.reset();
                                    }}
                                    className="flex-1 py-2.5 rounded-full border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={alamatForm.processing}
                                    className="flex-1 py-2.5 rounded-full btn-orange-gradient text-sm font-semibold transition-colors disabled:opacity-50 shadow-lg"
                                >
                                    {alamatForm.processing ? 'Menyimpan...' : (editingAlamatId ? 'Simpan Perubahan' : 'Simpan Alamat')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
