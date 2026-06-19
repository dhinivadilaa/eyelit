import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Send, ShoppingBag, Settings, LogOut, MessageSquare, HelpCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Chat() {
    const { auth, messages, adminUser, produkContext } = usePage().props as any;
    const [newMessage, setNewMessage] = useState('');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const userDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const messageList = messages || [];

    // Scroll to bottom when messages load or change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    // Polling for new messages every 5 seconds (Inertia partial reload)
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['messages'],
                preserveScroll: true,
                preserveState: true
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Handle message sending
    const handleKirim = (e?: React.FormEvent, customText?: string) => {
        if (e) e.preventDefault();
        const text = customText || newMessage;
        if (!text.trim()) return;

        router.post('/chat/kirim', {
            pesan: text,
            penerima_id: adminUser?.id,
            produk_id: produkContext?.id || null
        }, {
            preserveScroll: true,
            onSuccess: () => {
                if (!customText) setNewMessage('');
                scrollToBottom();
            }
        });
    };

    // Quick template questions
    const saranPertanyaan = [
        "Apakah produk ini masih tersedia?",
        "Apakah ada varian warna lainnya?",
        "Berapa lama estimasi pengirimannya?",
        "Bisa bantu rekomendasi lensa yang cocok?"
    ];

    return (
        <>
            <Head title="Tanya Penjual - EyeLit" />
            <div className="min-h-screen bg-eyelit-theme flex flex-col">
                {/* Navbar */}
                <nav className="relative z-50 border-b" style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(54,104,181,0.95)', backdropFilter: 'blur(12px)' }}>
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-4">
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <img src="/images/logo/AuthMobile.svg" alt="EyeLit Logo" className="h-10 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold text-white">EyeLit</span>
                        </Link>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Link href="/katalog" className="p-2 rounded-full" style={{ color: '#ffffff' }} title="Katalog">
                                <BookOpen className="size-5" />
                            </Link>

                            {auth.user && (
                                <div className="relative h-full flex items-center">
                                    <div
                                        onMouseEnter={() => { if (userDropdownTimer.current) clearTimeout(userDropdownTimer.current); setShowUserDropdown(true); }}
                                        onMouseLeave={() => { userDropdownTimer.current = setTimeout(() => setShowUserDropdown(false), 100); }}
                                    >
                                        <button className="p-2 rounded-full" style={{ color: '#ffffff' }}>
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                                                {auth.user?.username?.charAt(0).toUpperCase()}
                                            </div>
                                        </button>
                                        {showUserDropdown && (
                                            <div
                                                className="dropdown-menu show"
                                                style={{ top: '64px', right: '24px' }}
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
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Container */}
                <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 overflow-hidden">
                    {/* Left Column: Product Context (If Available) */}
                    {produkContext && (
                        <div className="w-full md:w-80 flex-shrink-0 animate-in fade-in slide-in-from-left duration-300">
                            <div className="card-glass-light border border-white/40 p-5 rounded-2xl flex flex-col gap-4 shadow-md sticky top-6">
                                <h3 className="text-sm font-bold text-[#3668b5] uppercase tracking-wider flex items-center gap-1.5">
                                    <HelpCircle className="size-4" />
                                    Produk Ditanyakan
                                </h3>
                                <div className="bg-white/40 rounded-xl p-3 flex justify-center border border-white/30">
                                    <img
                                        src={produkContext.gambar ? `/images/produk/${encodeURIComponent(produkContext.gambar)}` : '/images/placeholder.png'}
                                        alt={produkContext.nama_produk}
                                        className="h-32 object-contain"
                                        onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500">{produkContext.merek}</p>
                                    <h4 className="text-base font-bold text-slate-900 line-clamp-2 mt-0.5">{produkContext.nama_produk}</h4>
                                    <p className="text-lg font-bold text-[#f28b27] mt-1.5">
                                        Rp {(Number(produkContext.harga_produk) || 0).toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="text-xs text-slate-500 border-t border-slate-200/55 pt-3 flex flex-col gap-1.5">
                                    <div className="flex justify-between">
                                        <span>Stok:</span>
                                        <span className="font-semibold">{produkContext.stok > 0 ? `${produkContext.stok} unit` : 'Stok Habis'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Material:</span>
                                        <span className="font-semibold">{produkContext.material || '-'}</span>
                                    </div>
                                </div>
                                <Link
                                    href={`/produk/${produkContext.id}`}
                                    className="text-center py-2.5 rounded-xl border border-[#3668b5]/50 text-[#3668b5] hover:bg-[#3668b5]/10 text-xs font-bold transition-all"
                                >
                                    Detail Produk
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Right Column: Chat Box Area */}
                    <div className="flex-1 flex flex-col card-glass-light border border-white/40 rounded-2xl overflow-hidden shadow-lg h-[calc(100vh-140px)] min-h-[500px]">
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-slate-200/60 bg-white/30 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Link href={produkContext ? `/produk/${produkContext.id}` : "/katalog"} className="p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors text-slate-700">
                                    <ArrowLeft className="size-5" />
                                </Link>
                                <div>
                                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                                        <MessageSquare className="size-4.5 text-[#3668b5]" />
                                        Customer Care EyeLit
                                    </h2>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[11px] text-slate-500 font-medium">Tanya Penjual (Admin)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message History */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/20 backdrop-blur-[4px]">
                            {messageList.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 gap-3 py-10">
                                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-[#3668b5]">
                                        <MessageSquare className="size-8 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-sm">Belum ada percakapan</h3>
                                        <p className="text-xs text-slate-500 mt-1 max-w-[280px] leading-relaxed">Ketik pesan di bawah atau gunakan saran pertanyaan cepat untuk memulai diskusi.</p>
                                    </div>
                                </div>
                            ) : (
                                messageList.map((m: any) => {
                                    const isMe = m.pengirim_id === auth.user.id;
                                    return (
                                        <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}>
                                            <div className="max-w-[75%] flex flex-col gap-1">
                                                {/* Product Reference Card Inside Chat Bubble if attached */}
                                                {m.produk && (
                                                    <div className={`p-2 rounded-t-2xl border flex items-center gap-2.5 ${
                                                        isMe 
                                                            ? 'bg-orange-600/10 border-orange-500/20 text-orange-950' 
                                                            : 'bg-blue-600/10 border-blue-500/20 text-blue-950'
                                                    }`}>
                                                        <img
                                                            src={m.produk.gambar ? `/images/produk/${encodeURIComponent(m.produk.gambar)}` : '/images/placeholder.png'}
                                                            alt={m.produk.nama_produk}
                                                            className="h-10 w-10 object-contain rounded-md bg-white p-0.5 border"
                                                        />
                                                        <div className="min-w-0">
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{m.produk.merek}</p>
                                                            <p className="text-xs font-bold truncate max-w-[150px]">{m.produk.nama_produk}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${
                                                    isMe
                                                        ? `btn-orange-gradient text-white rounded-tr-none ${m.produk ? 'rounded-tl-none' : ''}`
                                                        : `bg-white text-slate-800 border border-slate-200/50 rounded-tl-none ${m.produk ? 'rounded-tr-none' : ''}`
                                                }`}>
                                                    <p>{m.pesan}</p>
                                                </div>
                                                <span className={`text-[10px] text-slate-400 mt-0.5 ${isMe ? 'text-right' : 'text-left'}`}>
                                                    {new Date(m.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                    {isMe && (
                                                        <span className="ml-1.5">
                                                            {m.dibaca ? 'Dibaca' : 'Terkirim'}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions Area */}
                        {messageList.length === 0 && (
                            <div className="px-6 py-3 bg-white/20 border-t border-slate-200/55 flex flex-wrap gap-2">
                                {saranPertanyaan.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleKirim(undefined, q)}
                                        className="text-xs px-3 py-1.5 rounded-full border border-[#3668b5]/20 bg-white/50 text-[#3668b5] font-semibold hover:bg-[#3668b5]/10 hover:border-[#3668b5]/40 transition-all cursor-pointer"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <form onSubmit={(e) => handleKirim(e)} className="p-4 border-t border-slate-200/60 bg-white/40 flex items-center gap-3">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Tulis pertanyaan Anda di sini..."
                                className="flex-1 px-4 py-3 bg-white border border-slate-200/60 rounded-xl text-sm font-medium focus:outline-none focus:border-[#3668b5] focus:ring-1 focus:ring-[#3668b5] transition-all text-slate-800"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="p-3 rounded-xl btn-orange-gradient text-white hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <Send className="size-4.5" />
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
