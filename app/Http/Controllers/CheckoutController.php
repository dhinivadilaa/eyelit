<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\DetailPesanan;
use App\Models\Ekspedisi;
use App\Models\Keranjang;
use App\Models\Lensa;
use App\Models\Pesanan;
use App\Models\Produk;
use App\Models\Provinsi;
use App\Services\RajaOngkirService;
use App\Services\XenditService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function __construct(
        private RajaOngkirService $rajaOngkir,
        private XenditService $xendit
    ) {}

    public function langsung(Request $request)
    {
        if (!auth()->check()) {
            return redirect('/login')->with('error', 'Silakan login terlebih dahulu.');
        }

        $validated = $request->validate([
            'produk_id'       => 'required|exists:produk,id',
            'jumlah'         => 'required|integer|min:1',
            'tipe_pembelian' => 'required|in:Frame Saja,Frame + Lensa',
            'jenis_lensa_od' => 'nullable|string',
            'nilai_lensa_od' => 'nullable|string',
            'silinder_od'    => 'nullable|string',
            'jenis_lensa_os' => 'nullable|string',
            'nilai_lensa_os' => 'nullable|string',
            'silinder_os'    => 'nullable|string',
            'anti_radiasi'   => 'nullable|boolean',
            'photochromic'   => 'nullable|boolean',
        ]);

        $produk = Produk::findOrFail($validated['produk_id']);

        if ($produk->stok < ($validated['jumlah'] ?? 1)) {
            return redirect()->back()->with('error', 'Stok tidak mencukupi.');
        }

        $lensaData = Lensa::where('status_lensa', true)->get();
        $hargaLensa = 0;

        if ($validated['tipe_pembelian'] === 'Frame + Lensa') {
            $hargaLensa = $this->hitungHargaLensaLangsung($validated, $lensaData);
        }

        $jumlah = (int) ($validated['jumlah'] ?? 1);
        $hargaProduk = (int) ($produk->harga_produk ?? 0);
        $subtotal = ($hargaProduk + $hargaLensa) * $jumlah;

        session(['checkout_langsung' => [
            'produk_id'      => $produk->id,
            'nama_produk'    => $produk->nama_produk,
            'merek'          => $produk->merek ?? 'N/A',
            'gambar'         => $produk->gambar ?? 'placeholder.png',
            'harga_produk'   => $hargaProduk,
            'jumlah'         => $jumlah,
            'tipe_pembelian' => $validated['tipe_pembelian'],
            'harga_lensa'    => $hargaLensa,
            'subtotal'       => $subtotal,
            'back_url'       => '/produk/' . $produk->id,
            'jenis_lensa_od' => $validated['jenis_lensa_od'] ?? null,
            'nilai_lensa_od' => $validated['nilai_lensa_od'] ?? null,
            'silinder_od'    => $validated['silinder_od'] ?? null,
            'jenis_lensa_os' => $validated['jenis_lensa_os'] ?? null,
            'nilai_lensa_os' => $validated['nilai_lensa_os'] ?? null,
            'silinder_os'    => $validated['silinder_os'] ?? null,
            'anti_radiasi'   => !empty($validated['anti_radiasi']),
            'photochromic'   => !empty($validated['photochromic']),
        ]]);

        return redirect()->route('checkout.langsung');
    }

    public function langsungGet(Request $request)
    {
        if (!auth()->check()) {
            return redirect('/login')->with('error', 'Silakan login terlebih dahulu.');
        }

        $data = session('checkout_langsung');

        if (!$data) {
            return redirect('/katalog')->with('error', 'Data checkout tidak ditemukan.');
        }

        $alamat    = Alamat::with('provinsi')->where('pengguna_id', auth()->id())->get();
        $provinsi  = Provinsi::orderBy('nama_provinsi')->get();
        $ekspedisi = Ekspedisi::where('status_ekspedisi', true)->get();

        $item = [
            'id'              => 'langsung_' . $data['produk_id'],
            'produk_id'       => $data['produk_id'],
            'nama_produk'     => $data['nama_produk'],
            'merek'           => $data['merek'],
            'gambar'          => $data['gambar'],
            'harga_produk'    => $data['harga_produk'],
            'jumlah'          => $data['jumlah'],
            'tipe_pembelian'  => $data['tipe_pembelian'],
            'harga_lensa'     => $data['harga_lensa'],
            'subtotal'        => $data['subtotal'],
            'jenis_lensa_od'  => $data['jenis_lensa_od'],
            'nilai_lensa_od'  => $data['nilai_lensa_od'],
            'silinder_od'     => $data['silinder_od'],
            'jenis_lensa_os'  => $data['jenis_lensa_os'],
            'nilai_lensa_os'  => $data['nilai_lensa_os'],
            'silinder_os'     => $data['silinder_os'],
            'anti_radiasi'    => $data['anti_radiasi'],
            'photochromic'    => $data['photochromic'],
            'is_langsung'     => true,
        ];

        return Inertia::render('checkout', [
            'items'     => [$item],
            'total'     => $data['subtotal'],
            'alamat'    => $alamat,
            'provinsi'  => $provinsi,
            'ekspedisi' => $ekspedisi,
            'back_url'  => $data['back_url'] ?? '/katalog',
        ]);
    }

    public function index(Request $request)
    {
        $selectedIds = $request->query('items');

        $query = Keranjang::with('produk')
            ->where('pengguna_id', auth()->id());

        if ($selectedIds) {
            $ids = array_filter(array_map('intval', explode(',', $selectedIds)));
            $query->whereIn('id', $ids);
        }

        $keranjang = $query->get();

        if ($keranjang->isEmpty()) {
            return redirect()->route('keranjang')->with('error', 'Pilih produk yang ingin checkout.');
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
            'back_url'   => '/keranjang',
        ]);
    }

    public function ongkir(Request $request)
    {
        $request->validate([
            'alamat_id'    => 'required|exists:alamat,id',
            'ekspedisi_id' => 'required|exists:ekspedisi,id',
            'produk_id'    => 'nullable|exists:produk,id',
        ]);

        $alamat      = Alamat::findOrFail($request->alamat_id);
        $ekspedisiId = (int) $request->ekspedisi_id;
        $produkId    = $request->input('produk_id');

        if ($produkId) {
            $beratTotal = max(250, (int)($request->input('jumlah') ?? 1) * 200);
        } else {
            $keranjang  = Keranjang::where('pengguna_id', auth()->id())->get();
            $beratTotal = max(250, $keranjang->sum(fn($item) => $item->jumlah * 200));
        }

        if (!empty($alamat->kode_kota)) {
            $ongkirData = $this->rajaOngkir->hitungSatuEkspedisi((int) $alamat->kode_kota, $ekspedisiId, $beratTotal);
        } else {
            $ongkirData = $this->rajaOngkir->hitungDariProvinsi((int) $alamat->provinsi_id, $ekspedisiId);
        }

        return response()->json($ongkirData);
    }

    public function proses(Request $request)
    {
        $pesanan = null;
        $paymentResponse = null;

        try {
            DB::transaction(function () use ($request, &$pesanan, &$paymentResponse) {
                $request->validate([
                    'alamat_id'         => 'required|exists:alamat,id',
                    'ekspedisi_id'      => 'required|exists:ekspedisi,id',
                    'metode_pembayaran' => 'required|in:QRIS,Virtual Account BCA',
                ]);

                $produkId = $request->input('produk_id');
                $lensaData = Lensa::where('status_lensa', true)->get();
                $totalProduk = 0;
                $alamat = Alamat::findOrFail($request->alamat_id);

                if ($produkId) {
                    $produk = Produk::findOrFail($produkId);
                    $jumlah = (int) ($request->input('jumlah') ?? 1);
                    if ($produk->stok < $jumlah) throw new \Exception('Stok tidak mencukupi.');

                    $tipePembelian = $request->input('tipe_pembelian', 'Frame Saja');
                    $hargaLensa = 0;
                    if ($tipePembelian === 'Frame + Lensa') {
                        $hargaLensa = $this->hitungHargaLensaLangsung($request->all(), $lensaData);
                    }
                    $beratTotal = max(250, $jumlah * 200);
                } else {
                    $keranjang = Keranjang::with('produk')->where('pengguna_id', auth()->id())->get();
                    if ($keranjang->isEmpty()) throw new \Exception('Keranjang kosong.');
                    $beratTotal = max(250, $keranjang->sum(fn($item) => $item->jumlah * 200));
                }

                if (!empty($alamat->kode_kota)) {
                    $ongkirData = $this->rajaOngkir->hitungSatuEkspedisi((int) $alamat->kode_kota, (int) $request->ekspedisi_id, $beratTotal);
                } else {
                    $ongkirData = $this->rajaOngkir->hitungDariProvinsi((int) $alamat->provinsi_id, (int) $request->ekspedisi_id);
                }
                $ongkosKirim = $ongkirData['harga'] ?? 0;
                if ($ongkosKirim <= 0) throw new \Exception('Gagal menghitung ongkos kirim.');

                $pesanan = Pesanan::create([
                    'no_pesanan'             => 'EYL-' . strtoupper(Str::random(8)),
                    'pengguna_id'            => auth()->id(),
                    'alamat_id'              => $request->alamat_id,
                    'ekspedisi_id'           => $request->ekspedisi_id,
                    'metode_pembayaran'      => $request->metode_pembayaran,
                    'ongkos_kirim'           => $ongkosKirim,
                    'status_pesanan'         => 'Menunggu Konfirmasi Pembayaran',
                    'tanggal_pemesanan'      => now(),
                    'batas_waktu_pembayaran' => now()->addHours(24),
                ]);

                if ($produkId) {
                    $subtotal = ((int) $produk->harga_produk + $hargaLensa) * $jumlah;
                    $totalProduk += $subtotal;
                    DetailPesanan::create([
                        'pesanan_id'     => $pesanan->id,
                        'produk_id'      => $produk->id,
                        'jumlah'         => $jumlah,
                        'harga_frame'    => $produk->harga_produk,
                        'tipe_pembelian' => $tipePembelian,
                        'jenis_lensa_od' => $request->input('jenis_lensa_od'),
                        'nilai_lensa_od' => $request->input('nilai_lensa_od'),
                        'silinder_od'    => $request->input('silinder_od'),
                        'jenis_lensa_os' => $request->input('jenis_lensa_os'),
                        'nilai_lensa_os' => $request->input('nilai_lensa_os'),
                        'silinder_os'    => $request->input('silinder_os'),
                        'anti_radiasi'   => $request->input('anti_radiasi') ? 1 : 0,
                        'photochromic'   => $request->input('photochromic') ? 1 : 0,
                        'subtotal_lensa' => $hargaLensa * $jumlah,
                        'subtotal'       => $subtotal,
                    ]);
                    $produk->decrement('stok', $jumlah);
                } else {
                    foreach ($keranjang as $item) {
                        $produk = $item->produk;
                        if (!$produk || $produk->stok < $item->jumlah) throw new \Exception("Stok produk tidak mencukupi.");
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
                        $produk->decrement('stok', $item->jumlah);
                    }
                }

                $totalHarga = $totalProduk + $ongkosKirim;
                $pesanan->update(['total_harga' => $totalHarga]);
                $paymentResponse = ($request->metode_pembayaran === 'Virtual Account BCA') 
                    ? $this->xendit->createBcaVaInvoice($pesanan->no_pesanan, $totalHarga, "Pembayaran {$pesanan->no_pesanan}", auth()->user()->email, $pesanan->id)
                    : $this->xendit->createQrisInvoice($pesanan->no_pesanan, $totalHarga, "Pembayaran {$pesanan->no_pesanan}", auth()->user()->email, $pesanan->id);

                $pesanan->update([
                    'xendit_payment_id'   => $paymentResponse['id'] ?? null,
                    'xendit_payment_url'  => $paymentResponse['invoice_url'] ?? null,
                    'xendit_payment_info' => $paymentResponse,
                ]);

                if (!$produkId) Keranjang::where('pengguna_id', auth()->id())->delete();
                session()->forget('checkout_langsung');
            });

            return redirect()->route('pesanan.show', $pesanan->id)->with('success', 'Pesanan berhasil dibuat!');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal memproses pesanan: ' . $e->getMessage());
        }
    }

    public function tambahAlamat(Request $request)
    {
        $request->validate([
            'nama_penerima'  => 'required',
            'no_hp_penerima' => 'required',
            'provinsi_id'    => 'required',
            'kode_kota'      => 'required',
            'nama_kota'      => 'required',
            'kota_kabupaten' => 'required',
            'kecamatan'      => 'required',
            'kode_pos'       => 'required',
            'alamat_lengkap' => 'required',
        ]);

        $isFirst = !Alamat::where('pengguna_id', auth()->id())->exists();
        Alamat::create(array_merge($request->all(), ['pengguna_id' => auth()->id(), 'alamat_utama' => $isFirst]));

        return back()->with('success', 'Alamat berhasil disimpan.');
    }

    public function editAlamat(Request $request, $id)
    {
        $request->validate([
            'nama_penerima'  => 'required',
            'no_hp_penerima' => 'required',
            'provinsi_id'    => 'required',
            'kode_kota'      => 'required',
            'nama_kota'      => 'required',
            'kota_kabupaten' => 'required',
            'kecamatan'      => 'required',
            'kode_pos'       => 'required',
            'alamat_lengkap' => 'required',
        ]);

        $alamat = Alamat::where('pengguna_id', auth()->id())->findOrFail($id);
        $alamat->update($request->all());

        return back()->with('success', 'Alamat berhasil diperbarui.');
    }

    public function hapusAlamat($id)
    {
        $alamat = Alamat::where('pengguna_id', auth()->id())->findOrFail($id);
        if ($alamat->alamat_utama) {
            $nextAlamat = Alamat::where('pengguna_id', auth()->id())->where('id', '!=', $id)->first();
            if ($nextAlamat) $nextAlamat->update(['alamat_utama' => true]);
        }
        $alamat->delete();
        return back()->with('success', 'Alamat berhasil dihapus.');
    }

    public function setUtamaAlamat($id)
    {
        Alamat::where('pengguna_id', auth()->id())->update(['alamat_utama' => false]);
        Alamat::where('pengguna_id', auth()->id())->findOrFail($id)->update(['alamat_utama' => true]);
        return back()->with('success', 'Alamat utama berhasil diubah.');
    }

    private function hitungHargaLensa($item, $lensaData = null): int
    {
        if ($item->tipe_pembelian !== 'Frame + Lensa') return 0;
        $lensaData ??= Lensa::where('status_lensa', true)->get();
        $total = 0;
        foreach (['od', 'os'] as $mata) {
            $jenis = $item->{'jenis_lensa_'.$mata};
            $nilai = $item->{'nilai_lensa_'.$mata};
            $silinder = $item->{'silinder_'.$mata};
            if ($jenis && $nilai !== null) {
                $lensa = $lensaData->where('jenis_lensa', $jenis)->filter(fn($l) => $nilai >= $l->minus_plus_batas_bawah && $nilai <= $l->minus_plus_batas_atas)->first();
                if ($lensa) $total += $lensa->harga_per_mata;
            }
            if ($silinder > 0) {
                $ls = $lensaData->where('jenis_lensa', 'Silinder')->filter(fn($l) => $silinder >= $l->minus_plus_batas_bawah && $silinder <= $l->minus_plus_batas_atas)->first();
                if ($ls) $total += $ls->harga_per_mata;
            }
        }
        if ($item->anti_radiasi) $total += $lensaData->first()?->harga_anti_radiasi ?? 0;
        if ($item->photochromic) $total += $lensaData->first()?->harga_photochromic ?? 0;
        return (int) $total;
    }

    private function hitungHargaLensaLangsung(array $data, $lensaData): int
    {
        $total = 0;
        foreach (['od', 'os'] as $mata) {
            $jenis = $data['jenis_lensa_'.$mata] ?? null;
            $nilai = $data['nilai_lensa_'.$mata] ?? null;
            $silinder = $data['silinder_'.$mata] ?? null;
            if ($jenis && $nilai !== null) {
                $lensa = $lensaData->where('jenis_lensa', $jenis)->filter(fn($l) => $nilai >= $l->minus_plus_batas_bawah && $nilai <= $l->minus_plus_batas_atas)->first();
                if ($lensa) $total += $lensa->harga_per_mata;
            }
            if ($silinder > 0) {
                $ls = $lensaData->where('jenis_lensa', 'Silinder')->filter(fn($l) => $silinder >= $l->minus_plus_batas_bawah && $silinder <= $l->minus_plus_batas_atas)->first();
                if ($ls) $total += $ls->harga_per_mata;
            }
        }
        if (!empty($data['anti_radiasi'])) $total += $lensaData->first()?->harga_anti_radiasi ?? 0;
        if (!empty($data['photochromic'])) $total += $lensaData->first()?->harga_photochromic ?? 0;
        return (int) $total;
    }
}
