<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Inertia\Inertia;

class PesananController extends Controller
{
    public function index()
    {
        $pesanan = Pesanan::with([
            'detailPesanan.produk',
            'ekspedisi',
        ])
            ->where('pengguna_id', auth()->id())
            ->orderByDesc('tanggal_pemesanan')
            ->get()
            ->map(function ($p) {
                // Hitung total_harga dari detail jika belum tersimpan
                if (!$p->total_harga) {
                    $p->total_harga = $p->detailPesanan->sum('subtotal') + $p->ongkos_kirim;
                }
                return $p;
            });

        return Inertia::render('pesanan', [
            'pesanan' => $pesanan,
        ]);
    }

    public function show($id)
    {
        $pesanan = Pesanan::with([
            'detailPesanan.produk',
            'alamat.provinsi',
            'ekspedisi',
        ])
            ->where('pengguna_id', auth()->id())
            ->findOrFail($id);

        $subtotalProduk = $pesanan->detailPesanan->sum('subtotal');
        $grandTotal     = $subtotalProduk + $pesanan->ongkos_kirim;

        return Inertia::render('pesanan-detail', [
            'pesanan'         => $pesanan,
            'subtotal_produk' => $subtotalProduk,
            'grand_total'     => $grandTotal,
        ]);
    }
}
