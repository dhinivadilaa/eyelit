<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alamat extends Model
{
    protected $table = 'alamat';

    protected $fillable = [
        'pengguna_id',
        'nama_penerima',
        'no_hp_penerima',
        'provinsi_id',
        'kode_kota',
        'nama_kota',
        'kota_kabupaten',
        'kecamatan',
        'kode_pos',
        'alamat_lengkap',
        'alamat_utama',
    ];

    protected $casts = [
        'alamat_utama' => 'boolean',
    ];

    public function provinsi()
    {
        return $this->belongsTo(Provinsi::class, 'provinsi_id');
    }
}
