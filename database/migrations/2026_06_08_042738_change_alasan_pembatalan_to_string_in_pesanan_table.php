<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pesanan', function (Blueprint $table) {
            $table->string('alasan_pembatalan', 255)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pesanan', function (Blueprint $table) {
            $table->enum('alasan_pembatalan', [
                'Salah mengisi detail produk',
                'Salah mengisi alamat',
                'Ingin mengganti produk',
                'Berubah pikiran'
            ])->nullable()->change();
        });
    }
};
