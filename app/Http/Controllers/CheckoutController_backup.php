<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\DetailPesanan;
use App\Models\Ekspedisi;
use App\Models\Keranjang;
use App\Models\Lensa;
use App\Models\Pesanan;
use App\Models\Provinsi;
use App\Services\RajaOngkirService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function __construct(private RajaOngkirService $rajaOngkir) {}
    
    public function index()
    {
        $keranjang = Keranjang::with('produk')
            ->where('pengguna_id', auth()->id())
            ->get();

        if ($keranjang->isEmpty()) {
            return redirect()->route('keranjang')->with('error', 'Keranjang kosong.');
        }

        $lensaData = Lensa::where('status_lensa', true)->get();
        
        $items = $keranjang->map(function ($item) use ($lensaData) {
            $produk = $item->produk;
            $hargaLensa = $this->hitungHargaLensa($item, $lensaData);
            
            return [
                'id'             => $item->id,
                'produk_id'      => $item->produk_id,
                'nama_produk'    => $produk?->nama_produk ?? 'Produk tidak ditemukan',
                'merek'          => $produk?->merek ?? 'N/A',
                'gambar'         => $produk?->gambar ?? 'placeholder.png',
                'harga_produk'   => $produk?->harga_produk ?? 0,
                'jumlah'         => $item->jumlah,
                'tipe_pembelian' => $item->tipe_pembelian,
                'harga_lensa'    => $hargaLensa,
                'subtotal'       => ((int) ($produk?->harga_produk ?? 0) + $hargaLensa) * $item->jumlah,
            ];
        });

        $alamat    = Alamat::with('provinsi')->where('pengguna_id', auth()->id())->get();
        $provinsi  = Provinsi::orderBy('nama_provinsi')->get();
        $ekspedisi = Ekspedisi::where('status_ekspedisi', true)->get();

        return Inertia::render('checkout', [
            'items'      => $items,
            'total'      => $items->sum('subtotal'),
            'alamat'     => $alamat,
            'provinsi'   => $provinsi,
            'ekspedisi'  => $ekspedisi,
            'lensa_data' => $lensaData,
        ]);
    }

    public function ongkir(Request $request)
    {
        $request->validate([
            'alamat_id' => 'required|exists:alamat,id',
            'ekspedisi_id' => 'required|exists:ekspedisi,id',
        ]);

        $alamat = Alamat::findOrFail($request->alamat_id);
        
        // Dynamic weight calculation
        $keranjang = Keranjang::where('pengguna_id', auth()->id())->get();
        $beratTotal = max(250, $keranjang->sum(fn($item) => $item->jumlah * 200)); // min 250g
        
        \Log::info('Ongkir calculation', [
            'alamat_kode_kota' => $alamat->kode_kota,
            'ekspedisi_id' => $request->ekspedisi_id,
            'berat_gram' => $beratTotal
        ]);

        $ongkirData = $this->rajaOngkir->hitungSatuEkspedisi(
            (int) $alamat->kode_kota,
            (int) $request->ekspedisi_id,
            $beratTotal
        );

        return response()->json($ongkirData);
    }

    public function proses(Request $request)
    {
        DB::transaction(function () use ($request) {
            $request->validate([
                'alamat_id'         => 'required|exists:alamat,id',
                'ekspedisi_id'      => 'required|exists:ekspedisi,id',
                'metode_pembayaran' => 'required|in:QRIS,Virtual Account BCA',
            ]);

            $keranjang = Keranjang::with('produk')
                ->where('pengguna_id', auth()->id())
                ->get();

            if ($keranjang->isEmpty()) {
                throw new \Exception('Keranjang kosong.');
            }

            $alamat = Alamat::findOrFail($request->alamat_id);
            
            $beratTotal = max(250, $keranjang->sum(fn($item) => $item->jumlah * 200));
            $ongkirData = $this->rajaOngkir->hitungSatuEkspedisi(
                (int) $alamat->kode_kota,
                (int) $request->ekspedisi_id,
                $beratTotal
            );
            $ongkosKirim = $ongkirData['harga'] ?? 0;

            $lensaData = Lensa::where('status_lensa', true)->get();
            $totalProduk = 0;

            $pesanan = Pesanan::create([
                'no_pesanan'         => 'EYL-' . strtoupper(Str::random(8)),
                'pengguna_id'        => auth()->id(),
                'alamat_id'          => $request->alamat_id,
                'ekspedisi_id'       => $request->ekspedisi_id,
                'metode_pembayaran'  => $request->metode_pembayaran,
                'ongkos_kirim'       => $ongkosKirim,
                'total_harga'        => 0, // will update after details
                'status_pesanan'     => 'Menunggu Konfirmasi Pembayaran',
                'tanggal_pemesanan'  => now(),
                'batas_waktu_pembayaran' => now()->addHours(24),
            ]);

            foreach ($keranjang as $item) {
                // Stock check
                if ($item->produk->stok < $item->jumlah) {
                    throw new \Exception('Stok produk tidak mencukupi.');
                }

                $hargaLensa = $this->hitungHargaLensa($item, $lensaData);
                $subtotal = ($item->produk->harga_produk + $hargaLensa) * $item->jumlah;
                $totalProduk += $subtotal;

                DetailPesanan::create([
                    'pesanan_id'     => $pesanan->id,
                    'produk_id'      => $item->produk_id,
                    'jumlah'         => $item->jumlah,
                    'harga_frame'    => $item->produk->harga_produk,
                    'tipe_pembelian' => $item->tipe_pembelian,
                    'jenis_lensa_od' => $item->jenis_lensa_od,
                    'nilai_lensa_od' => $item->nilai_lensa_od,
                    'silinder_od'    => $item->silinder_od,
                    'jenis_lensa_os' => $item->jenis_lensa_os,
                    'nilai_lensa_os' => $item->nilai_lensa_os,
                    'silinder_os'    => $item->silinder_os,
                    'anti_radiasi'   => $item->anti_radiasi,
                    'photochromic'   => $item->photochromic,
                    'subtotal_lensa' => $hargaLensa * $item->jumlah,
                    'subtotal'       => $subtotal,
                ]);
            }

            // Update total harga
            $pesanan->update(['total_harga' => $totalProduk + $ongkosKirim]);

            Keranjang::where('pengguna_id', auth()->id())->delete();
        });

        return redirect()->route('pesanan.show', $pesanan->id)
            ->with('success', 'Pesanan berhasil dibuat!');
    }

    public function tambahAlamat(Request $request)
    {
        $request->validate([
            'nama_penerima'  => 'required|string|max:100',
            'no_hp_penerima' => 'required|string|max:20',
            'provinsi_id'    => 'required|exists:provinsi,id',
            'kode_kota'      => 'required|integer',
            'nama_kota'      => 'required|string|max:100',
            'kota_kabupaten' => 'required|string|max:100',
            'kecamatan'      => 'required|string|max:100',
            'kode_pos'       => 'required|string|max:10',
            'alamat_lengkap' => 'required|string',
        ]);

        $isFirst = !Alamat::where('pengguna_id', auth()->id())->exists();

        Alamat::create([
            'pengguna_id'    => auth()->id(),
            'nama_penerima'  => $request->nama_penerima,
            'no_hp_penerima' => $request->no_hp_penerima,
            'provinsi_id'    => $request->provinsi_id,
            'kode_kota'      => $request->kode_kota,
            'nama_kota'      => $request->nama_kota,
            'kota_kabupaten' => $request->kota_kabupaten,
            'kecamatan'      => $request->kecamatan,
            'kode_pos'       => $request->kode_pos,
            'alamat_lengkap' => $request->alamat_lengkap,
            'alamat_utama'   => $isFirst,
        ]);

        return back()->with('success', 'Alamat berhasil ditambahkan.');
    }

    private function hitungHargaLensa($item, $lensaData = null): int
    {
        if ($item->tipe_pembelian !== 'Frame + Lensa') return 0;

        $lensaData ??= Lensa::where('status_lensa', true)->get();
        $total = 0;

        foreach (['od', 'os'] as $mata) {
            $jenis   = $item->{"jenis_lensa_{$mata}"};
            $nilai   = $item->{"nilai_lensa_{$mata}"};
            $silinder = $item->{"silinder_{$mata}"};

            if ($jenis && $nilai !== null) {
                $lensa = $lensaData->where('jenis_lensa', $jenis)
                    ->filter(fn($l) => $nilai >= $l->minus_plus_batas_bawah && $nilai <= $l->minus_plus_batas_atas)
                    ->first();
                if ($lensa) $total += $lensa->harga_per_mata;
            }

            if ($silinder > 0) {
                $ls = $lensaData->where('jenis_lensa', 'Silinder')
                    ->filter(fn($l) => $silinder >= $l->minus_plus_batas_bawah && $silinder <= $l->minus_plus_batas_atas)
                    ->first();
                if ($ls) $total += $ls->harga_per_mata;
            }
        }

        if ($item->anti_radiasi) $total += $lensaData->first()?->harga_anti_radiasi ?? 0;
        if ($item->photochromic) $total += $lensaData->first()?->harga_photochromic ?? 0;

        return (int) $total;
    }
}

