<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailPesanan extends Model
{
    protected $table = 'detail_pesanan';

    protected $fillable = [
        'pesanan_id',
        'produk_id',
        'jumlah',
        'harga_frame',
        'tipe_pembelian',
        'jenis_lensa_od',
        'nilai_lensa_od',
        'silinder_od',
        'jenis_lensa_os',
        'nilai_lensa_os',
        'silinder_os',
        'anti_radiasi',
        'photochromic',
        'subtotal_lensa',
        'subtotal',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }
}
