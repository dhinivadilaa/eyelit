<?php

namespace App\Http\Controllers;

use App\Models\Ulasan;
use App\Models\Pesanan;
use App\Models\DetailPesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UlasanController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'produk_id' => 'required|exists:produk,id',
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        $userId = Auth::id();
        $produkId = $request->produk_id;

        // Cek apakah user sudah membeli produk ini dan pesanan sudah selesai
        $pesanan = Pesanan::where('pengguna_id', $userId)
            ->where('status_pesanan', 'Selesai')
            ->whereHas('detailPesanan', function ($query) use ($produkId) {
                $query->where('produk_id', $produkId);
            })
            ->first();

        if (!$pesanan) {
            return redirect()->back()->with('error', 'Anda belum dapat memberikan ulasan. Produk ini harus dibeli terlebih dahulu dan pesanan sudah selesai.');
        }

        // Ambil detail_pesanan
        $detailPesanan = DetailPesanan::where('pesanan_id', $pesanan->id)
            ->where('produk_id', $produkId)
            ->first();

        // Cek apakah sudah ada ulasan untuk produk ini dari pesanan ini
        $existingUlasan = Ulasan::where('pesanan_id', $pesanan->id)
            ->where('produk_id', $produkId)
            ->where('detail_pesanan_id', $detailPesanan->id)
            ->first();

        if ($existingUlasan) {
            return redirect()->back()->with('error', 'Anda sudah memberikan ulasan untuk produk ini.');
        }

        // Buat ulasan baru
        Ulasan::create([
            'pesanan_id' => $pesanan->id,
            'pengguna_id' => $userId,
            'produk_id' => $produkId,
            'detail_pesanan_id' => $detailPesanan->id,
            'rating' => $request->rating,
            'komentar' => $request->komentar,
            'tanggal_ulasan' => now(),
        ]);

        return redirect()->back()->with('success', 'Ulasan berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        $userId = Auth::id();

        // Cari ulasan milik user
        $ulasan = Ulasan::where('id', $id)
            ->where('pengguna_id', $userId)
            ->first();

        if (!$ulasan) {
            return redirect()->back()->with('error', 'Ulasan tidak ditemukan.');
        }

        // Update ulasan
        $ulasan->update([
            'rating' => $request->rating,
            'komentar' => $request->komentar,
        ]);

        return redirect()->back()->with('success', 'Ulasan berhasil diperbarui');
    }

    // Keep compatibility for direct order reviews if needed
    public function storeForPesanan(Request $request, $pesananId)
    {
        $request->validate([
            'detail_pesanan_id' => 'required|exists:detail_pesanan,id',
            'rating'            => 'required|integer|min:1|max:5',
            'komentar'          => 'nullable|string|max:1000',
        ]);

        $pesanan = Pesanan::where('pengguna_id', auth()->id())
            ->where('status_pesanan', 'Selesai')
            ->findOrFail($pesananId);

        $detail = DetailPesanan::where('pesanan_id', $pesanan->id)
            ->findOrFail($request->detail_pesanan_id);

        $exists = Ulasan::where('pesanan_id', $pesanan->id)
            ->where('detail_pesanan_id', $detail->id)
            ->exists();

        if ($exists) {
            return back()->with('error', 'Produk dalam pesanan ini sudah diulas sebelumnya.');
        }

        Ulasan::create([
            'pesanan_id'        => $pesanan->id,
            'pengguna_id'       => auth()->id(),
            'produk_id'         => $detail->produk_id,
            'detail_pesanan_id' => $detail->id,
            'rating'            => $request->rating,
            'komentar'          => $request->komentar,
            'tanggal_ulasan'    => now(),
        ]);

        return back()->with('success', 'Ulasan produk berhasil dikirim!');
    }
}
