<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provinsi extends Model
{
    protected $table = 'provinsi';

    protected $fillable = ['nama_provinsi', 'pulau'];

    public function ongkir()
    {
        return $this->hasMany(Ongkir::class, 'provinsi_id');
    }
}
