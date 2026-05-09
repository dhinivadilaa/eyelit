<?php

namespace App\Services;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class XenditService
{
    private string $apiKey;
    private string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.xendit.key');
        $this->baseUrl = rtrim(config('services.xendit.base_url', 'https://api.xendit.co'), '/');

        if (empty($this->apiKey)) {
            throw new \RuntimeException('Xendit API key belum dikonfigurasi. Tambahkan XENDIT_SECRET_KEY di .env');
        }
    }

    private function http()
    {
        return Http::timeout(30)
            ->retry(3, 100)
            ->withBasicAuth($this->apiKey, '')
            ->acceptJson()
            ->contentType('application/json');
    }

    public function createInvoice(string $externalId, int $amount, string $description, string $payerEmail = null): array
    {
        $payload = [
            'external_id' => $externalId,
            'amount' => $amount,
            'description' => $description,
            'payment_methods' => ['QRIS'], // Tambahkan ini untuk QRIS
        ];

        if (!empty($payerEmail)) {
            $payload['payer_email'] = $payerEmail;
        }

        $response = $this->http()->post("{$this->baseUrl}/v2/invoices", $payload);

        if ($response->failed()) {
            Log::error('Xendit invoice creation failed', [
                'payload' => $payload,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            throw new \RuntimeException('Gagal membuat pembayaran Xendit. Silakan coba lagi.');
        }

        return $response->json();
    }

    public function createQrisInvoice(string $externalId, int $amount, string $description, string $payerEmail = null): array
    {
        $payload = [
            'external_id' => $externalId,
            'amount' => $amount,
            'description' => $description,
            'payment_methods' => ['QRIS'],
            'currency' => 'IDR',
        ];

        if (!empty($payerEmail)) {
            $payload['payer_email'] = $payerEmail;
        }

        $response = $this->http()->post("{$this->baseUrl}/v2/invoices", $payload);

        if ($response->failed()) {
            Log::error('Xendit QRIS invoice creation failed', [
                'payload' => $payload,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            throw new \RuntimeException('Gagal membuat QRIS Xendit. Silakan coba lagi.');
        }

        $data = $response->json();

        // Log QRIS specific data
        Log::info('Xendit QRIS response', [
            'external_id' => $externalId,
            'qr_string' => $data['qr_string'] ?? null,
            'qr_code' => $data['qr_code'] ?? null,
            'payment_methods' => $data['payment_methods'] ?? [],
        ]);

        return $data;
    }
}
