import { Head, useForm } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login, register } from '@/routes';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type FormErrors = {
    name?: string;
    email?: string;
    no_hp?: string;
    password?: string;
    password_confirmation?: string;
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localErrors, setLocalErrors] = useState<FormErrors>({});

    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        no_hp: '',
        password: '',
        password_confirmation: '',
    });

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};

        if (!data.name.trim()) {
            errors.name = 'Nama lengkap wajib diisi.';
        } else if (data.name.trim().length < 2) {
            errors.name = 'Nama lengkap minimal 2 karakter.';
        }

        if (!data.email.trim()) {
            errors.email = 'Email wajib diisi.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Format email tidak valid.';
        }

        if (!data.no_hp.trim()) {
            errors.no_hp = 'Nomor HP wajib diisi.';
        } else if (!/^[0-9]{10,20}$/.test(data.no_hp.replace(/\s/g, ''))) {
            errors.no_hp = 'Nomor HP harus berupa angka (10-20 digit).';
        }

        if (!data.password) {
            errors.password = 'Kata sandi wajib diisi.';
        } else if (data.password.length < 8) {
            errors.password = 'Kata sandi minimal 8 karakter.';
        }

        if (!data.password_confirmation) {
            errors.password_confirmation = 'Konfirmasi kata sandi wajib diisi.';
        } else if (data.password !== data.password_confirmation) {
            errors.password_confirmation = 'Konfirmasi kata sandi tidak cocok.';
        }

        return errors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setLocalErrors(errors);
            return;
        }

        setLocalErrors({});
        post(register.url(), {
            onError: (serverErrors) => {
                setLocalErrors(serverErrors);
            },
        });
    };

    return (
        <>
            <Head title="Daftar" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            id="name"
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            name="name"
                            placeholder="Masukkan nama lengkap"
                            className="h-12"
                            value={data.name}
                            onChange={(e) => {
                                setData('name', e.target.value);
                                if (localErrors.name) {
                                    setLocalErrors((prev) => ({ ...prev, name: undefined }));
                                }
                            }}
                        />
                        {localErrors.name && (
                            <p className="text-sm text-red-600">{localErrors.name}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            tabIndex={2}
                            autoComplete="email"
                            name="email"
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

                    <div className="grid gap-2">
                        <Label htmlFor="no_hp">Nomor HP</Label>
                        <Input
                            id="no_hp"
                            type="tel"
                            tabIndex={3}
                            autoComplete="tel"
                            name="no_hp"
                            placeholder="08xxxxxxxxxx"
                            className="h-12"
                            value={data.no_hp}
                            onChange={(e) => {
                                setData('no_hp', e.target.value);
                                if (localErrors.no_hp) {
                                    setLocalErrors((prev) => ({ ...prev, no_hp: undefined }));
                                }
                            }}
                        />
                        {localErrors.no_hp && (
                            <p className="text-sm text-red-600">{localErrors.no_hp}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password"
                                placeholder="Masukkan kata sandi"
                                className="h-12 pr-10"
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
                                tabIndex={5}
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
                            Konfirmasi Kata Sandi
                        </Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                tabIndex={6}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="Konfirmasi kata sandi"
                                className="h-12 pr-10"
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
                                tabIndex={7}
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
                        tabIndex={8}
                        disabled={processing}
                        data-test="register-user-button"
                    >
                        {processing && <Spinner />}
                        Daftar
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Sudah punya akun?{' '}
                    <TextLink href={login()} tabIndex={9} className="text-[#2264c0] font-medium">
                        Masuk
                    </TextLink>
                </div>
            </form>
        </>
    );
}

Register.layout = {
    title: 'Daftar',
    description: 'Buat akun baru untuk EyeLit',
};
