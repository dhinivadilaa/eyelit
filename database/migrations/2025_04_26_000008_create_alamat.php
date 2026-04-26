<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alamat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengguna_id')->constrained('users')->cascadeOnDelete();
            $table->string('nama_penerima', 100);
            $table->string('no_hp_penerima', 20);
            $table->foreignId('provinsi_id')->constrained('provinsi')->cascadeOnDelete();
            $table->string('kota_kabupaten', 100);
            $table->string('kecamatan', 100);
            $table->string('kode_pos', 10);
            $table->text('alamat_lengkap');
            $table->boolean('alamat_utama')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alamat');
    }
};
