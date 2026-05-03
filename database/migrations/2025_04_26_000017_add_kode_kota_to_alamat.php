<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('alamat', function (Blueprint $table) {
            $table->string('kode_kota', 10)->nullable()->after('provinsi_id');
            $table->string('nama_kota', 100)->nullable()->after('kode_kota');
        });
    }

    public function down(): void
    {
        Schema::table('alamat', function (Blueprint $table) {
            $table->dropColumn(['kode_kota', 'nama_kota']);
        });
    }
};
