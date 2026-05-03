<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ekspedisi extends Model
{
    protected $table = 'ekspedisi';
    protected $fillable = ['nama_ekspedisi', 'logo_ekspedisi', 'status_ekspedisi'];
}
