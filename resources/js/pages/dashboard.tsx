import { Head, Link, usePage } from '@inertiajs/react';
import { Eye, LayoutGrid, LogOut, Home, Package, ShoppingCart, Users } from 'lucide-react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />

            {/* Navbar */}
            <nav className="border-b border-[#19140035] bg-white sticky top-0 z-50">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Eye className="size-8 text-[#2264c0]" />
                        <span className="text-xl font-bold text-[#1b1b18]">EyeLit</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-sm font-medium text-[#2264c0] border-b-2 border-[#2264c0] pb-1"
                        >
                            <LayoutGrid className="size-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-medium text-[#706f6c] hover:text-[#1b1b18] transition-colors"
                        >
                            <Home className="size-4" />
                            Beranda
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-sm font-medium text-[#706f6c] hover:text-[#1b1b18] transition-colors"
                        >
                            <Package className="size-4" />
                            Produk
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-sm font-medium text-[#706f6c] hover:text-[#1b1b18] transition-colors"
                        >
                            <ShoppingCart className="size-4" />
                            Pesanan
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-sm font-medium text-[#706f6c] hover:text-[#1b1b18] transition-colors"
                        >
                            <Users className="size-4" />
                            Pengguna
                        </Link>
                    </div>

                    {/* User & Logout */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                <p className="text-sm font-medium text-[#1b1b18]">{auth.user?.username}</p>
                                <p className="text-xs text-[#706f6c]">{auth.user?.peran}</p>
                            </div>
                        </div>
                        <form method="POST" action="/logout">
                            <input type="hidden" name="_token" value={(auth as any).csrf} />
                            <button
                                type="submit"
                                className="flex items-center gap-1 rounded-sm border border-[#19140035] bg-[#1b1b18] px-4 py-1.5 text-sm font-medium text-white hover:bg-black"
                            >
                                <LogOut className="size-4" />
                                Keluar
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <main className="mx-auto max-w-7xl px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1b1b18]">Dashboard</h1>
                    <p className="text-[#706f6c] mt-2">Selamat datang, {auth.user?.username}!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="rounded-xl border border-[#19140035] bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-[#2264c0]/10 p-3">
                                <Package className="size-6 text-[#2264c0]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#706f6c]">Total Produk</p>
                                <p className="text-2xl font-bold text-[#1b1b18]">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#19140035] bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-[#2264c0]/10 p-3">
                                <ShoppingCart className="size-6 text-[#2264c0]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#706f6c]">Total Pesanan</p>
                                <p className="text-2xl font-bold text-[#1b1b18]">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#19140035] bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-[#2264c0]/10 p-3">
                                <Users className="size-6 text-[#2264c0]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#706f6c]">Pengguna</p>
                                <p className="text-2xl font-bold text-[#1b1b18]">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [],
};