<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    protected $table = 'pesanan';

    protected $fillable = [
        'no_pesanan',
        'pengguna_id',
        'alamat_id',
        'ekspedisi_id',
        'no_resi',
        'status_pesanan',
        'metode_pembayaran',
        'ongkos_kirim',
        'total_harga',
        'batas_waktu_pembayaran',
        'tanggal_pemesanan',
        'tanggal_konfirmasi_pembayaran',
        'tanggal_pengiriman',
        'tanggal_tiba',
        'tanggal_selesai',
        'tanggal_pembatalan',
        'tanggal_konfirmasi_penerimaan',
        'alasan_pembatalan',
        'xendit_payment_id',
        'xendit_payment_url',
        'xendit_payment_info',
    ];

    protected $casts = [
        'xendit_payment_info' => 'array',
        'tanggal_pemesanan' => 'datetime',
        'batas_waktu_pembayaran' => 'datetime',
        'tanggal_konfirmasi_pembayaran' => 'datetime',
        'tanggal_pengiriman' => 'datetime',
        'tanggal_tiba' => 'datetime',
        'tanggal_selesai' => 'datetime',
        'tanggal_pembatalan' => 'datetime',
        'tanggal_konfirmasi_penerimaan' => 'datetime',
    ];

    public function detailPesanan()
    {
        return $this->hasMany(DetailPesanan::class, 'pesanan_id');
    }

    public function alamat()
    {
        return $this->belongsTo(Alamat::class, 'alamat_id');
    }

    public function ekspedisi()
    {
        return $this->belongsTo(Ekspedisi::class, 'ekspedisi_id');
    }
}
