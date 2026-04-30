import { Head, useForm } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { login } from '@/routes';
import { email } from '@/routes/password';
import { useState } from 'react';

type Props = {
    status?: string;
};

export default function ForgotPassword({ status }: Props) {
    const [localErrors, setLocalErrors] = useState<{ email?: string }>({});

    const { data, setData, post, processing } = useForm({
        email: '',
    });

    const validateEmail = (email: string): string | undefined => {
        if (!email.trim()) return 'Email wajib diisi.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid.';
        return undefined;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(data.email);
        if (emailError) {
            setLocalErrors({ email: emailError });
            return;
        }

        setLocalErrors({});
        post(email.url(), {
            onError: (errors) => {
                if (errors.email) {
                    setLocalErrors({ email: errors.email });
                }
            },
        });
    };

    return (
        <>
            <Head title="Lupa Kata Sandi" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <div className="text-sm text-muted-foreground">
                    Masukkan alamat email Anda. Kami akan mengirimkan link
                    untuk mereset kata sandi.
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            autoComplete="off"
                            autoFocus
                            placeholder="email@contoh.com"
                            className="h-12"
                            value={data.email}
                            onChange={(e) => {
                                setData('email', e.target.value);
                                if (localErrors.email) {
                                    setLocalErrors((prev) => ({ ...prev, email: undefined }));
                                }
                            }}
                        />
                        {localErrors.email && (
                            <p className="text-sm text-red-600">{localErrors.email}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full h-12 bg-[#2264c0] hover:bg-[#1a4f9a] text-white font-medium"
                        disabled={processing}
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        Kirim Link Reset Kata Sandi
                    </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                    <TextLink href={login()}>Kembali ke halaman Masuk</TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Lupa Kata Sandi',
    description: 'Reset kata sandi akun EyeLit Anda',
};
