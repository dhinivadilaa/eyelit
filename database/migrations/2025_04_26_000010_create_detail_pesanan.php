<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detail_pesanan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pesanan_id')->constrained('pesanan')->cascadeOnDelete();
            $table->foreignId('produk_id')->constrained('produk')->cascadeOnDelete();
            $table->integer('jumlah');
            $table->decimal('harga_frame', 12, 0);
            $table->enum('tipe_pembelian', ['Frame Saja', 'Frame + Lensa']);
            // Lensa - Mata Kanan
            $table->enum('jenis_lensa_od', ['Minus', 'Plus'])->nullable();
            $table->decimal('nilai_lensa_od', 4, 2)->nullable();
            $table->decimal('silinder_od', 4, 2)->nullable();
            // Lensa - Mata Kiri
            $table->enum('jenis_lensa_os', ['Minus', 'Plus'])->nullable();
            $table->decimal('nilai_lensa_os', 4, 2)->nullable();
            $table->decimal('silinder_os', 4, 2)->nullable();
            // Pilihan Tambahan
            $table->boolean('anti_radiasi')->default(false);
            $table->boolean('photochromic')->default(false);
            // Subtotal
            $table->decimal('subtotal_lensa', 12, 0)->default(0);
            $table->decimal('subtotal', 12, 0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('detail_pesanan');
    }
};
