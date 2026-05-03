<?php

namespace App\Http\Controllers;

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
            // 🔥 VALIDASI
            $request->validate([
                'kode_kota' => 'required|integer',
            ]);

            $kodeKota = (int) $request->kode_kota;

            // 🔥 PANGGIL SERVICE
            $result = $this->rajaOngkir->hitungSemuaEkspedisi($kodeKota);

            Log::info('ONGKIR RESULT:', $result);

            // 🔥 AMBIL HARGA TERMURAH (opsional tapi bagus)
            $harga = 0;

            if (isset($result['rajaongkir']['results'])) {
                $allCosts = [];

                foreach ($result['rajaongkir']['results'] as $ekspedisi) {
                    foreach ($ekspedisi['costs'] as $layanan) {
                        if (isset($layanan['cost'][0]['value'])) {
                            $allCosts[] = $layanan['cost'][0]['value'];
                        }
                    }
                }

                if (!empty($allCosts)) {
                    $harga = min($allCosts); // 🔥 ambil yang paling murah
                }
            }

            // 🔥 RESPONSE BERSIH KE FRONTEND
            return response()->json([
                'success' => true,
                'harga'   => $harga,
                'data'    => $result, // optional (buat debug)
            ]);

        } catch (\Throwable $e) {
            Log::error('ONGKIR ERROR: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'harga'   => 0,
                'error'   => 'Gagal mengambil ongkir',
            ], 500);
        }
    }
}