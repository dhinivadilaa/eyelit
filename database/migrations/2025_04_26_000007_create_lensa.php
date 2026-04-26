<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lensa', function (Blueprint $table) {
            $table->id();
            $table->enum('jenis_lensa', ['Minus', 'Plus', 'Silinder']);
            $table->decimal('minus_plus_batas_bawah', 4, 2)->default(0.00);
            $table->decimal('minus_plus_batas_atas', 4, 2)->default(10.00);
            $table->decimal('harga_per_mata', 12, 0)->default(0);
            $table->decimal('harga_anti_radiasi', 12, 0)->default(0);
            $table->decimal('harga_photochromic', 12, 0)->default(0);
            $table->boolean('status_lensa')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lensa');
    }
};
