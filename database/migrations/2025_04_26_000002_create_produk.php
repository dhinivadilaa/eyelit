<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produk', function (Blueprint $table) {
            $table->id();
            $table->string('nama_produk');
            $table->enum('merek', ['Hugo', 'Giordano']);
            $table->string('tipe_produk');
            $table->decimal('harga_produk', 12, 0);
            $table->integer('stok');
            $table->enum('jenis_kelamin', ['Pria', 'Wanita', 'Unisex']);
            $table->enum('warna', ['Hitam', 'Putih', 'Transparan', 'Rose Gold']);
            $table->enum('material', ['Metal', 'Plastic', 'Titanium']);
            $table->enum('bentuk', ['Aviator', 'Browline', 'Oval', 'Square']);
            $table->string('bridge', 50)->nullable();
            $table->string('diagonal', 50)->nullable();
            $table->string('ukuran', 50)->nullable();
            $table->enum('status_produk', ['Aktif', 'Nonaktif'])->default('Aktif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produk');
    }
};
