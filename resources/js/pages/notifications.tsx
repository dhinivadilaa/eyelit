import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Bell, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Notifications() {
    const { auth } = usePage().props as any;
    const notifications = auth.user?.notifications || [];
    const unreadCount = notifications.filter((n: any) => !n.dibaca).length;

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <Head title="Notifikasi Saya - EyeLit" />
            <div className="min-h-screen bg-eyelit-theme flex flex-col">
                {/* Navbar */}
                <nav className="relative z-50 border-b bg-[#3668b5]/95 backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/images/logo/AuthMobile.svg" alt="EyeLit Logo" className="h-10 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold text-white">EyeLit</span>
                        </Link>
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-white/20 border border-white/30 rounded-full hover:bg-white/30 transition-all cursor-pointer"
                        >
                            <ArrowLeft className="size-4" />
                            <span>Kembali</span>
                        </button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">
                    <div className="card-glass-light border border-white/40 p-6 md:p-8 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-2.5 border-b border-slate-200/50 pb-4 mb-6">
                            <Bell className="size-6 text-[#3668b5]" />
                            <h1 className="text-xl font-bold text-slate-900">Notifikasi Saya</h1>
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {unreadCount} Baru
                                </span>
                            )}
                        </div>

                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-4">
                                <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                                    <Bell className="size-12 stroke-[1.5]" />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-slate-800 text-sm">Tidak ada notifikasi baru</p>
                                    <p className="text-xs text-slate-500 mt-1">Semua pemberitahuan dan pesan chat baru telah dibaca.</p>
                                </div>
                                <button
                                    onClick={handleBack}
                                    className="mt-2 px-6 py-2.5 rounded-full btn-orange-gradient text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                                >
                                    Kembali ke Halaman Sebelumnya
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notifications.map((notif: any, index: number) => {
                                    // Pick icon based on title/type
                                    const isChat = notif.title.toLowerCase().includes('pesan') || notif.title.toLowerCase().includes('chat');
                                    const isOrder = notif.title.toLowerCase().includes('pesanan') || notif.title.toLowerCase().includes('pembayaran');
                                    
                                    return (
                                        <Link
                                            key={index}
                                            href={notif.link || '#'}
                                            className={`block p-4 rounded-xl border transition-all duration-200 ${
                                                !notif.dibaca 
                                                    ? 'border-blue-400/60 bg-[#3668b5]/5 hover:bg-[#3668b5]/10 hover:border-blue-500 shadow-sm' 
                                                    : 'border-slate-200/60 bg-white/50 hover:bg-white/80 hover:border-blue-400/50'
                                            }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                                                    isChat 
                                                        ? 'bg-orange-50 border-orange-200 text-orange-600'
                                                        : isOrder
                                                        ? 'bg-blue-50 border-blue-200 text-[#3668b5]'
                                                        : 'bg-slate-50 border-slate-200 text-slate-600'
                                                }`}>
                                                    {isChat ? (
                                                        <MessageSquare className="size-5" />
                                                    ) : isOrder ? (
                                                        <ShoppingBag className="size-5" />
                                                    ) : (
                                                        <Bell className="size-5" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex items-center gap-1.5 min-w-0">
                                                            <h3 className="text-sm font-bold text-slate-800 truncate">{notif.title}</h3>
                                                            {!notif.dibaca && (
                                                                <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">{notif.time}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">{notif.message}</p>
                                                    <div className="flex items-center gap-1 text-[11px] text-[#3668b5] font-bold mt-2 hover:underline">
                                                        <span>Lihat rincian</span>
                                                        <ArrowRight className="size-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
