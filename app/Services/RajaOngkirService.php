<?php

namespace App\Services;

use App\Models\Ongkir;
use App\Models\Alamat;
use Illuminate\Support\Facades\Http;

class RajaOngkirService
{
    private string $apiKey;
    private string $baseUrl;
    private int $originKota;

    private array $courierMap = [
        1 => 'jne',
        2 => 'jnt',
        3 => 'sicepat',
    ];

    private array $servicePreference = [
        'jne'     => 'REG',
        'jnt'     => 'EZ',
        'sicepat' => 'BEST',
    ];

    public function __construct()
    {
        $this->apiKey = config('services.rajaongkir.key');
        $this->baseUrl = config('services.rajaongkir.base_url', 'https://api.rajaongkir.com/starter');
        $this->originKota = (int) config('services.rajaongkir.origin_city_id', 152);
    }

    public function hitungSemuaEkspedisi(int $destinasiKota, int $beratGram = 1000): array
    {
        $couriers = implode(':', array_values($this->courierMap));

        $response = Http::withHeaders(['key' => $this->apiKey])
            ->asForm()
            ->post("{$this->baseUrl}/cost", [
                'origin'      => $this->originKota,
                'destination' => $destinasiKota,
                'weight'      => $beratGram,
                'courier'     => $couriers,
            ]);

        if (!$response->successful()) {
            return [];
        }

        $payload = $response->json();
        $servicesByCourier = $this->normalizeCostPayload($payload);
        $result = [];

        foreach ($this->courierMap as $ekspedisiId => $courierCode) {
            $services = $servicesByCourier[$courierCode] ?? [];
            $preferred = $this->servicePreference[$courierCode] ?? null;
            $service = null;

            foreach ($services as $item) {
                if ($preferred && $item['service'] === $preferred) {
                    $service = $item;
                    break;
                }
            }

            if (!$service) {
                $service = $services[0] ?? null;
            }

            if ($service && isset($service['cost']) && $service['cost'] > 0) {
                $result[$ekspedisiId] = [
                    'harga'     => (int) $service['cost'],
                    'estimasi'  => $service['etd'] ?: '-',
                    'layanan'   => $service['service'],
                    'deskripsi' => $service['description'],
                ];
            }
        }

        return $result;
    }

    public function hitungSatuEkspedisi(int $destinasiKota, int $ekspedisiId, int $beratGram = 1000): array
    {
        $courier = $this->courierMap[$ekspedisiId] ?? null;

        // Coba API RajaOngkir dulu (hanya jika kode_kota valid dan API key tersedia)
        if ($courier && $destinasiKota > 0 && !empty($this->apiKey)) {
            try {
                \Log::info('RajaOngkir API call attempt', [
                    'destinasiKota' => $destinasiKota,
                    'courier' => $courier,
                    'beratGram' => $beratGram,
                    'originKota' => $this->originKota
                ]);

                $response = Http::timeout(30)
                    ->retry(2, 200)
                    ->withHeaders(['key' => $this->apiKey])
                    ->asForm()
                    ->post("{$this->baseUrl}/cost", [
                        'origin'      => $this->originKota,
                        'destination' => $destinasiKota,
                        'weight'      => $beratGram,
                        'courier'     => $courier,
                    ]);

                \Log::info('RajaOngkir API response', [
                    'status' => $response->status(),
                    'successful' => $response->successful(),
                    'body_length' => strlen($response->body())
                ]);

                if ($response->successful()) {
                    $payload = $response->json();
                    \Log::info('RajaOngkir API JSON parsed', ['has_rajaongkir' => isset($payload['rajaongkir'])]);

                    $servicesByCourier = $this->normalizeCostPayload($payload);
                    $services = $servicesByCourier[$courier] ?? [];
                    $preferred = $this->servicePreference[$courier] ?? null;
                    $service = null;

                    foreach ($services as $item) {
                        if ($preferred && $item['service'] === $preferred) {
                            $service = $item;
                            break;
                        }
                    }

                    if (!$service) {
                        $service = $services[0] ?? null;
                    }

                    if ($service && isset($service['cost']) && $service['cost'] > 0) {
                        $etd = trim($service['etd'] ?? '');
                        $etd = $etd ?: '1-3';
                        preg_match('/(\d+)(?:-(\d+))?.*/', trim($etd), $matches);
                        $min = (int) ($matches[1] ?? 1);
                        $max = (int) ($matches[2] ?? $min);

                        \Log::info('RajaOngkir SUCCESS: Real API data used', [
                            'harga' => $service['cost'],
                            'etd' => $etd,
                            'service' => $service['service'] ?? 'unknown'
                        ]);

                        return [
                            'harga'             => (int) $service['cost'],
                            'estimasi_hari_min' => (string) $min,
                            'estimasi_hari_max' => (string) $max,
                        ];
                    } else {
                        \Log::warning('RajaOngkir API returned no valid cost data', [
                            'services_count' => count($services),
                            'services' => $services
                        ]);
                    }
                } else {
                    \Log::warning('RajaOngkir API not successful', [
                        'status' => $response->status(),
                        'body_preview' => substr($response->body(), 0, 200)
                    ]);
                }
            } catch (\Exception $e) {
                \Log::warning('RajaOngkir API exception, will use fallback', [
                    'error' => $e->getMessage(),
                    'error_type' => get_class($e)
                ]);
            }
        } else {
            \Log::info('RajaOngkir API skipped', [
                'courier' => $courier,
                'destinasiKota' => $destinasiKota,
                'hasKey' => !empty($this->apiKey),
                'reason' => (!$courier ? 'no courier mapping' : (!$destinasiKota ? 'no destination' : 'no api key'))
            ]);
        }

        // Fallback: ambil dari tabel ongkir lokal berdasarkan provinsi alamat
        \Log::warning('FALLBACK: Using database data instead of real RajaOngkir API', [
            'destinasiKota' => $destinasiKota,
            'ekspedisiId' => $ekspedisiId
        ]);

        $alamat = Alamat::where('kode_kota', (string) $destinasiKota)->first();

        if ($alamat) {
            $ongkirLokal = Ongkir::where('provinsi_id', $alamat->provinsi_id)
                ->where(function ($query) use ($ekspedisiId) {
                    $query->where('ekspedisi_id', $ekspedisiId)
                          ->orWhereNull('ekspedisi_id');
                })
                ->first();

            if ($ongkirLokal) {
                \Log::info('Fallback: Found specific ongkir record', [
                    'provinsi_id' => $alamat->provinsi_id,
                    'harga' => $ongkirLokal->harga
                ]);

                return [
                    'harga'             => (int) $ongkirLokal->harga,
                    'estimasi_hari_min' => (string) $ongkirLokal->estimasi_hari_min,
                    'estimasi_hari_max' => (string) $ongkirLokal->estimasi_hari_max,
                ];
            }

            $genericOngkir = Ongkir::where('provinsi_id', $alamat->provinsi_id)
                ->whereNull('ekspedisi_id')
                ->first();

            if ($genericOngkir) {
                \Log::info('Fallback: Using generic courier pricing', [
                    'provinsi_id' => $alamat->provinsi_id,
                    'base_harga' => $genericOngkir->harga
                ]);

                return $this->applyGenericCourierFallback($genericOngkir, $ekspedisiId);
            }
        }

        \Log::error('FALLBACK FAILED: No database data found, returning 0', [
            'destinasiKota' => $destinasiKota,
            'ekspedisiId' => $ekspedisiId
        ]);

        return [
            'harga'             => 0,
            'estimasi_hari_min' => '1',
            'estimasi_hari_max' => '3',
        ];
    }

    protected function normalizeCostPayload(array $payload): array
    {
        $result = [];

        if (isset($payload['rajaongkir']['results']) && is_array($payload['rajaongkir']['results'])) {
            foreach ($payload['rajaongkir']['results'] as $courierData) {
                $code = strtolower($courierData['code'] ?? '');
                foreach ($courierData['costs'] ?? [] as $service) {
                    $serviceName = $service['service'] ?? '';
                    $description = $service['description'] ?? '';
                    foreach ($service['cost'] ?? [] as $costItem) {
                        $result[$code][] = [
                            'service'     => $serviceName,
                            'description' => $description,
                            'cost'        => isset($costItem['value']) ? (int) $costItem['value'] : (int) ($costItem['cost'] ?? 0),
                            'etd'         => $costItem['etd'] ?? '',
                        ];
                    }
                }
            }

            return $result;
        }

        if (isset($payload['data']) && is_array($payload['data'])) {
            foreach ($payload['data'] as $item) {
                $code = strtolower($item['code'] ?? '');
                $result[$code][] = [
                    'service'     => $item['service'] ?? ($item['code'] ?? ''),
                    'description' => $item['description'] ?? '',
                    'cost'        => isset($item['cost']) ? (int) $item['cost'] : (int) ($item['value'] ?? 0),
                    'etd'         => $item['etd'] ?? '',
                ];
            }
        }

        return $result;
    }

    private function applyGenericCourierFallback(Ongkir $genericOngkir, int $ekspedisiId): array
    {
        $harga = (int) $genericOngkir->harga;
        $estimasiMin = (int) $genericOngkir->estimasi_hari_min;
        $estimasiMax = (int) $genericOngkir->estimasi_hari_max;

        if ($ekspedisiId === 2) {
            $harga = (int) ceil($harga * 1.05);
            $estimasiMax = max($estimasiMax, $estimasiMax + 1);
        } elseif ($ekspedisiId === 3) {
            $harga = (int) ceil($harga * 1.10);
            $estimasiMax = max($estimasiMax, $estimasiMax + 1);
        }

        return [
            'harga'             => $harga,
            'estimasi_hari_min' => (string) max(1, $estimasiMin),
            'estimasi_hari_max' => (string) max(1, $estimasiMax),
        ];
    }

    /**
     * Hitung ongkir menggunakan provinsi_id (fallback utama tanpa API)
     */
    public function hitungDariProvinsi(int $provinsiId, int $ekspedisiId): array
    {
        $ongkirLokal = Ongkir::where('provinsi_id', $provinsiId)
            ->where('ekspedisi_id', $ekspedisiId)
            ->first();

        if ($ongkirLokal) {
            return [
                'harga'             => (int) $ongkirLokal->harga,
                'estimasi_hari_min' => (string) $ongkirLokal->estimasi_hari_min,
                'estimasi_hari_max' => (string) $ongkirLokal->estimasi_hari_max,
            ];
        }

        return [
            'harga'             => 0,
            'estimasi_hari_min' => '1',
            'estimasi_hari_max' => '3',
        ];
    }

    /**
     * Ambil daftar provinsi dari API RajaOngkir
     */
    public function getProvinsiList(): array
    {
        try {
            $response = Http::timeout(10)
                ->withHeaders(['key' => $this->apiKey])
                ->get("{$this->baseUrl}/province");

            if ($response->successful()) {
                $results = $response->json('rajaongkir.results', []);
                if (empty($results)) {
                    $results = $response->json('data', []);
                }

                return collect($results)->map(function ($item) {
                    return [
                        'id'             => isset($item['province_id']) ? (int) $item['province_id'] : null,
                        'nama_provinsi'  => $item['province'] ?? '',
                    ];
                })->toArray();
            }
        } catch (\Exception $e) {
            \Log::warning('Failed to fetch provinces from RajaOngkir API', ['error' => $e->getMessage()]);
        }

        // Fallback: hardcoded beberapa provinsi besar jika API gagal
        return [
            ['id' => 1, 'nama_provinsi' => 'Aceh'],
            ['id' => 2, 'nama_provinsi' => 'Sumatera Utara'],
            ['id' => 3, 'nama_provinsi' => 'Sumatera Barat'],
            ['id' => 4, 'nama_provinsi' => 'Riau'],
            ['id' => 5, 'nama_provinsi' => 'Jambi'],
            ['id' => 6, 'nama_provinsi' => 'Sumatera Selatan'],
            ['id' => 7, 'nama_provinsi' => 'Bengkulu'],
            ['id' => 8, 'nama_provinsi' => 'Lampung'],
            ['id' => 9, 'nama_provinsi' => 'DKI Jakarta'],
            ['id' => 10, 'nama_provinsi' => 'Jawa Barat'],
            ['id' => 11, 'nama_provinsi' => 'Jawa Tengah'],
            ['id' => 12, 'nama_provinsi' => 'DI Yogyakarta'],
            ['id' => 13, 'nama_provinsi' => 'Jawa Timur'],
            ['id' => 14, 'nama_provinsi' => 'Banten'],
            ['id' => 15, 'nama_provinsi' => 'Bali'],
            ['id' => 16, 'nama_provinsi' => 'Nusa Tenggara Barat'],
            ['id' => 17, 'nama_provinsi' => 'Nusa Tenggara Timur'],
            ['id' => 18, 'nama_provinsi' => 'Kalimantan Barat'],
            ['id' => 19, 'nama_provinsi' => 'Kalimantan Tengah'],
            ['id' => 20, 'nama_provinsi' => 'Kalimantan Selatan'],
            ['id' => 21, 'nama_provinsi' => 'Kalimantan Timur'],
            ['id' => 22, 'nama_provinsi' => 'Kalimantan Utara'],
            ['id' => 23, 'nama_provinsi' => 'Sulawesi Utara'],
            ['id' => 24, 'nama_provinsi' => 'Sulawesi Tengah'],
            ['id' => 25, 'nama_provinsi' => 'Sulawesi Selatan'],
            ['id' => 26, 'nama_provinsi' => 'Sulawesi Tenggara'],
            ['id' => 27, 'nama_provinsi' => 'Gorontalo'],
            ['id' => 28, 'nama_provinsi' => 'Sulawesi Barat'],
            ['id' => 29, 'nama_provinsi' => 'Maluku'],
            ['id' => 30, 'nama_provinsi' => 'Maluku Utara'],
            ['id' => 31, 'nama_provinsi' => 'Papua Barat'],
            ['id' => 32, 'nama_provinsi' => 'Papua'],
            ['id' => 33, 'nama_provinsi' => 'Papua Tengah'],
            ['id' => 34, 'nama_provinsi' => 'Papua Pegunungan'],
            ['id' => 35, 'nama_provinsi' => 'Papua Selatan'],
            ['id' => 36, 'nama_provinsi' => 'Papua Barat Daya'],
        ];
    }

    /**
     * Ambil daftar kota dari API RajaOngkir
     */
    public function getKotaList(): array
    {
        try {
            $response = Http::timeout(10)
                ->withHeaders(['key' => $this->apiKey])
                ->get("{$this->baseUrl}/city");

            if ($response->successful()) {
                $results = $response->json('rajaongkir.results', []);
                if (empty($results)) {
                    $results = $response->json('data', []);
                }

                return collect($results)->map(function ($item) {
                    $cityName = trim((string) ($item['city_name'] ?? ''));
                    $type = trim((string) ($item['type'] ?? ''));
                    $formattedName = $type ? trim("{$type} {$cityName}") : $cityName;

                    return [
                        'id'            => isset($item['city_id']) ? (int) $item['city_id'] : null,
                        'nama_kota'     => $formattedName,
                        'kode_kota'     => (string) ($item['city_id'] ?? ''),
                        'provinsi_id'   => isset($item['province_id']) ? (int) $item['province_id'] : null,
                        'nama_provinsi' => $item['province'] ?? '',
                        'tipe'          => $type ?: 'Kota',
                        'kode_pos'      => $item['postal_code'] ?? '',
                    ];
                })->toArray();
            }
        } catch (\Exception $e) {
            \Log::warning('Failed to fetch cities from RajaOngkir API', ['error' => $e->getMessage()]);
        }

        // Fallback: hardcoded beberapa kota besar jika API gagal
        return [
            ['id' => 1, 'nama_kota' => 'Bandar Lampung', 'kode_kota' => '1', 'provinsi_id' => 8, 'nama_provinsi' => 'Lampung', 'tipe' => 'Kota', 'kode_pos' => '35115'],
            ['id' => 2, 'nama_kota' => 'Jakarta Pusat', 'kode_kota' => '2', 'provinsi_id' => 9, 'nama_provinsi' => 'DKI Jakarta', 'tipe' => 'Kota', 'kode_pos' => '10510'],
            ['id' => 3, 'nama_kota' => 'Bandung', 'kode_kota' => '3', 'provinsi_id' => 10, 'nama_provinsi' => 'Jawa Barat', 'tipe' => 'Kota', 'kode_pos' => '40111'],
            ['id' => 4, 'nama_kota' => 'Surabaya', 'kode_kota' => '4', 'provinsi_id' => 13, 'nama_provinsi' => 'Jawa Timur', 'tipe' => 'Kota', 'kode_pos' => '60271'],
            ['id' => 5, 'nama_kota' => 'Medan', 'kode_kota' => '5', 'provinsi_id' => 2, 'nama_provinsi' => 'Sumatera Utara', 'tipe' => 'Kota', 'kode_pos' => '20211'],
            ['id' => 6, 'nama_kota' => 'Makassar', 'kode_kota' => '6', 'provinsi_id' => 25, 'nama_provinsi' => 'Sulawesi Selatan', 'tipe' => 'Kota', 'kode_pos' => '90111'],
            ['id' => 7, 'nama_kota' => 'Semarang', 'kode_kota' => '7', 'provinsi_id' => 11, 'nama_provinsi' => 'Jawa Tengah', 'tipe' => 'Kota', 'kode_pos' => '50211'],
            ['id' => 8, 'nama_kota' => 'Palembang', 'kode_kota' => '8', 'provinsi_id' => 18, 'nama_provinsi' => 'Sumatera Selatan', 'tipe' => 'Kota', 'kode_pos' => '30111'],
            ['id' => 9, 'nama_kota' => 'Tangerang', 'kode_kota' => '9', 'provinsi_id' => 9, 'nama_provinsi' => 'DKI Jakarta', 'tipe' => 'Kota', 'kode_pos' => '15111'],
            ['id' => 10, 'nama_kota' => 'Depok', 'kode_kota' => '10', 'provinsi_id' => 9, 'nama_provinsi' => 'DKI Jakarta', 'tipe' => 'Kota', 'kode_pos' => '16411'],
        ];
    }

    /**
     * Ambil daftar kota berdasarkan provinsi_id
     */
    public function getKotaByProvinsi(int $provinsiId): array
    {
        $allCities = $this->getKotaList();
        return collect($allCities)->where('provinsi_id', $provinsiId)->values()->toArray();
    }

    public function getKotaByProvinsiName(string $provinsiName): array
    {
        $allCities = $this->getKotaList();
        $normalizedTarget = $this->normalizeProvinceName($provinsiName);

        return collect($allCities)
            ->filter(function ($item) use ($normalizedTarget) {
                return $this->normalizeProvinceName($item['nama_provinsi'] ?? '') === $normalizedTarget;
            })
            ->values()
            ->toArray();
    }

    public function normalizeProvinceName(string $provinsiName): string
    {
        $normalized = mb_strtolower(trim($provinsiName));
        $normalized = preg_replace('/[^a-z0-9]/u', '', $normalized);
        $normalized = str_replace(['daerah', 'istimewa', 'diy', 'no'], '', $normalized);
        return $normalized;
    }
}
