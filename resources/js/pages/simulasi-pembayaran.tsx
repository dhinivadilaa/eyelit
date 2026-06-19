import { Head, Link, router } from '@inertiajs/react';
import { CreditCard, CheckCircle, XCircle, ArrowLeft, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

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

interface Props {
    pesanan: Pesanan;
    subtotal_produk: number;
    grand_total: number;
}

export default function SimulasiPembayaran({ pesanan, subtotal_produk, grand_total }: Props) {
    const [processing, setProcessing] = useState(false);

    const handleAction = (status: 'lunas' | 'batal') => {
        setProcessing(true);
        router.post(`/simulasi-pembayaran/${pesanan.no_pesanan}/proses`, {
            status,
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title="Simulasi Pembayaran Xendit - EyeLit" />
            <div className="min-h-screen bg-eyelit-theme flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-md w-full mx-auto card-glass-light rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#3668b5] to-[#4382c4] px-6 py-6 text-center relative">
                        <div className="absolute top-4 left-4">
                            <Link 
                                href={`/pesanan/${pesanan.id}`} 
                                className="text-blue-100 hover:text-white transition-colors flex items-center gap-1 text-xs"
                            >
                                <ArrowLeft className="size-4" /> Kembali
                            </Link>
                        </div>
                        <CreditCard className="size-12 mx-auto text-white mb-2" />
                        <h2 className="text-xl font-bold tracking-tight text-white">Xendit Payment Simulator</h2>
                        <p className="text-xs text-blue-100 mt-1">Simulasi Transaksi Pembelian Kacamata EyeLit</p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Warning Box */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
                            <AlertTriangle className="size-5 flex-shrink-0 text-amber-600 mt-0.5" />
                            <div className="text-xs space-y-1">
                                <p className="font-bold">Mode Simulasi Pembayaran</p>
                                <p className="opacity-90">Halaman ini muncul karena kunci API Xendit yang Anda gunakan belum mendukung pembayaran backend asli (Public Key). Gunakan tombol di bawah ini untuk mensimulasikan hasil pembayaran.</p>
                            </div>
                        </div>

                        {/* Order Info */}
                        <div className="bg-white/80 border border-slate-200 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                <span className="text-xs text-slate-500">Nomor Pesanan</span>
                                <span className="text-sm font-mono font-bold text-blue-600">{pesanan.no_pesanan}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">Metode Pembayaran</span>
                                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700">
                                    {pesanan.metode_pembayaran}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">Total Tagihan</span>
                                <span className="text-base font-bold text-emerald-600">
                                    Rp {grand_total.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {/* Detail Items */}
                        <div className="space-y-2 max-h-32 overflow-y-auto pr-1 text-slate-800">
                            <p className="text-xs font-semibold text-slate-500">Rincian Item:</p>
                            {pesanan.detail_pesanan?.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-xs">
                                    <span className="text-slate-700 truncate max-w-[250px]">
                                        {item.produk?.nama_produk} <span className="text-slate-400">x{item.jumlah}</span>
                                    </span>
                                    <span className="text-slate-650 font-medium">
                                        Rp {item.subtotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200 text-slate-500">
                                <span>Ongkos Kirim ({pesanan.ekspedisi?.nama_ekspedisi})</span>
                                <span>Rp {pesanan.ongkos_kirim.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-2">
                            <button
                                onClick={() => handleAction('lunas')}
                                disabled={processing}
                                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                            >
                                <CheckCircle className="size-5" />
                                {processing ? 'Memproses...' : 'Simulasikan Pembayaran Lunas'}
                            </button>

                            <button
                                onClick={() => handleAction('batal')}
                                disabled={processing}
                                className="w-full py-3 px-4 bg-red-650 hover:bg-red-555 disabled:bg-red-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                            >
                                <XCircle className="size-5" />
                                {processing ? 'Memproses...' : 'Simulasikan Pembatalan'}
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                        <ShieldCheck className="size-4 text-slate-400" />
                        <span>Sistem Keamanan Sandbox Terintegrasi</span>
                    </div>
                </div>

                <div className="text-center text-xs text-slate-700 mt-6">
                    &copy; 2026 EyeLit Glasses Store. All rights reserved.
                </div>
            </div>
        </>
    );
}
