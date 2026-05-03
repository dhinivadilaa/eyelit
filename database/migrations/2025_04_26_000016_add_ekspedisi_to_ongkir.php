<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ongkir', function (Blueprint $table) {
            $table->foreignId('ekspedisi_id')->nullable()->after('provinsi_id')->constrained('ekspedisi')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('ongkir', function (Blueprint $table) {
            $table->dropForeign(['ekspedisi_id']);
            $table->dropColumn('ekspedisi_id');
        });
    }
};
