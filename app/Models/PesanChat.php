<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PesanChat extends Model
{
    use HasFactory;

    protected $table = 'pesan_chat';

    protected $fillable = [
        'pengirim_id',
        'penerima_id',
        'pesan',
        'dibaca',
        'produk_id',
    ];

    protected $casts = [
        'dibaca' => 'boolean',
    ];

    public function pengirim()
    {
        return $this->belongsTo(User::class, 'pengirim_id');
    }

    public function penerima()
    {
        return $this->belongsTo(User::class, 'penerima_id');
    }

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }
}
