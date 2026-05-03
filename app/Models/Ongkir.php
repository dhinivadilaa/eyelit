<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ongkir extends Model
{
    protected $table = 'ongkir';
    protected $fillable = ['provinsi_id', 'ekspedisi_id', 'harga', 'estimasi_hari_min', 'estimasi_hari_max'];
}
