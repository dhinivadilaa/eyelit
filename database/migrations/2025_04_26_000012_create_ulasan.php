<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ulasan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pesanan_id')->constrained('pesanan')->cascadeOnDelete();
            $table->foreignId('pengguna_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('produk_id')->constrained('produk')->cascadeOnDelete();
            $table->foreignId('detail_pesanan_id')->constrained('detail_pesanan')->cascadeOnDelete();
            $table->tinyInteger('rating')->unsigned();
            $table->text('komentar')->nullable();
            $table->string('foto_ulasan')->nullable();
            $table->timestamp('tanggal_ulasan')->nullable();
            $table->timestamps();

            $table->unique(['pesanan_id', 'produk_id', 'detail_pesanan_id'], 'unique_ulasan_per_produk');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ulasan');
    }
};
