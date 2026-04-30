import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Verifikasi Email" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Link verifikasi baru telah dikirim ke alamat email yang
                    Anda daftarkan.
                </div>
            )}

            <div className="text-sm text-muted-foreground mb-6">
                Terima kasih telah mendaftar! Sebelum memulai, apakah Anda
                bisa memverifikasi alamat email Anda dengan mengklik link yang
                baru saja kami kirimkan ke email Anda?
            </div>

            <Form {...send.form()} className="space-y-6">
                {({ processing }) => (
                    <>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full h-12 bg-[#2264c0] hover:bg-[#1a4f9a] text-white font-medium"
                        >
                            {processing && <Spinner />}
                            Kirim Ulang Email Verifikasi
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">
                            <TextLink href={logout()}>
                                Keluar
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verifikasi Email',
    description: 'Verifikasi alamat email Anda',
};
