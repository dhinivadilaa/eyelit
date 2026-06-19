<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Inertia\Inertia;

class PesananController extends Controller
{
    public function __construct(private \App\Services\XenditService $xendit) {}

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
        $query = Pesanan::with([
            'detailPesanan.produk',
            'alamat.provinsi',
            'ekspedisi',
        ]);

        if (auth()->user()->peran !== 'Admin') {
            $query->where('pengguna_id', auth()->id());
        }

        $pesanan = $query->findOrFail($id);

        // Otomatis cek status pembayaran jika transaksi real Xendit
        if ($pesanan->status_pesanan === 'Menunggu Konfirmasi Pembayaran' 
            && !empty($pesanan->xendit_payment_id) 
            && !str_starts_with($pesanan->xendit_payment_id, 'mock-')) {
            $this->checkAndUpdatePaymentStatus($pesanan);
            $pesanan->refresh();
        }

        $subtotalProduk = $pesanan->detailPesanan->sum('subtotal');
        $grandTotal     = $subtotalProduk + $pesanan->ongkos_kirim;

        $ulasanQuery = \App\Models\Ulasan::where('pesanan_id', $pesanan->id);
        if (auth()->user()->peran !== 'Admin') {
            $ulasanQuery->where('pengguna_id', auth()->id());
        }
        $ulasan = $ulasanQuery->get();

        return Inertia::render('pesanan-detail', [
            'pesanan'         => $pesanan,
            'subtotal_produk' => $subtotalProduk,
            'grand_total'     => $grandTotal,
            'ulasan'          => $ulasan,
            'xendit_payment_url' => $pesanan->xendit_payment_url ?? session('xendit_payment_url'),
            'xendit_payment_info' => $pesanan->xendit_payment_info ?? session('xendit_payment_info'),
        ]);
    }

    public function updateStatus(\Illuminate\Http\Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:Menunggu Konfirmasi Pembayaran,Dikemas,Dikirim,Pesanan Tiba di Tujuan,Selesai,Dibatalkan'
        ]);

        $query = Pesanan::query();
        if (auth()->user()->peran !== 'Admin') {
            $query->where('pengguna_id', auth()->id());
        }
        
        $pesanan = $query->findOrFail($id);

        // Pengaman: Jika pembeli biasa mengupdate status, dia hanya boleh mengubah dari 'Pesanan Tiba di Tujuan' ke 'Selesai'
        if (auth()->user()->peran !== 'Admin') {
            if ($pesanan->status_pesanan !== 'Pesanan Tiba di Tujuan' || $request->status !== 'Selesai') {
                return back()->with('error', 'Anda hanya dapat menyelesaikan pesanan yang telah tiba di tujuan.');
            }
        }

        $pesanan->update([
            'status_pesanan' => $request->status,
            'tanggal_selesai' => $request->status === 'Selesai' ? now() : $pesanan->tanggal_selesai,
        ]);

        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }

    public function simulasiPembayaranShow($no_pesanan)
    {
        $pesanan = Pesanan::with(['detailPesanan.produk', 'ekspedisi'])
            ->where('no_pesanan', $no_pesanan)
            ->where('pengguna_id', auth()->id())
            ->firstOrFail();

        $subtotalProduk = $pesanan->detailPesanan->sum('subtotal');
        $grandTotal     = $subtotalProduk + $pesanan->ongkos_kirim;

        return Inertia::render('simulasi-pembayaran', [
            'pesanan'         => $pesanan,
            'subtotal_produk' => $subtotalProduk,
            'grand_total'     => $grandTotal,
        ]);
    }

    public function simulasiPembayaranProses(\Illuminate\Http\Request $request, $no_pesanan)
    {
        $request->validate([
            'status' => 'required|in:lunas,batal',
        ]);

        $pesanan = Pesanan::where('no_pesanan', $no_pesanan)
            ->where('pengguna_id', auth()->id())
            ->firstOrFail();

        if ($request->status === 'lunas') {
            if (!empty($pesanan->xendit_payment_id) && !str_starts_with($pesanan->xendit_payment_id, 'mock-')) {
                // Call real Xendit Simulation API
                $simResult = $this->xendit->simulatePayment(
                    $pesanan->xendit_payment_id,
                    $pesanan->no_pesanan,
                    $pesanan->total_harga,
                    $pesanan->metode_pembayaran
                );

                if (isset($simResult['error'])) {
                    $msg = $simResult['message'] ?? '';
                    // Cek jika errornya adalah karena QR code sudah tidak aktif / lunas
                    if (str_contains($msg, 'INACTIVE_QR_CODE') || str_contains($msg, '410') || str_contains($msg, 'already paid')) {
                        $pesanan->update([
                            'status_pesanan' => 'Dikemas',
                            'tanggal_konfirmasi_pembayaran' => now(),
                        ]);
                        $message = 'Pembayaran terdeteksi sudah lunas di Xendit! Status pesanan diperbarui menjadi Dikemas.';
                    } else {
                        return back()->with('error', 'Gagal mensimulasikan pembayaran di API Xendit: ' . $msg);
                    }
                } else {
                    // Force update status to Dikemas since simulation succeeded
                    $pesanan->update([
                        'status_pesanan' => 'Dikemas',
                        'tanggal_konfirmasi_pembayaran' => now(),
                    ]);
                    $message = 'Pembayaran berhasil disimulasikan ke Xendit Sandbox! Status pesanan diperbarui menjadi Dikemas.';
                }
            } else {
                $pesanan->update([
                    'status_pesanan' => 'Dikemas',
                    'tanggal_konfirmasi_pembayaran' => now(),
                ]);
                $message = 'Pembayaran berhasil disimulasikan! Status pesanan berubah menjadi Dikemas.';
            }
        } else {
            if ($pesanan->status_pesanan !== 'Dibatalkan') {
                \Illuminate\Support\Facades\DB::transaction(function () use ($pesanan) {
                    $pesanan->update([
                        'status_pesanan' => 'Dibatalkan',
                        'tanggal_pembatalan' => now(),
                        'alasan_pembatalan' => 'Dibatalkan oleh pembeli via simulasi.',
                    ]);

                    // Kembalikan stok produk
                    foreach ($pesanan->detailPesanan as $detail) {
                        if ($detail->produk) {
                            $detail->produk->increment('stok', $detail->jumlah);
                        }
                    }
                });
            }
            $message = 'Pembatalan pesanan berhasil disimulasikan! Status pesanan berubah menjadi Dibatalkan.';
        }

        return redirect()->route('pesanan.show', $pesanan->id)->with('success', $message);
    }

    public function cekPembayaran($id)
    {
        $query = Pesanan::query();
        if (auth()->user()->peran !== 'Admin') {
            $query->where('pengguna_id', auth()->id());
        }
        $pesanan = $query->findOrFail($id);

        if ($pesanan->status_pesanan !== 'Menunggu Konfirmasi Pembayaran') {
            return back()->with('info', 'Status pesanan ini tidak lagi menunggu pembayaran.');
        }

        if (empty($pesanan->xendit_payment_id)) {
            return back()->with('error', 'ID Pembayaran Xendit tidak ditemukan.');
        }

        $paid = $this->checkAndUpdatePaymentStatus($pesanan);

        if ($paid) {
            return back()->with('success', 'Pembayaran terkonfirmasi! Status pesanan berubah menjadi Dikemas.');
        }

        return back()->with('info', 'Pembayaran belum diterima oleh Xendit.');
    }

    public function batalkan(\Illuminate\Http\Request $request, $id)
    {
        $query = Pesanan::query();
        if (auth()->user()->peran !== 'Admin') {
            $query->where('pengguna_id', auth()->id());
        }

        $pesanan = $query->whereIn('status_pesanan', ['Menunggu Konfirmasi Pembayaran', 'Dikemas'])
            ->findOrFail($id);

        \Illuminate\Support\Facades\DB::transaction(function () use ($pesanan, $request) {
            $pesanan->update([
                'status_pesanan' => 'Dibatalkan',
                'tanggal_pembatalan' => now(),
                'alasan_pembatalan' => $request->input('alasan', 'Dibatalkan oleh pembeli.'),
            ]);

            // Kembalikan stok produk
            foreach ($pesanan->detailPesanan as $detail) {
                if ($detail->produk) {
                    $detail->produk->increment('stok', $detail->jumlah);
                }
            }
        });

        return back()->with('success', 'Pesanan Anda berhasil dibatalkan.');
    }

    public function statusPembayaranJson($id)
    {
        $pesanan = Pesanan::where('pengguna_id', auth()->id())->findOrFail($id);

        // Cek status pembayaran ke Xendit & update DB jika lunas
        $this->checkAndUpdatePaymentStatus($pesanan);

        return response()->json([
            'status_pesanan' => $pesanan->status_pesanan,
            'tanggal_konfirmasi_pembayaran' => $pesanan->tanggal_konfirmasi_pembayaran ? $pesanan->tanggal_konfirmasi_pembayaran->toIso8601String() : null,
        ]);
    }

    private function checkAndUpdatePaymentStatus(Pesanan $pesanan): bool
    {
        if ($pesanan->status_pesanan !== 'Menunggu Konfirmasi Pembayaran') {
            return true;
        }

        if (empty($pesanan->xendit_payment_id)) {
            return false;
        }

        // Jika mode mock, tidak perlu memanggil API Xendit asli
        if (str_starts_with($pesanan->xendit_payment_id, 'mock-')) {
            return false;
        }

        try {
            $isPaid = false;
            if ($pesanan->metode_pembayaran === 'Virtual Account BCA') {
                $payments = $this->xendit->getVirtualAccountPayment($pesanan->no_pesanan);
                if (!empty($payments) && is_array($payments) && count($payments) > 0) {
                    $isPaid = true;
                }
            } else {
                // QRIS
                $qris = $this->xendit->getQrisStatus($pesanan->xendit_payment_id);
                if (!empty($qris) && isset($qris['status'])) {
                    $status = strtoupper($qris['status']);
                    // Xendit V2 QR Codes status: DYNAMIC QR code turns to 'INACTIVE' or 'SUCCEEDED' upon successful payment
                    if ($status === 'COMPLETED' || $status === 'SUCCEEDED' || $status === 'INACTIVE') {
                        $isPaid = true;
                    }
                }
            }

            if ($isPaid) {
                $pesanan->update([
                    'status_pesanan' => 'Dikemas',
                    'tanggal_konfirmasi_pembayaran' => now(),
                ]);
                return true;
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Direct payment status check failed: ' . $e->getMessage());
        }

        return false;
    }
}
