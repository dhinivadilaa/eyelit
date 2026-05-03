<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('keranjang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengguna_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('produk_id')->constrained('produk')->cascadeOnDelete();
            $table->integer('jumlah')->default(1);
            $table->enum('tipe_pembelian', ['Frame Saja', 'Frame + Lensa'])->default('Frame Saja');
            // Lensa - Mata Kanan (OD)
            $table->enum('jenis_lensa_od', ['Minus', 'Plus'])->nullable();
            $table->decimal('nilai_lensa_od', 4, 2)->nullable();
            $table->decimal('silinder_od', 4, 2)->nullable();
            // Lensa - Mata Kiri (OS)
            $table->enum('jenis_lensa_os', ['Minus', 'Plus'])->nullable();
            $table->decimal('nilai_lensa_os', 4, 2)->nullable();
            $table->decimal('silinder_os', 4, 2)->nullable();
            // Pilihan Tambahan
            $table->boolean('anti_radiasi')->default(false);
            $table->boolean('photochromic')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('keranjang');
    }
};
