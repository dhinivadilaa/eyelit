import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid min-h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Kolom Kiri - Background Image */}
            <div className="relative hidden h-full flex-col p-10 lg:flex">
                <div className="absolute inset-0">
                    <img
                        src="/images/auth/login-background.png"
                        alt="EyeLit Background"
                        className="h-full w-full object-cover object-center"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
                </div>
                <Link
                    href={home()}
                    className="relative z-20 flex items-center text-lg font-medium text-white"
                >
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    {name}
                </Link>
                {/* Teks overlay di bawah logo */}
                <div className="relative z-20 mt-auto">
                    <h2 className="text-3xl font-bold text-white">Selamat Datang di EyeLit</h2>
                    <p className="mt-2 text-white/80">Kacamata pilihan terbaik untuk gaya hidup Anda</p>
                </div>
            </div>

            {/* Kolom Kanan - Form */}
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-2xl font-semibold">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}