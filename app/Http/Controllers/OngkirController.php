<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\Keranjang;
use App\Models\Provinsi;
use App\Services\RajaOngkirService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OngkirController extends Controller
{
    protected $rajaOngkir;

    public function __construct(RajaOngkirService $rajaOngkir)
    {
        $this->rajaOngkir = $rajaOngkir;
    }

    public function hitung(Request $request)
    {
        try {
            $request->validate([
                'alamat_id'   => 'required_without:kode_kota|exists:alamat,id',
                'kode_kota'   => 'required_without:alamat_id|integer|min:1',
                'ekspedisi_id' => 'required|integer|min:1|max:5',
            ]);

            $ekspedisiId = (int) $request->ekspedisi_id;
            $kodeKota = null;

            if ($request->filled('alamat_id')) {
                $alamat = Alamat::findOrFail($request->alamat_id);
                $kodeKota = (int) $alamat->kode_kota;

                if (!$kodeKota || $kodeKota <= 0) {
                    Log::warning('Alamat tidak memiliki kode_kota valid', [
                        'alamat_id' => $request->alamat_id,
                        'kode_kota' => $alamat->kode_kota
                    ]);

                    return response()->json([
                        'success' => false,
                        'harga'   => 0,
                        'estimasi_hari_min' => '1',
                        'estimasi_hari_max' => '3',
                        'error'   => 'Alamat pengiriman belum lengkap. Silakan update alamat dengan kota yang valid.',
                    ], 400);
                }
            } else {
                $kodeKota = (int) $request->kode_kota;
            }

            // Validasi ekspedisi ID
            if (!in_array($ekspedisiId, [1, 2, 3, 4, 5])) {
                return response()->json([
                    'success' => false,
                    'harga'   => 0,
                    'estimasi_hari_min' => '1',
                    'estimasi_hari_max' => '3',
                    'error'   => 'Ekspedisi tidak valid.',
                ], 400);
            }

            $keranjang = Keranjang::where('pengguna_id', auth()->id())->get();

            // Hitung berat: dari keranjang jika ada, atau default 250g (untuk checkout langsung / Beli Sekarang)
            if ($keranjang->isNotEmpty()) {
                $beratTotal = max(250, $keranjang->sum(function ($item) {
                    return $item->jumlah * 200; // Asumsi 200g per item
                }));
            } else {
                // Checkout langsung — keranjang kosong, gunakan berat minimum
                $beratTotal = 250;
            }


            Log::info('ONGKIR REQUEST', [
                'kode_kota' => $kodeKota,
                'ekspedisi_id' => $ekspedisiId,
                'berat_total' => $beratTotal,
                'item_count' => $keranjang->count(),
            ]);

            // Hitung ongkir untuk ekspedisi spesifik
            $ongkirData = $this->rajaOngkir->hitungSatuEkspedisi($kodeKota, $ekspedisiId, $beratTotal);

            Log::info('ONGKIR RESULT', [
                'success' => true,
                'harga' => $ongkirData['harga'] ?? 0,
                'estimasi_min' => $ongkirData['estimasi_hari_min'] ?? '1',
                'estimasi_max' => $ongkirData['estimasi_hari_max'] ?? '3',
            ]);

            return response()->json([
                'success' => true,
                'harga'   => $ongkirData['harga'] ?? 0,
                'estimasi_hari_min' => $ongkirData['estimasi_hari_min'] ?? '1',
                'estimasi_hari_max' => $ongkirData['estimasi_hari_max'] ?? '3',
                'data'    => $ongkirData,
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('ONGKIR VALIDATION ERROR', [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'harga'   => 0,
                'estimasi_hari_min' => '1',
                'estimasi_hari_max' => '3',
                'error'   => 'Data yang dikirim tidak valid.',
                'validation_errors' => $e->errors(),
            ], 422);

        } catch (\Throwable $e) {
            Log::error('ONGKIR ERROR: ' . $e->getMessage(), [
                'exception' => (string)$e,
                'request' => $request->all(),
                'user_id' => auth()->id(),
            ]);

            return response()->json([
                'success' => false,
                'harga'   => 0,
                'estimasi_hari_min' => '1',
                'estimasi_hari_max' => '3',
                'error'   => 'Gagal mengambil ongkir. Silakan coba lagi atau hubungi customer service.',
            ], 500);
        }
    }

    public function getProvinsi()
    {
        try {
            $provinsiList = $this->rajaOngkir->getProvinsiList();
            return response()->json($provinsiList);
        } catch (\Exception $e) {
            \Log::error('Error fetching provinsi list', ['error' => $e->getMessage()]);

            // Fallback hardcoded jika API gagal
            return response()->json([
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
            ]);
        }
    }

    public function getKota($provinsiId)
    {
        try {
            if ($provinsiId && $provinsiId !== 'null') {
                $provinsiName = request()->query('provinsi_name', '');

                // Jika ada provinsi_id, ambil kota berdasarkan provinsi dari API RajaOngkir
                $kotaList = $this->rajaOngkir->getKotaByProvinsi((int) $provinsiId);

                // Jika hasil kota tidak cocok dengan nama provinsi yang dipilih, gunakan fallback nama provinsi
                if (!empty($kotaList) && $provinsiName) {
                    $normalizedSelected = $this->rajaOngkir->normalizeProvinceName($provinsiName);
                    $mismatched = collect($kotaList)
                        ->filter(fn ($item) => $this->rajaOngkir->normalizeProvinceName($item['nama_provinsi'] ?? '') !== $normalizedSelected)
                        ->isNotEmpty();

                    if ($mismatched) {
                        $kotaList = $this->rajaOngkir->getKotaByProvinsiName($provinsiName);
                    }
                }

                // Jika tidak ada hasil dari API, coba resolver nama provinsi lokal ke nama kota RajaOngkir
                if (empty($kotaList)) {
                    $provinsiModel = Provinsi::find((int) $provinsiId);
                    if ($provinsiModel) {
                        $kotaList = $this->rajaOngkir->getKotaByProvinsiName($provinsiModel->nama_provinsi);
                    }
                }

                // Jika masih kosong, fallback ke kota hardcoded untuk beberapa provinsi umum
                if (empty($kotaList)) {
                    $fallbackKota = [
                        1 => [ // DKI Jakarta
                            ['id' => 2, 'nama_kota' => 'Jakarta Pusat', 'kode_kota' => '2', 'provinsi_id' => 1],
                            ['id' => 9, 'nama_kota' => 'Tangerang', 'kode_kota' => '9', 'provinsi_id' => 1],
                            ['id' => 10, 'nama_kota' => 'Depok', 'kode_kota' => '10', 'provinsi_id' => 1],
                        ],
                        2 => [ // Jawa Barat
                            ['id' => 3, 'nama_kota' => 'Bandung', 'kode_kota' => '3', 'provinsi_id' => 2],
                        ],
                        6 => [ // Jawa Timur
                            ['id' => 4, 'nama_kota' => 'Surabaya', 'kode_kota' => '4', 'provinsi_id' => 6],
                        ],
                        7 => [ // Lampung
                            ['id' => 1, 'nama_kota' => 'Bandar Lampung', 'kode_kota' => '1', 'provinsi_id' => 7],
                        ],
                        15 => [ // Sumatera Utara
                            ['id' => 5, 'nama_kota' => 'Medan', 'kode_kota' => '5', 'provinsi_id' => 15],
                        ],
                    ];

                    $kotaList = $fallbackKota[(int) $provinsiId] ?? [];
                }
            } else {
                // Jika tidak ada provinsi_id, ambil semua kota dari API RajaOngkir
                $kotaList = $this->rajaOngkir->getKotaList();
            }

            return response()->json($kotaList);
        } catch (\Exception $e) {
            \Log::error('Error fetching kota list', ['error' => $e->getMessage()]);

            // Fallback hardcoded jika API gagal
            return response()->json([
                ['id' => 1, 'nama_kota' => 'Bandar Lampung', 'kode_kota' => '1', 'provinsi_id' => 18],
                ['id' => 2, 'nama_kota' => 'Jakarta Pusat', 'kode_kota' => '2', 'provinsi_id' => 6],
                ['id' => 3, 'nama_kota' => 'Bandung', 'kode_kota' => '3', 'provinsi_id' => 9],
                ['id' => 4, 'nama_kota' => 'Surabaya', 'kode_kota' => '4', 'provinsi_id' => 11],
                ['id' => 5, 'nama_kota' => 'Medan', 'kode_kota' => '5', 'provinsi_id' => 34],
            ]);
        }
    }
}