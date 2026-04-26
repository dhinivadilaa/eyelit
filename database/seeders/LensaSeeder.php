<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LensaSeeder extends Seeder
{
    public function run(): void
    {
        $minus = [
            ['jenis_lensa' => 'Minus', 'minus_plus_batas_bawah' => 0.00, 'minus_plus_batas_atas' => 0.00, 'harga_per_mata' => 0, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Minus', 'minus_plus_batas_bawah' => 0.25, 'minus_plus_batas_atas' => 2.00, 'harga_per_mata' => 100000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Minus', 'minus_plus_batas_bawah' => 2.25, 'minus_plus_batas_atas' => 4.00, 'harga_per_mata' => 200000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Minus', 'minus_plus_batas_bawah' => 4.25, 'minus_plus_batas_atas' => 6.00, 'harga_per_mata' => 300000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Minus', 'minus_plus_batas_bawah' => 6.25, 'minus_plus_batas_atas' => 10.00, 'harga_per_mata' => 400000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
        ];

        $plus = [
            ['jenis_lensa' => 'Plus', 'minus_plus_batas_bawah' => 0.00, 'minus_plus_batas_atas' => 0.00, 'harga_per_mata' => 0, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Plus', 'minus_plus_batas_bawah' => 0.25, 'minus_plus_batas_atas' => 2.00, 'harga_per_mata' => 100000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Plus', 'minus_plus_batas_bawah' => 2.25, 'minus_plus_batas_atas' => 4.00, 'harga_per_mata' => 200000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Plus', 'minus_plus_batas_bawah' => 4.25, 'minus_plus_batas_atas' => 6.00, 'harga_per_mata' => 300000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Plus', 'minus_plus_batas_bawah' => 6.25, 'minus_plus_batas_atas' => 10.00, 'harga_per_mata' => 400000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
        ];

        $silinder = [
            ['jenis_lensa' => 'Silinder', 'minus_plus_batas_bawah' => 0.00, 'minus_plus_batas_atas' => 0.00, 'harga_per_mata' => 0, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Silinder', 'minus_plus_batas_bawah' => 0.25, 'minus_plus_batas_atas' => 1.00, 'harga_per_mata' => 100000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Silinder', 'minus_plus_batas_bawah' => 1.25, 'minus_plus_batas_atas' => 2.00, 'harga_per_mata' => 200000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Silinder', 'minus_plus_batas_bawah' => 2.25, 'minus_plus_batas_atas' => 3.00, 'harga_per_mata' => 300000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
            ['jenis_lensa' => 'Silinder', 'minus_plus_batas_bawah' => 3.25, 'minus_plus_batas_atas' => 4.00, 'harga_per_mata' => 400000, 'harga_anti_radiasi' => 150000, 'harga_photochromic' => 200000, 'status_lensa' => true],
        ];

        DB::table('lensa')->insert(array_merge($minus, $plus, $silinder));
    }
}
