import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Konfirmasi Kata Sandi" />

            <div className="text-sm text-muted-foreground mb-6">
                Ini adalah area aman aplikasi. Silakan konfirmasi kata sandi
                Anda sebelum melanjutkan.
            </div>

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Kata Sandi</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Masukkan kata sandi"
                                    autoComplete="current-password"
                                    autoFocus
                                    className="h-12 pr-10"
                                    type={showPassword ? 'text' : 'password'}
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
                            <InputError message={errors.password} />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 btn-orange-gradient"
                            disabled={processing}
                        >
                            {processing && <Spinner />}
                            Konfirmasi Kata Sandi
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Konfirmasi Kata Sandi',
    description: 'Konfirmasi kata sandi Anda untuk melanjutkan',
};
