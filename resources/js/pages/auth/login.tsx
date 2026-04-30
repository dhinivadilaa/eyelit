import { Head, useForm } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login, register } from '@/routes';
import { request } from '@/routes/password';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [localErrors, setLocalErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
    });

    const validateEmail = (email: string): string | undefined => {
        if (!email.trim()) return 'Email wajib diisi.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid.';
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (!password) return 'Kata sandi wajib diisi.';
        return undefined;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(data.email);
        const passwordError = validatePassword(data.password);

        const newErrors: { email?: string; password?: string } = {};
        if (emailError) newErrors.email = emailError;
        if (passwordError) newErrors.password = passwordError;

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        setLocalErrors({});
        post(login.url(), {
            onError: (errors) => {
                const authError = errors.email || errors.password;
                if (authError) {
                    if (authError.includes('credentials') ||
                        authError.includes('salah')) {
                        setLocalErrors({
                            email: 'Email atau kata sandi yang Anda masukkan salah.',
                        });
                    } else {
                        if (errors.email) {
                            setLocalErrors((prev) => ({ ...prev, email: errors.email }));
                        }
                        if (errors.password) {
                            setLocalErrors((prev) => ({ ...prev, password: errors.password }));
                        }
                    }
                }
            },
        });
    };

    return (
        <>
            <Head title="Masuk" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            placeholder="email@contoh.com"
                            className="h-10"
                            value={data.email}
                            onChange={(e) => {
                                setData('email', e.target.value);
                                if (localErrors.email) {
                                    setLocalErrors((prev) => ({ ...prev, email: undefined }));
                                }
                            }}
                            onBlur={(e) => {
                                const error = validateEmail(e.target.value);
                                setLocalErrors((prev) => ({
                                    ...prev,
                                    email: error,
                                }));
                            }}
                        />
                        {localErrors.email && (
                            <p className="text-sm text-red-600">{localErrors.email}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Kata Sandi</Label>
                            {canResetPassword && (
                                <TextLink
                                    href={request()}
                                    className="ml-auto text-sm"
                                    tabIndex={5}
                                >
                                    Lupa kata sandi?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Masukkan kata sandi"
                                className="h-10 pr-10"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => {
                                    setData('password', e.target.value);
                                    if (localErrors.password) {
                                        setLocalErrors((prev) => ({ ...prev, password: undefined }));
                                    }
                                }}
                                onBlur={(e) => {
                                    const error = validatePassword(e.target.value);
                                    setLocalErrors((prev) => ({
                                        ...prev,
                                        password: error,
                                    }));
                                }}
                            />
                            <button
                                type="button"
                                tabIndex={3}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5" />
                                ) : (
                                    <Eye className="size-5" />
                                )}
                            </button>
                        </div>
                        {localErrors.password && (
                            <p className="text-sm text-red-600">{localErrors.password}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 h-12 w-full bg-[#2264c0] hover:bg-[#1a4f9a] text-white font-medium"
                        tabIndex={4}
                        disabled={processing}
                        data-test="login-button"
                    >
                        {processing && <Spinner />}
                        Masuk
                    </Button>
                </div>

                {canRegister && (
                    <div className="text-center text-sm text-muted-foreground">
                        Belum punya akun?{' '}
                        <TextLink href={register()} tabIndex={6} className="text-[#2264c0] font-medium">
                            Daftar
                        </TextLink>
                    </div>
                )}
            </form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Masuk',
    description: 'Masuk ke akun EyeLit Anda',
};
