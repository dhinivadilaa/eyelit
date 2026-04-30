import { Head, useForm } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login, register } from '@/routes';
import { useState, useCallback, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type FormErrors = {
    username?: string;
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
        username: '',
        email: '',
        no_hp: '',
        password: '',
        password_confirmation: '',
    });

    const validateUsername = (username: string): string | undefined => {
        if (!username.trim()) return 'Nama pengguna wajib diisi.';
        if (!/^[a-zA-Z0-9]+$/.test(username)) return 'Nama pengguna hanya boleh huruf dan angka.';
        if (username.trim().length < 6) return 'Nama pengguna minimal 6 karakter.';
        return undefined;
    };

        const validateEmail = (email: string): string | undefined => {
        if (!email.trim()) return 'Email wajib diisi.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid.';
        return undefined;
    };

    const validateNoHp = (no_hp: string): string | undefined => {
        if (!no_hp.trim()) return 'Nomor HP wajib diisi.';
        if (!/^[0-9]{11,12}$/.test(no_hp.replace(/\s/g, ''))) return 'Nomor HP harus berupa angka (11-12 digit).';
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (!password) return 'Kata sandi wajib diisi.';
        if (password.length < 8) return 'Kata sandi minimal 8 karakter.';
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) return 'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka.';
        return undefined;
    };

    const validateConfirmPassword = (confirm: string): string | undefined => {
        if (!confirm) return 'Konfirmasi kata sandi wajib diisi.';
        if (confirm !== data.password) return 'Konfirmasi kata sandi tidak cocok.';
        return undefined;
    };

    const checkUsername = useCallback(async (username: string) => {
        if (!username.trim() || !/^[a-zA-Z0-9]+$/.test(username) || username.length < 6) {
            return;
        }

        try {
            const response = await fetch(`/username-check?username=${encodeURIComponent(username)}`);
            const result = await response.json();

            if (!result.available) {
                setLocalErrors((prev) => ({
                    ...prev,
                    username: 'Nama pengguna sudah digunakan.',
                }));
            }
        } catch {
            // ignore
        }
    }, []);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleUsernameChange = (value: string) => {
        setData('username', value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (localErrors.username === 'Nama pengguna sudah digunakan.') {
            setLocalErrors((prev) => ({ ...prev, username: undefined }));
        }

        debounceRef.current = setTimeout(() => {
            checkUsername(value);
        }, 500);
    };

    const checkEmail = useCallback(async (email: string) => {
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return;
        }

        try {
            const response = await fetch(`/email-check?email=${encodeURIComponent(email)}`);
            const result = await response.json();

            if (!result.available) {
                setLocalErrors((prev) => ({
                    ...prev,
                    email: 'Email sudah digunakan.',
                }));
            }
        } catch {
            // ignore
        }
    }, []);

    const handleEmailChange = (value: string) => {
        setData('email', value);

        if (emailDebounceRef.current) clearTimeout(emailDebounceRef.current);

        if (localErrors.email === 'Email sudah digunakan.') {
            setLocalErrors((prev) => ({ ...prev, email: undefined }));
        }

        emailDebounceRef.current = setTimeout(() => {
            checkEmail(value);
        }, 500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const usernameError = validateUsername(data.username);
        const emailError = validateEmail(data.email);
        const noHpError = validateNoHp(data.no_hp);
        const passwordError = validatePassword(data.password);
        const confirmError = validateConfirmPassword(data.password_confirmation);

        const newErrors: FormErrors = {};
        if (usernameError) newErrors.username = usernameError;
        if (emailError) newErrors.email = emailError;
        if (noHpError) newErrors.no_hp = noHpError;
        if (passwordError) newErrors.password = passwordError;
        if (confirmError) newErrors.password_confirmation = confirmError;

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
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
                        <Label htmlFor="username">Nama Pengguna</Label>
                        <Input
                            id="username"
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="username"
                            name="username"
                            placeholder="Masukkan nama pengguna"
                            className="h-10"
                            value={data.username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            onBlur={(e) => {
                                const error = validateUsername(e.target.value);
                                setLocalErrors((prev) => ({
                                    ...prev,
                                    username: error,
                                }));
                            }}
                        />
                        {localErrors.username && (
                            <p className="text-sm text-red-600">{localErrors.username}</p>
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
                            className="h-10"
                            value={data.email}
                            onChange={(e) => handleEmailChange(e.target.value)}
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
                        <Label htmlFor="no_hp">Nomor HP</Label>
                        <Input
                            id="no_hp"
                            type="tel"
                            tabIndex={3}
                            autoComplete="tel"
                            name="no_hp"
                            placeholder="08xxxxxxxxxx"
                            className="h-10"
                            value={data.no_hp}
                            onChange={(e) => {
                                setData('no_hp', e.target.value);
                                if (localErrors.no_hp) {
                                    setLocalErrors((prev) => ({ ...prev, no_hp: undefined }));
                                }
                            }}
                            onBlur={(e) => {
                                const error = validateNoHp(e.target.value);
                                setLocalErrors((prev) => ({
                                    ...prev,
                                    no_hp: error,
                                }));
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
                                onBlur={(e) => {
                                    const error = validateConfirmPassword(e.target.value);
                                    setLocalErrors((prev) => ({
                                        ...prev,
                                        password_confirmation: error,
                                    }));
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