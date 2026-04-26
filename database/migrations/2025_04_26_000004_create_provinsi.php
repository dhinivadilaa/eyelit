<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provinsi', function (Blueprint $table) {
            $table->id();
            $table->string('nama_provinsi', 100);
            $table->enum('pulau', [
                'Pulau Jawa',
                'Pulau Sumatera',
                'Pulau Kalimantan',
                'Pulau Bali & Nusa Tenggara',
                'Pulau Sulawesi',
                'Maluku & Papua'
            ]);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provinsi');
    }
};
