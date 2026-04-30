import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localErrors, setLocalErrors] = useState<{
        password?: string;
        password_confirmation?: string;
    }>({});

    const { data, setData, post, processing } = useForm({
        password: '',
        password_confirmation: '',
    });

    const validatePassword = (password: string): string | undefined => {
        if (!password) return 'Kata sandi wajib diisi.';
        if (password.length < 8) return 'Kata sandi minimal 8 karakter.';
        return undefined;
    };

    const validateConfirmPassword = (confirm: string): string | undefined => {
        if (!confirm) return 'Konfirmasi kata sandi wajib diisi.';
        if (confirm !== data.password) return 'Konfirmasi kata sandi tidak cocok.';
        return undefined;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const passwordError = validatePassword(data.password);
        const confirmError = validateConfirmPassword(data.password_confirmation);

        const newErrors: { password?: string; password_confirmation?: string } = {};
        if (passwordError) newErrors.password = passwordError;
        if (confirmError) newErrors.password_confirmation = confirmError;

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        setLocalErrors({});
        post(update.url(), {
            data: { ...data, token },
            onError: (errors) => {
                setLocalErrors(errors);
            },
        });
    };

    return (
        <>
            <Head title="Reset Kata Sandi" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            className="h-12"
                            readOnly
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata Sandi Baru</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                className="h-12 pr-10"
                                autoFocus
                                placeholder="Masukkan kata sandi baru"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => {
                                    setData('password', e.target.value);
                                    if (localErrors.password) {
                                        setLocalErrors((prev) => ({ ...prev, password: undefined }));
                                    }
                                }}
                            />
                            <button
                                type="button"
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

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Konfirmasi Kata Sandi Baru
                        </Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                className="h-12 pr-10"
                                placeholder="Konfirmasi kata sandi baru"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={(e) => {
                                    setData('password_confirmation', e.target.value);
                                    if (localErrors.password_confirmation) {
                                        setLocalErrors((prev) => ({ ...prev, password_confirmation: undefined }));
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="size-5" />
                                ) : (
                                    <Eye className="size-5" />
                                )}
                            </button>
                        </div>
                        {localErrors.password_confirmation && (
                            <p className="text-sm text-red-600">{localErrors.password_confirmation}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 h-12 w-full bg-[#2264c0] hover:bg-[#1a4f9a] text-white font-medium"
                        disabled={processing}
                    >
                        {processing && <Spinner />}
                        Reset Kata Sandi
                    </Button>
                </div>
            </form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset Kata Sandi',
    description: 'Buat kata sandi baru untuk akun EyeLit Anda',
};
