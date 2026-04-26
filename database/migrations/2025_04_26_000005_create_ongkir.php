<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ongkir', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provinsi_id')->constrained('provinsi')->cascadeOnDelete();
            $table->decimal('harga', 12, 0);
            $table->string('estimasi_hari_min', 10);
            $table->string('estimasi_hari_max', 10);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ongkir');
    }
};
