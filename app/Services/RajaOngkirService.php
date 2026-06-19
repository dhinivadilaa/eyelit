<?php

namespace App\Services;

use App\Models\Ongkir;
use App\Models\Alamat;
use Illuminate\Support\Facades\Http;

class RajaOngkirService
{
    private ?string $apiKey = null;
    private ?string $baseUrl = null;
    private int $originKota;

    private array $courierMap = [
        1 => 'jne',
        2 => 'jnt',
        3 => 'sicepat',
        4 => 'anteraja',
        5 => 'pos',
    ];

    private array $servicePreference = [
        'jne'      => 'REG',
        'jnt'      => 'EZ',
        'sicepat'  => 'BEST',
        'anteraja' => 'REG',
        'pos'      => 'Pos Reguler',
    ];

    public function __construct()
    {
        $this->apiKey = config('services.rajaongkir.key');
        $this->baseUrl = config('services.rajaongkir.base_url', 'https://api.rajaongkir.com/starter') ?? 'https://api.rajaongkir.com/starter';
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

        // API Starter RajaOngkir hanya mendukung JNE di daftar ekspedisi kita. 
        // Kurir J&T dan SiCepat langsung dilempar ke database lokal secara instan (0ms).
        $isCourierSupported = ($courier === 'jne' || $courier === 'pos');

        // Coba API RajaOngkir dulu (hanya jika kurir didukung, kode_kota valid, dan API key tersedia)
        if ($isCourierSupported && $destinasiKota > 0 && !empty($this->apiKey)) {
            try {
                \Log::info('RajaOngkir API call attempt', [
                    'destinasiKota' => $destinasiKota,
                    'courier' => $courier,
                    'beratGram' => $beratGram,
                    'originKota' => $this->originKota
                ]);

                // Timeout dipersingkat menjadi 3 detik agar tidak membebani pemuatan halaman jika API RajaOngkir lambat/down
                $response = Http::timeout(3)
                    ->retry(1, 100)
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
                'reason' => (!$courier ? 'no courier mapping' : (!$isCourierSupported ? 'courier not supported in Starter' : (!$destinasiKota ? 'no destination' : 'no api key')))
            ]);
        }

        // Fallback: ambil dari tabel ongkir lokal berdasarkan provinsi alamat
        \Log::warning('FALLBACK: Using database data instead of real RajaOngkir API', [
            'destinasiKota' => $destinasiKota,
            'ekspedisiId' => $ekspedisiId
        ]);

        $provinsiId = null;
        $alamat = Alamat::where('kode_kota', (string) $destinasiKota)->first();
        if ($alamat) {
            $provinsiId = $alamat->provinsi_id;
        } else {
            // Fallback: cari dari data kota static
            $cities = \App\Data\RajaOngkirCityData::getCities();
            $city = collect($cities)->firstWhere('kode_kota', (string) $destinasiKota);
            if ($city && isset($city['nama_provinsi'])) {
                $normName = $this->normalizeProvinceName($city['nama_provinsi']);
                $dbProv = \App\Models\Provinsi::all()->first(function ($p) use ($normName) {
                    return $this->normalizeProvinceName($p->nama_provinsi) === $normName;
                });
                if ($dbProv) {
                    $provinsiId = $dbProv->id;
                }
            }
        }

        if ($provinsiId) {
            // Coba cari yang spesifik ekspedisi dulu!
            $ongkirLokal = Ongkir::where('provinsi_id', $provinsiId)
                ->where('ekspedisi_id', $ekspedisiId)
                ->first();

            if ($ongkirLokal) {
                \Log::info('Fallback: Found specific ongkir record', [
                    'provinsi_id' => $provinsiId,
                    'harga' => $ongkirLokal->harga
                ]);

                $min = (int) $ongkirLokal->estimasi_hari_min;
                $max = (int) $ongkirLokal->estimasi_hari_max;

                // Variasi estimasi agar tidak seragam di UI
                if ($ekspedisiId === 2) { // J&T: Lebih lambat sedikit (+1 hari)
                    $min = $min + 1;
                    $max = $max + 1;
                } elseif ($ekspedisiId === 3) { // SiCepat: Lebih cepat (-1 hari)
                    $min = max(1, $min - 1);
                    $max = max(1, $max - 1);
                } elseif ($ekspedisiId === 4) { // AnterAja: standar (+0-1 hari)
                    $max = $max + 1;
                } elseif ($ekspedisiId === 5) { // Pos Indonesia: Ekonomis (+1-2 hari)
                    $min = $min + 1;
                    $max = $max + 2;
                }

                return [
                    'harga'             => (int) $ongkirLokal->harga,
                    'estimasi_hari_min' => (string) $min,
                    'estimasi_hari_max' => (string) $max,
                ];
            }

            // Jika tidak ada, baru cari yang generic (ekspedisi_id is null) dan apply fallback
            $genericOngkir = Ongkir::where('provinsi_id', $provinsiId)
                ->whereNull('ekspedisi_id')
                ->first();

            if ($genericOngkir) {
                \Log::info('Fallback: Using generic courier pricing', [
                    'provinsi_id' => $provinsiId,
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

        // ekpedisi_id: 1 = JNE, 2 = J&T, 3 = SiCepat, 4 = AnterAja, 5 = Pos Indonesia
        if ($ekspedisiId === 1) {
            // JNE: Base Price
            $harga = $harga;
        } elseif ($ekspedisiId === 2) {
            // J&T: 0.9x (More affordable)
            $harga = (int) ceil($harga * 0.90);
            $estimasiMin = $estimasiMin + 1;
            $estimasiMax = $estimasiMax + 1;
        } elseif ($ekspedisiId === 3) {
            // SiCepat: 1.25x (Faster express)
            $harga = (int) ceil($harga * 1.25);
            $estimasiMin = max(1, $estimasiMin - 1);
            $estimasiMax = max(1, $estimasiMax - 1);
        } elseif ($ekspedisiId === 4) {
            // AnterAja: 0.95x
            $harga = (int) ceil($harga * 0.95);
            $estimasiMin = $estimasiMin;
            $estimasiMax = $estimasiMax + 1;
        } elseif ($ekspedisiId === 5) {
            // Pos Indonesia: 0.85x
            $harga = (int) ceil($harga * 0.85);
            $estimasiMin = $estimasiMin + 1;
            $estimasiMax = $estimasiMax + 2;
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
            $min = (int) $ongkirLokal->estimasi_hari_min;
            $max = (int) $ongkirLokal->estimasi_hari_max;

            // Variasi estimasi agar tidak seragam di UI
            if ($ekspedisiId === 2) { // J&T: Lebih lambat sedikit (+1 hari)
                $min = $min + 1;
                $max = $max + 1;
            } elseif ($ekspedisiId === 3) { // SiCepat: Lebih cepat (-1 hari)
                $min = max(1, $min - 1);
                $max = max(1, $max - 1);
            } elseif ($ekspedisiId === 4) { // AnterAja: standar (+0-1 hari)
                $max = $max + 1;
            } elseif ($ekspedisiId === 5) { // Pos Indonesia: Ekonomis (+1-2 hari)
                $min = $min + 1;
                $max = $max + 2;
            }

            return [
                'harga'             => (int) $ongkirLokal->harga,
                'estimasi_hari_min' => (string) $min,
                'estimasi_hari_max' => (string) $max,
            ];
        }

        return [
            'harga'             => 0,
            'estimasi_hari_min' => '1',
            'estimasi_hari_max' => '3',
        ];
    }

    /**
     * Ambil daftar provinsi (Langsung dari database lokal agar instan dan bebas latency API)
     */
    public function getProvinsiList(): array
    {
        return \App\Models\Provinsi::all()->map(function ($p) {
            return [
                'id' => $p->id,
                'nama_provinsi' => $p->nama_provinsi,
            ];
        })->toArray();
    }

    /**
     * Ambil daftar kota (Langsung dari data statis lengkap agar instan dan bebas latency API)
     */
    public function getKotaList(): array
    {
        return \App\Data\RajaOngkirCityData::getCities();
    }

    /**
     * Ambil daftar kota berdasarkan provinsi_id
     */
    public function getKotaByProvinsi(int $provinsiId): array
    {
        // Jika API key kosong, map ID lokal ke nama provinsi lalu cari berdasarkan nama
        if (empty($this->apiKey)) {
            $provinsi = \App\Models\Provinsi::find($provinsiId);
            if ($provinsi) {
                return $this->getKotaByProvinsiName($provinsi->nama_provinsi);
            }
        }

        $allCities = $this->getKotaList();
        return collect($allCities)->where('provinsi_id', $provinsiId)->values()->toArray();
    }

    public function getKotaByProvinsiName(string $provinsiName): array
    {
        $allCities = $this->getKotaList();
        $normalizedTarget = $this->normalizeProvinceName($provinsiName);

        // Map newer Papua provinces to parent Papua province names
        if ($normalizedTarget === 'papuabaratdaya') {
            $normalizedTarget = 'papuabarat';
        } elseif (in_array($normalizedTarget, ['papuatengah', 'papuapegunungan', 'papuaselatan'])) {
            $normalizedTarget = 'papua';
        }

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
        // Strip parentheses like (nad), (ntb), (ntt)
        $normalized = preg_replace('/\s*\(.*?\)\s*/', '', $normalized);
        // Replace common variants
        $normalized = str_replace(
            ['daerah', 'istimewa', 'diy', 'no', 'nanggroe', 'darussalam', 'nad', 'ntb', 'ntt'], 
            '', 
            $normalized
        );
        $normalized = preg_replace('/[^a-z0-9]/u', '', $normalized);
        return $normalized;
    }
}
