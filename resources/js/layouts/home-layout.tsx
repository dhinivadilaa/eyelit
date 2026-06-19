import { Head, Link, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-slate-50 to-blue-50/20">
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
                                    <Link
                                        href="/dashboard"
                                        className="rounded-sm border border-transparent px-5 py-1.5 text-sm font-medium text-[#1b1b18] hover:border-[#19140035]"
                                    >
                                        Dashboard
                                    </Link>
                                    <form method="POST" action="/logout">
                                        <input type="hidden" name="_token" value={usePage().props.csrf} />
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
                                    <Link
                                        href="/register"
                                        className="rounded-sm border border-[#19140035] bg-[#2264c0] px-5 py-1.5 text-sm font-medium text-white hover:bg-[#1a4f9a]"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Content */}
                <main className="mx-auto max-w-7xl px-4 py-8">
                    {children}
                </main>
            </div>
        </>
    );
}