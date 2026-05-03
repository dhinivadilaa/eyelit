<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lensa extends Model
{
    protected $table = 'lensa';

    protected $fillable = [
        'nama_lensa',
        'jenis_lensa',
        'minus_plus_batas_bawah',
        'minus_plus_batas_atas',
        'harga_per_mata',
        'harga_anti_radiasi',
        'harga_photochromic',
        'status_lensa',
    ];

    protected $casts = [
        'harga_per_mata' => 'integer',
        'harga_anti_radiasi' => 'integer',
        'harga_photochromic' => 'integer',
        'minus_plus_batas_bawah' => 'decimal:2',
        'minus_plus_batas_atas' => 'decimal:2',
        'status_lensa' => 'boolean',
    ];
}

