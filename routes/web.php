<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\EmailCheckController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\UsernameCheckController;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OngkirController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PesananController;
use Illuminate\Support\Facades\Route;

Route::get('/run-migrations-securely', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        $output1 = \Illuminate\Support\Facades\Artisan::output();
        
        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
        $output2 = \Illuminate\Support\Facades\Artisan::output();
        
        return response()->json([
            'status' => 'success',
            'migrate_output' => $output1,
            'seed_output' => $output2
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
})->withoutMiddleware([
    \App\Http\Middleware\HandleInertiaRequests::class,
    \App\Http\Middleware\HandleAppearance::class,
]);

Route::get('/test-db-connection', function () {
    try {
        \Illuminate\Support\Facades\DB::connection()->getPdo();
        return "Berhasil terhubung ke database!";
    } catch (\Exception $e) {
        return "Gagal terhubung ke database: " . $e->getMessage();
    }
})->withoutMiddleware([
    \App\Http\Middleware\HandleInertiaRequests::class,
    \App\Http\Middleware\HandleAppearance::class,
]);

Route::get('/', [ProdukController::class, 'index'])->name('home');
Route::get('/katalog', [ProdukController::class, 'index'])->name('katalog');

// ✅ DIPERBAIKI: Pindah ke luar middleware auth supaya bisa diakses tanpa login
Route::get('/produk/{produk}', [ProdukController::class, 'show'])->name('produk.show');

Route::get('/username-check', UsernameCheckController::class)->name('username.check');
Route::get('/email-check', EmailCheckController::class)->name('email.check');

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/keranjang', [KeranjangController::class, 'index'])->name('keranjang');
    Route::post('/keranjang/tambah', [KeranjangController::class, 'tambah'])->name('keranjang.tambah');
    Route::patch('/keranjang/{id}', [KeranjangController::class, 'update'])->name('keranjang.update');
    Route::delete('/keranjang/{id}', [KeranjangController::class, 'hapus'])->name('keranjang.hapus');
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
    Route::post('/checkout/langsung', [CheckoutController::class, 'langsung'])->name('checkout.langsung.post');
    Route::get('/checkout/langsung', [CheckoutController::class, 'langsungGet'])->name('checkout.langsung');
    Route::post('/checkout', [CheckoutController::class, 'proses'])->name('checkout.proses');
    Route::post('/checkout/alamat', [CheckoutController::class, 'tambahAlamat'])->name('checkout.alamat');
    Route::patch('/checkout/alamat/{id}', [CheckoutController::class, 'editAlamat'])->name('checkout.alamat.update');
    Route::delete('/checkout/alamat/{id}', [CheckoutController::class, 'hapusAlamat'])->name('checkout.alamat.destroy');
    Route::patch('/checkout/alamat/{id}/utama', [CheckoutController::class, 'setUtamaAlamat'])->name('checkout.alamat.utama');
    Route::post('/checkout/ongkir', [OngkirController::class, 'hitung'])->name('checkout.ongkir');
    Route::get('/pesanan', [PesananController::class, 'index'])->name('pesanan.index');
    Route::get('/pesanan/{id}', [PesananController::class, 'show'])->name('pesanan.show');
    Route::patch('/pesanan/{id}/status', [PesananController::class, 'updateStatus'])->name('pesanan.status');
    Route::get('/pesanan/{id}/status-pembayaran', [PesananController::class, 'statusPembayaranJson'])->name('pesanan.status-pembayaran');
    Route::patch('/pesanan/{id}/cek-pembayaran', [PesananController::class, 'cekPembayaran'])->name('pesanan.cek-pembayaran');
    Route::post('/pesanan/{id}/batalkan', [PesananController::class, 'batalkan'])->name('pesanan.batalkan');
    Route::post('/pesanan/{id}/ulasan', [\App\Http\Controllers\UlasanController::class, 'storeForPesanan'])->name('pesanan.ulasan.store');
    Route::post('/ulasan', [\App\Http\Controllers\UlasanController::class, 'store'])->name('ulasan.store');
    Route::put('/ulasan/{id}', [\App\Http\Controllers\UlasanController::class, 'update'])->name('ulasan.update');
    Route::get('/simulasi-pembayaran/{no_pesanan}', [PesananController::class, 'simulasiPembayaranShow'])->name('simulasi-pembayaran.show');
    Route::post('/simulasi-pembayaran/{no_pesanan}/proses', [PesananController::class, 'simulasiPembayaranProses'])->name('simulasi-pembayaran.proses');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware('admin');
    Route::get('/admin', function () { return redirect()->route('dashboard'); });
    Route::get('/admin/dashboard', function () { return redirect()->route('dashboard'); });
    Route::patch('/admin/pesanan/{id}/status', [DashboardController::class, 'updateStatusPesanan'])->name('admin.pesanan.status')->middleware('admin');
    Route::get('/admin/laporan/download', [DashboardController::class, 'downloadLaporan'])->name('admin.laporan.download')->middleware('admin');
    Route::patch('/admin/pengguna/{id}/peran', [DashboardController::class, 'updatePeranPengguna'])->name('admin.pengguna.update-peran')->middleware('admin');
    Route::delete('/admin/pengguna/{id}', [DashboardController::class, 'hapusPengguna'])->name('admin.pengguna.hapus')->middleware('admin');
    Route::post('/admin/produk', [DashboardController::class, 'tambahProduk'])->name('admin.produk.store')->middleware('admin');
    Route::post('/admin/produk/{id}', [DashboardController::class, 'editProduk'])->name('admin.produk.update')->middleware('admin');
    Route::delete('/admin/produk/{id}', [DashboardController::class, 'hapusProduk'])->name('admin.produk.delete')->middleware('admin');

    // Chat Routes
    Route::get('/chat', [\App\Http\Controllers\ChatController::class, 'index'])->name('chat.index');
    Route::post('/chat/kirim', [\App\Http\Controllers\ChatController::class, 'kirimPesan'])->name('chat.kirim');
    Route::post('/chat/baca', [\App\Http\Controllers\ChatController::class, 'bacaSemua'])->name('chat.baca');
    Route::get('/notifications', [\App\Http\Controllers\ChatController::class, 'halamanNotifikasi'])->name('notifications.index');
});
Route::prefix('api')->group(function () {
    Route::get('/provinsi', [OngkirController::class, 'getProvinsi']);
    Route::get('/kota/{provinsiId}', [OngkirController::class, 'getKota']);
    Route::get('/kota', [OngkirController::class, 'getKota']);
});
require __DIR__.'/settings.php';
