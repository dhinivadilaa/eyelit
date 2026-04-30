import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.peran === 'Admin';

    return (
        <>
            <Head title="EyeLit" />
            <div className="min-h-screen bg-[#FDFDFC]">
                {/* Navbar */}
                <nav className="border-b border-[#19140035] bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <Eye className="size-8 text-[#2264c0]" />
                            <span className="text-xl font-bold text-[#1b1b18]">EyeLit</span>
                        </Link>

                        {/* Navigation */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <>
                                    {isAdmin && (
                                        <Link
                                            href="/dashboard"
                                            className="rounded-sm border border-transparent px-5 py-1.5 text-sm font-medium text-[#1b1b18] hover:border-[#19140035]"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <form method="POST" action="/logout">
                                        <input type="hidden" name="_token" value={(auth as any).csrf} />
                                        <button
                                            type="submit"
                                            className="rounded-sm border border-[#19140035] bg-[#1b1b18] px-5 py-1.5 text-sm font-medium text-white hover:bg-black"
                                        >
                                            Keluar
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="rounded-sm border border-transparent px-5 py-1.5 text-sm font-medium text-[#1b1b18] hover:border-[#19140035]"
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href="/register"
                                            className="rounded-sm border border-[#19140035] bg-[#2264c0] px-5 py-1.5 text-sm font-medium text-white hover:bg-[#1a4f9a]"
                                        >
                                            Daftar
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="mx-auto max-w-7xl px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#1b1b18] mb-4">
                            Selamat Datang di EyeLit
                        </h1>
                        <p className="text-lg text-[#706f6c] mb-8">
                            Kacamata pilihan terbaik untuk gaya hidup Anda
                        </p>
                        <div className="flex justify-center gap-4">
                            {auth.user ? (
                                <>
                                    {isAdmin && (
                                        <Link
                                            href="/dashboard"
                                            className="rounded-sm bg-[#2264c0] px-6 py-2 text-white font-medium hover:bg-[#1a4f9a]"
                                        >
                                            Lihat Dashboard
                                        </Link>
                                    )}
                                    <form method="POST" action="/logout">
                                        <input type="hidden" name="_token" value={(auth as any).csrf} />
                                        <button
                                            type="submit"
                                            className="rounded-sm border border-[#19140035] bg-white px-6 py-2 text-[#1b1b18] font-medium hover:bg-gray-50"
                                        >
                                            Keluar
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="rounded-sm border border-[#19140035] bg-white px-6 py-2 text-[#1b1b18] font-medium hover:bg-gray-50"
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href="/register"
                                            className="rounded-sm bg-[#2264c0] px-6 py-2 text-white font-medium hover:bg-[#1a4f9a]"
                                        >
                                            Daftar Sekarang
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}