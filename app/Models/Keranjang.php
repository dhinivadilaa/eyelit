<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    protected $table = 'keranjang';

    protected $fillable = [
        'pengguna_id',
        'produk_id',
        'jumlah',
        'tipe_pembelian',
        'jenis_lensa_od',
        'nilai_lensa_od',
        'silinder_od',
        'jenis_lensa_os',
        'nilai_lensa_os',
        'silinder_os',
        'anti_radiasi',
        'photochromic',
    ];

    protected $casts = [
        'anti_radiasi' => 'boolean',
        'photochromic' => 'boolean',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }
}
