<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Models\Produk;
use App\Models\User;
use App\Models\Ulasan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProduk = Produk::count();
        $totalPesanan = Pesanan::count();
        
        // Pelanggan terdaftar (bukan admin)
        $totalPengguna = User::where('peran', '!=', 'Admin')->count();

        // Pendapatan dari pesanan yang sudah dibayar (Dikemas, Dikirim, Tiba, Selesai)
        $statusSudahBayar = ['Dikemas', 'Dikirim', 'Pesanan Tiba di Tujuan', 'Selesai'];
        $totalPendapatan = Pesanan::whereIn('status_pesanan', $statusSudahBayar)->sum('total_harga');
 
         // Pesanan bulan ini
         $pesananBulanIni = Pesanan::whereMonth('tanggal_pemesanan', now()->month)
             ->whereYear('tanggal_pemesanan', now()->year)
             ->count();
 
         // Pendapatan bulan ini
         $pendapatanBulanIni = Pesanan::whereIn('status_pesanan', $statusSudahBayar)
             ->whereMonth('tanggal_pemesanan', now()->month)
             ->whereYear('tanggal_pemesanan', now()->year)
             ->sum('total_harga');

        // Pesanan menunggu pembayaran
        $menungguPembayaran = Pesanan::where('status_pesanan', 'Menunggu Konfirmasi Pembayaran')->count();

        // Daftar semua pesanan untuk tabel admin
        $daftarPesanan = Pesanan::with([
            'detailPesanan.produk',
            'ekspedisi',
            'alamat.provinsi',
        ])
            ->join('users', 'pesanan.pengguna_id', '=', 'users.id')
            ->select('pesanan.*', 'users.username as nama_pelanggan', 'users.email as email_pelanggan')
            ->orderByDesc('pesanan.tanggal_pemesanan')
            ->get()
            ->map(function ($p) {
                if (!$p->total_harga) {
                    $p->total_harga = $p->detailPesanan->sum('subtotal') + $p->ongkos_kirim;
                }
                return $p;
            });

        // Daftar semua pengguna untuk kelola user
        $daftarPengguna = User::orderBy('username', 'asc')->get()->map(function ($u) {
            $u->jumlah_pesanan = Pesanan::where('pengguna_id', $u->id)->count();
            return $u;
        });

        // Daftar semua ulasan pelanggan
        $daftarUlasan = Ulasan::with([
            'user:id,username,email',
            'produk:id,nama_produk,gambar,merek'
        ])
            ->orderByDesc('created_at')
            ->get();

        // Daftar semua produk untuk Kelola Produk
        $daftarProduk = Produk::orderBy('nama_produk', 'asc')->get()->map(function ($p) {
            // Count how many orders referenced this product
            $p->jumlah_dipesan = \App\Models\DetailPesanan::where('produk_id', $p->id)->count();
            return $p;
        });

        // Laporan Penjualan Bulanan (Grafik & Tren)
        $laporanRaw = Pesanan::whereIn('status_pesanan', $statusSudahBayar)
            ->selectRaw("
                YEAR(tanggal_pemesanan) as tahun, 
                MONTH(tanggal_pemesanan) as bulan, 
                COUNT(id) as total_pesanan, 
                SUM(total_harga) as total_pendapatan
            ")
            ->groupBy('tahun', 'bulan')
            ->orderBy('tahun', 'asc')
            ->orderBy('bulan', 'asc')
            ->get();

        $laporanBulanan = [];
        $prevPendapatan = null;
        $prevPesanan = null;

        foreach ($laporanRaw as $row) {
            $tahun = $row->tahun;
            $bulan = $row->bulan;
            $pendapatan = (float) $row->total_pendapatan;
            $pesanan = (int) $row->total_pesanan;

            $namaBulan = [
                1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April', 5 => 'Mei', 6 => 'Juni',
                7 => 'Juli', 8 => 'Agustus', 9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
            ][$bulan] . ' ' . $tahun;

            $persenPendapatan = 0;
            if ($prevPendapatan !== null && $prevPendapatan > 0) {
                $persenPendapatan = (($pendapatan - $prevPendapatan) / $prevPendapatan) * 100;
            }

            $persenPesanan = 0;
            if ($prevPesanan !== null && $prevPesanan > 0) {
                $persenPesanan = (($pesanan - $prevPesanan) / $prevPesanan) * 100;
            }

            $laporanBulanan[] = [
                'tahun' => $tahun,
                'bulan' => $bulan,
                'label' => $namaBulan,
                'total_pendapatan' => $pendapatan,
                'total_pesanan' => $pesanan,
                'persen_pendapatan' => round($persenPendapatan, 2),
                'persen_pesanan' => round($persenPesanan, 2),
                'tren' => $prevPendapatan !== null ? ($pendapatan >= $prevPendapatan ? 'naik' : 'turun') : 'netral'
            ];

            $prevPendapatan = $pendapatan;
            $prevPesanan = $pesanan;
        }

        // Ambil riwayat chat untuk Admin
        $chatContacts = User::where('peran', '!=', 'Admin')
            ->where(function ($query) {
                $query->whereExists(function ($q) {
                    $q->selectRaw(1)
                      ->from('pesan_chat')
                      ->whereColumn('pesan_chat.pengirim_id', 'users.id')
                      ->orWhereColumn('pesan_chat.penerima_id', 'users.id');
                });
            })
            ->get()
            ->map(function ($u) {
                $lastMessage = \App\Models\PesanChat::where(function ($q) use ($u) {
                    $q->where('pengirim_id', $u->id)
                      ->where('penerima_id', auth()->id());
                })
                ->orWhere(function ($q) use ($u) {
                    $q->where('pengirim_id', auth()->id())
                      ->where('penerima_id', $u->id);
                })
                ->orderByDesc('created_at')
                ->first();

                $unreadCount = \App\Models\PesanChat::where('pengirim_id', $u->id)
                    ->where('penerima_id', auth()->id())
                    ->where('dibaca', false)
                    ->count();

                $u->last_message = $lastMessage ? $lastMessage->pesan : '';
                $u->last_message_time = $lastMessage ? $lastMessage->created_at : null;
                $u->unread_count = $unreadCount;
                return $u;
            })
            ->sortByDesc('last_message_time')
            ->values();

        $activeChatUserId = request()->query('chat_user_id');
        $chatMessages = [];
        if ($activeChatUserId) {
            // Tandai dibaca
            \App\Models\PesanChat::where('pengirim_id', $activeChatUserId)
                ->where('penerima_id', auth()->id())
                ->where('dibaca', false)
                ->update(['dibaca' => true]);

            // Ambil pesan
            $chatMessages = \App\Models\PesanChat::with('produk')
                ->where(function ($q) use ($activeChatUserId) {
                    $q->where('pengirim_id', auth()->id())
                      ->where('penerima_id', $activeChatUserId);
                })
                ->orWhere(function ($q) use ($activeChatUserId) {
                    $q->where('pengirim_id', $activeChatUserId)
                      ->where('penerima_id', auth()->id());
                })
                ->orderBy('created_at', 'asc')
                ->get();
        }

        return Inertia::render('dashboard', [
            'totalProduk' => $totalProduk,
            'totalPesanan' => $totalPesanan,
            'totalPengguna' => $totalPengguna,
            'totalPendapatan' => $totalPendapatan,
            'pesananBulanIni' => $pesananBulanIni,
            'pendapatanBulanIni' => $pendapatanBulanIni,
            'menungguPembayaran' => $menungguPembayaran,
            'daftarPesanan' => $daftarPesanan,
            'daftarPengguna' => $daftarPengguna,
            'daftarUlasan' => $daftarUlasan,
            'daftarProduk' => $daftarProduk,
            'laporanBulanan' => $laporanBulanan,
            'chatContacts' => $chatContacts,
            'activeChatUserId' => $activeChatUserId ? (int)$activeChatUserId : null,
            'chatMessages' => $chatMessages,
        ]);
    }

    public function updateStatusPesanan(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:Menunggu Konfirmasi Pembayaran,Dikemas,Dikirim,Pesanan Tiba di Tujuan,Selesai,Dibatalkan'
        ]);

        $pesanan = Pesanan::findOrFail($id);

        if ($request->status === 'Dibatalkan' && $pesanan->status_pesanan !== 'Dibatalkan') {
            \Illuminate\Support\Facades\DB::transaction(function () use ($pesanan) {
                $pesanan->update([
                    'status_pesanan' => 'Dibatalkan',
                    'tanggal_pembatalan' => now(),
                    'alasan_pembatalan' => 'Dibatalkan oleh Admin.'
                ]);

                // Kembalikan stok produk
                foreach ($pesanan->detailPesanan as $detail) {
                    if ($detail->produk) {
                        $detail->produk->increment('stok', $detail->jumlah);
                    }
                }
            });
        } else {
            $pesanan->update([
                'status_pesanan' => $request->status
            ]);
        }

        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }

    public function downloadLaporan()
    {
        $orders = Pesanan::with([
            'detailPesanan.produk',
            'ekspedisi',
            'alamat.provinsi',
        ])
            ->join('users', 'pesanan.pengguna_id', '=', 'users.id')
            ->select('pesanan.*', 'users.username as nama_pelanggan', 'users.email as email_pelanggan')
            ->orderBy('pesanan.tanggal_pemesanan', 'asc')
            ->get();

        $headers = [
            "Content-type" => "text/csv; charset=UTF-8",
            "Content-Disposition" => "attachment; filename=laporan_detail_orderan_pelanggan_" . date('Y-m') . ".csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $callback = function() use ($orders) {
            $file = fopen('php://output', 'w');
            
            // Tambahkan UTF-8 BOM untuk kompatibilitas Excel
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
            
            // Header kolom
            fputcsv($file, [
                'No', 
                'Bulan & Tahun', 
                'Tanggal Pemesanan', 
                'No. Pesanan', 
                'Nama Pelanggan', 
                'Email Pelanggan', 
                'Metode Pembayaran', 
                'Status Pesanan', 
                'Daftar Produk (Qty & Subtotal)', 
                'Ongkos Kirim (Rp)', 
                'Total Harga (Rp)', 
                'Tanggal Konfirmasi Pembayaran'
            ], ',');

            $no = 1;

            foreach ($orders as $row) {
                $tanggalPemesanan = $row->tanggal_pemesanan;
                
                $namaBulan = '-';
                if ($tanggalPemesanan) {
                    $bulan = (int)$tanggalPemesanan->format('m');
                    $tahun = $tanggalPemesanan->format('Y');
                    $namaBulan = [
                        1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April', 5 => 'Mei', 6 => 'Juni',
                        7 => 'Juli', 8 => 'Agustus', 9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
                    ][$bulan] . ' ' . $tahun;
                }

                // Format list of products
                $produkList = [];
                foreach ($row->detailPesanan as $detail) {
                    $namaProduk = $detail->produk ? $detail->produk->nama_produk : 'Produk Tidak Ditemukan';
                    $produkList[] = "{$namaProduk} (x{$detail->jumlah} - Rp " . number_format($detail->subtotal, 0, ',', '.') . ")";
                }
                $daftarProduk = implode('; ', $produkList);

                // Hitung total_harga jika kosong
                $totalHarga = $row->total_harga;
                if (!$totalHarga) {
                    $totalHarga = $row->detailPesanan->sum('subtotal') + $row->ongkos_kirim;
                }

                fputcsv($file, [
                    $no++,
                    $namaBulan,
                    $tanggalPemesanan ? $tanggalPemesanan->format('Y-m-d H:i:s') : '-',
                    $row->no_pesanan,
                    $row->nama_pelanggan,
                    $row->email_pelanggan,
                    $row->metode_pembayaran ?: '-',
                    $row->status_pesanan,
                    $daftarProduk ?: '-',
                    (float)$row->ongkos_kirim,
                    (float)$totalHarga,
                    $row->tanggal_konfirmasi_pembayaran ? $row->tanggal_konfirmasi_pembayaran->format('Y-m-d H:i:s') : '-'
                ], ',');
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function updatePeranPengguna(Request $request, $id)
    {
        $request->validate([
            'peran' => 'required|string|in:Admin,Pengguna'
        ]);

        $user = User::findOrFail($id);

        if (auth()->id() === $user->id) {
            return back()->with('error', 'Anda tidak dapat mengubah peran akun Anda sendiri.');
        }

        $user->update([
            'peran' => $request->peran
        ]);

        return back()->with('success', 'Peran pengguna berhasil diperbarui.');
    }

    public function hapusPengguna($id)
    {
        $user = User::findOrFail($id);

        if (auth()->id() === $user->id) {
            return back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        // Cek jika pengguna memiliki riwayat transaksi/pesanan
        $hasOrders = Pesanan::where('pengguna_id', $id)->exists();
        if ($hasOrders) {
            return back()->with('error', 'Pengguna tidak dapat dihapus karena memiliki riwayat pesanan.');
        }

        // Hapus data alamat & keranjang terkait
        \App\Models\Alamat::where('pengguna_id', $id)->delete();
        \App\Models\Keranjang::where('pengguna_id', $id)->delete();

        $user->delete();

        return back()->with('success', 'Pengguna berhasil dihapus.');
    }

    public function tambahProduk(Request $request)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'merek' => 'required|string|max:255',
            'tipe_produk' => 'required|string|max:255',
            'harga_produk' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'jenis_kelamin' => 'required|string|in:Pria,Wanita,Unisex',
            'warna' => 'required|string|max:255',
            'material' => 'required|string|max:255',
            'bentuk' => 'required|string|max:255',
            'bridge' => 'nullable|string|max:255',
            'diagonal' => 'nullable|string|max:255',
            'ukuran' => 'nullable|string|max:255',
            'status_produk' => 'required|string|in:Aktif,Nonaktif',
            'gambar_file' => 'nullable|image|max:2048',
            'gambar' => 'nullable|string|max:255'
        ]);

        $namaGambar = 'placeholder.png';
        if ($request->hasFile('gambar_file')) {
            $file = $request->file('gambar_file');
            $namaGambar = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/produk'), $namaGambar);
        } else if ($request->filled('gambar')) {
            $namaGambar = $request->gambar;
        }

        Produk::create([
            'nama_produk' => $request->nama_produk,
            'merek' => $request->merek,
            'tipe_produk' => $request->tipe_produk,
            'harga_produk' => $request->harga_produk,
            'stok' => $request->stok,
            'jenis_kelamin' => $request->jenis_kelamin,
            'warna' => $request->warna,
            'material' => $request->material,
            'bentuk' => $request->bentuk,
            'bridge' => $request->bridge,
            'diagonal' => $request->diagonal,
            'ukuran' => $request->ukuran,
            'status_produk' => $request->status_produk,
            'gambar' => $namaGambar,
        ]);

        return back()->with('success', 'Produk berhasil ditambahkan.');
    }

    public function editProduk(Request $request, $id)
    {
        $produk = Produk::findOrFail($id);

        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'merek' => 'required|string|max:255',
            'tipe_produk' => 'required|string|max:255',
            'harga_produk' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'jenis_kelamin' => 'required|string|in:Pria,Wanita,Unisex',
            'warna' => 'required|string|max:255',
            'material' => 'required|string|max:255',
            'bentuk' => 'required|string|max:255',
            'bridge' => 'nullable|string|max:255',
            'diagonal' => 'nullable|string|max:255',
            'ukuran' => 'nullable|string|max:255',
            'status_produk' => 'required|string|in:Aktif,Nonaktif',
            'gambar_file' => 'nullable|image|max:2048',
            'gambar' => 'nullable|string|max:255'
        ]);

        $namaGambar = $produk->gambar;
        if ($request->hasFile('gambar_file')) {
            $file = $request->file('gambar_file');
            $namaGambar = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/produk'), $namaGambar);
        } else if ($request->filled('gambar')) {
            $namaGambar = $request->gambar;
        }

        $produk->update([
            'nama_produk' => $request->nama_produk,
            'merek' => $request->merek,
            'tipe_produk' => $request->tipe_produk,
            'harga_produk' => $request->harga_produk,
            'stok' => $request->stok,
            'jenis_kelamin' => $request->jenis_kelamin,
            'warna' => $request->warna,
            'material' => $request->material,
            'bentuk' => $request->bentuk,
            'bridge' => $request->bridge,
            'diagonal' => $request->diagonal,
            'ukuran' => $request->ukuran,
            'status_produk' => $request->status_produk,
            'gambar' => $namaGambar,
        ]);

        return back()->with('success', 'Produk berhasil diperbarui.');
    }

    public function hapusProduk($id)
    {
        $produk = Produk::findOrFail($id);

        $hasOrders = \App\Models\DetailPesanan::where('produk_id', $id)->exists();
        if ($hasOrders) {
            return back()->with('error', 'Produk tidak dapat dihapus karena sudah pernah dipesan.');
        }

        // Hapus review & keranjang terkait
        Ulasan::where('produk_id', $id)->delete();
        \App\Models\Keranjang::where('produk_id', $id)->delete();

        $produk->delete();

        return back()->with('success', 'Produk berhasil dihapus.');
    }
}
