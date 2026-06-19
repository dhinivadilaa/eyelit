<?php

namespace App\Services;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class XenditService
{
    private ?string $apiKey;
    private string $baseUrl;
    private bool $isMock = false;

    public function __construct()
    {
        $this->apiKey = config('services.xendit.key');
        $this->baseUrl = rtrim(config('services.xendit.base_url', 'https://api.xendit.co'), '/');

        if (empty($this->apiKey)) {
            $this->isMock = true;
            Log::warning('Xendit API key is missing. Eyelit will run in Mock Payment Mode.');
        }
    }

    private function http()
    {
        return Http::timeout(30)
            ->retry(3, 100)
            ->withBasicAuth($this->apiKey ?? '', '')
            ->acceptJson()
            ->contentType('application/json');
    }

    public function createInvoice(string $externalId, int $amount, string $description, string $payerEmail = null, $pesananId = null): array
    {
        if ($this->isMock) {
            return [
                'id' => 'mock-inv-' . Str::random(10),
                'external_id' => $externalId,
                'amount' => $amount,
                'description' => $description,
                'status' => 'PENDING',
                'invoice_url' => url("/simulasi-pembayaran/{$externalId}"),
                'expiry_date' => now()->addHours(24)->toIso8601String(),
            ];
        }

        $payload = [
            'external_id' => $externalId,
            'amount' => $amount,
            'description' => $description,
            'payment_methods' => ['QRIS'],
        ];

        if (!empty($payerEmail)) {
            $payload['payer_email'] = $payerEmail;
        }

        if ($pesananId) {
            $payload['success_redirect_url'] = url("/pesanan/{$pesananId}");
            $payload['failure_redirect_url'] = url("/pesanan/{$pesananId}");
        }

        try {
            $response = $this->http()->post("{$this->baseUrl}/v2/invoices", $payload);

            if ($response->failed()) {
                Log::error('Xendit invoice creation failed', [
                    'payload' => $payload,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                // Fallback to mock
                return [
                    'id' => 'mock-inv-' . Str::random(10),
                    'external_id' => $externalId,
                    'amount' => $amount,
                    'description' => $description,
                    'status' => 'PENDING',
                    'invoice_url' => url("/simulasi-pembayaran/{$externalId}"),
                    'expiry_date' => now()->addHours(24)->toIso8601String(),
                ];
            }

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Xendit invoice creation exception', ['message' => $e->getMessage()]);
            return [
                'id' => 'mock-inv-' . Str::random(10),
                'external_id' => $externalId,
                'amount' => $amount,
                'description' => $description,
                'status' => 'PENDING',
                'invoice_url' => url("/simulasi-pembayaran/{$externalId}"),
                'expiry_date' => now()->addHours(24)->toIso8601String(),
            ];
        }
    }

    public function createQrisInvoice(string $externalId, int $amount, string $description, string $payerEmail = null, $pesananId = null): array
    {
        if ($this->isMock) {
            return [
                'id' => 'mock-qris-' . Str::random(10),
                'external_id' => $externalId,
                'amount' => $amount,
                'description' => $description,
                'status' => 'PENDING',
                'invoice_url' => url("/simulasi-pembayaran/{$externalId}"),
                'qr_code' => 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=eyelit-payment-mock-' . $externalId,
                'qr_string' => null,
                'currency' => 'IDR',
                'expiry_date' => now()->addHours(24)->toIso8601String(),
            ];
        }

        $payload = [
            'reference_id' => $externalId,
            'type' => 'DYNAMIC',
            'currency' => 'IDR',
            'amount' => $amount,
        ];

        try {
            $response = Http::timeout(30)
                ->retry(3, 100)
                ->withBasicAuth($this->apiKey ?? '', '')
                ->withHeaders([
                    'api-version' => '2022-07-31'
                ])
                ->acceptJson()
                ->contentType('application/json')
                ->post("{$this->baseUrl}/qr_codes", $payload);

            if ($response->failed()) {
                Log::error('Xendit Direct QRIS creation failed', [
                    'payload' => $payload,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                // Fallback to mock
                return [
                    'id' => 'mock-qris-' . Str::random(10),
                    'external_id' => $externalId,
                    'amount' => $amount,
                    'description' => $description,
                    'status' => 'PENDING',
                    'invoice_url' => url("/simulasi-pembayaran/{$externalId}"),
                    'qr_code' => 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=eyelit-payment-mock-' . $externalId,
                    'qr_string' => null,
                    'currency' => 'IDR',
                    'expiry_date' => now()->addHours(24)->toIso8601String(),
                ];
            }

            $data = $response->json();
            // Map key for database and client compatibility
            $data['id'] = $data['id'] ?? ('qris-' . $externalId);
            $data['qr_code'] = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' . urlencode($data['qr_string'] ?? '');
            $data['invoice_url'] = url("/simulasi-pembayaran/{$externalId}");

            Log::info('Xendit Direct QRIS response', [
                'external_id' => $externalId,
                'qr_string' => $data['qr_string'] ?? null,
                'id' => $data['id'] ?? null,
            ]);

            return $data;
        } catch (\Exception $e) {
            Log::error('Xendit Direct QRIS creation exception', ['message' => $e->getMessage()]);
            return [
                'id' => 'mock-qris-' . Str::random(10),
                'external_id' => $externalId,
                'amount' => $amount,
                'description' => $description,
                'status' => 'PENDING',
                'invoice_url' => url("/simulasi-pembayaran/{$externalId}"),
                'qr_code' => 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=eyelit-payment-mock-' . $externalId,
                'qr_string' => null,
                'currency' => 'IDR',
                'expiry_date' => now()->addHours(24)->toIso8601String(),
            ];
        }
    }

    public function createBcaVaInvoice(string $externalId, int $amount, string $description, string $payerEmail = null, $pesananId = null): array
    {
        $name = 'EyeLit - ' . $externalId;
        return $this->createCallbackVirtualAccount($externalId, $amount, $name);
    }

    public function createCallbackVirtualAccount(string $externalId, int $amount, string $name): array
    {
        if ($this->isMock) {
            return [
                'id' => 'mock-va-' . Str::random(10),
                'external_id' => $externalId,
                'bank_code' => 'BCA',
                'merchant_code' => '98127',
                'account_number' => '98127' . rand(1000000000, 9999999999),
                'expected_amount' => $amount,
                'name' => $name,
                'is_closed' => true,
                'status' => 'PENDING',
                'expiration_date' => now()->addHours(24)->toIso8601String(),
                'invoice_url' => url("/simulasi-pembayaran/{$externalId}")
            ];
        }

        $payload = [
            'external_id' => $externalId,
            'bank_code' => 'BCA',
            'name' => $name,
            'expected_amount' => $amount,
            'is_closed' => true,
            'expiration_date' => now()->addHours(24)->toIso8601String(),
        ];

        try {
            $response = $this->http()->post("{$this->baseUrl}/callback_virtual_accounts", $payload);

            if ($response->failed()) {
                Log::error('Xendit Virtual Account creation failed', [
                    'payload' => $payload,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                // Fallback to mock
                return [
                    'id' => 'mock-va-' . Str::random(10),
                    'external_id' => $externalId,
                    'bank_code' => 'BCA',
                    'merchant_code' => '98127',
                    'account_number' => '98127' . rand(1000000000, 9999999999),
                    'expected_amount' => $amount,
                    'name' => $name,
                    'is_closed' => true,
                    'status' => 'PENDING',
                    'expiration_date' => now()->addHours(24)->toIso8601String(),
                    'invoice_url' => url("/simulasi-pembayaran/{$externalId}")
                ];
            }

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Xendit VA creation exception', ['message' => $e->getMessage()]);
            return [
                'id' => 'mock-va-' . Str::random(10),
                'external_id' => $externalId,
                'bank_code' => 'BCA',
                'merchant_code' => '98127',
                'account_number' => '98127' . rand(1000000000, 9999999999),
                'expected_amount' => $amount,
                'name' => $name,
                'is_closed' => true,
                'status' => 'PENDING',
                'expiration_date' => now()->addHours(24)->toIso8601String(),
                'invoice_url' => url("/simulasi-pembayaran/{$externalId}")
            ];
        }
    }

    public function getInvoiceStatus(string $invoiceId): array
    {
        if ($this->isMock || empty($this->apiKey) || str_starts_with($invoiceId, 'mock-')) {
            return ['status' => 'PAID'];
        }

        try {
            $response = $this->http()->get("{$this->baseUrl}/v2/invoices/{$invoiceId}");
            if ($response->successful()) {
                return $response->json();
            }
            Log::error('Xendit get invoice status failed', [
                'invoice_id' => $invoiceId,
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return [];
        } catch (\Exception $e) {
            Log::error('Xendit get invoice status exception', ['message' => $e->getMessage()]);
            return [];
        }
    }

    public function getQrisStatus(string $qrCodeId): array
    {
        if ($this->isMock || empty($this->apiKey) || str_starts_with($qrCodeId, 'mock-')) {
            return ['status' => 'ACTIVE'];
        }

        try {
            $response = Http::timeout(30)
                ->retry(3, 100)
                ->withBasicAuth($this->apiKey ?? '', '')
                ->withHeaders([
                    'api-version' => '2022-07-31'
                ])
                ->acceptJson()
                ->get("{$this->baseUrl}/qr_codes/{$qrCodeId}");

            if ($response->successful()) {
                return $response->json();
            }
            Log::error('Xendit get QRIS status failed', [
                'qr_code_id' => $qrCodeId,
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return [];
        } catch (\Exception $e) {
            Log::error('Xendit get QRIS status exception', ['message' => $e->getMessage()]);
            return [];
        }
    }

    public function getVirtualAccountPayment(string $externalId): array
    {
        if ($this->isMock || empty($this->apiKey)) {
            return [];
        }

        try {
            $response = $this->http()->get("{$this->baseUrl}/transactions", [
                'reference_id' => $externalId,
                'channel_categories' => 'VIRTUAL_ACCOUNT'
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['data'] ?? [];
            }
            Log::error('Xendit get VA payments failed', [
                'external_id' => $externalId,
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return [];
        } catch (\Exception $e) {
            Log::error('Xendit get VA payments exception', ['message' => $e->getMessage()]);
            return [];
        }
    }

    public function simulatePayment(string $paymentId, string $externalId, int $amount, string $paymentMethod): array
    {
        if ($this->isMock || str_starts_with($paymentId, 'mock-')) {
            return ['status' => 'COMPLETED', 'is_mock' => true];
        }

        try {
            if ($paymentMethod === 'Virtual Account BCA') {
                $response = $this->http()->post("{$this->baseUrl}/callback_virtual_accounts/external_id={$externalId}/simulate_payment", [
                    'amount' => $amount
                ]);
            } else {
                // QRIS
                $response = Http::timeout(30)
                    ->retry(3, 100)
                    ->withBasicAuth($this->apiKey ?? '', '')
                    ->withHeaders([
                        'api-version' => '2022-07-31'
                    ])
                    ->acceptJson()
                    ->post("{$this->baseUrl}/qr_codes/{$paymentId}/payments/simulate", new \stdClass());
            }

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Xendit payment simulation failed', [
                'payment_id' => $paymentId,
                'external_id' => $externalId,
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return ['error' => true, 'message' => 'Xendit simulation API returned status ' . $response->status()];
        } catch (\Exception $e) {
            Log::error('Xendit payment simulation exception', ['message' => $e->getMessage()]);
            return ['error' => true, 'message' => $e->getMessage()];
        }
    }
}
