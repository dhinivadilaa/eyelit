<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OngkirSeeder extends Seeder
{
    public function run(): void
    {
        $ongkir = [
            ['provinsi_id' => 1, 'harga' => 5000, 'estimasi_hari_min' => '1', 'estimasi_hari_max' => '1'],
            ['provinsi_id' => 2, 'harga' => 8000, 'estimasi_hari_min' => '1', 'estimasi_hari_max' => '2'],
            ['provinsi_id' => 3, 'harga' => 8000, 'estimasi_hari_min' => '1', 'estimasi_hari_max' => '2'],
            ['provinsi_id' => 4, 'harga' => 10000, 'estimasi_hari_min' => '2', 'estimasi_hari_max' => '3'],
            ['provinsi_id' => 5, 'harga' => 10000, 'estimasi_hari_min' => '2', 'estimasi_hari_max' => '3'],
            ['provinsi_id' => 6, 'harga' => 12000, 'estimasi_hari_min' => '2', 'estimasi_hari_max' => '3'],
            ['provinsi_id' => 7, 'harga' => 10000, 'estimasi_hari_min' => '2', 'estimasi_hari_max' => '3'],
            ['provinsi_id' => 8, 'harga' => 15000, 'estimasi_hari_min' => '3', 'estimasi_hari_max' => '4'],
            ['provinsi_id' => 9, 'harga' => 15000, 'estimasi_hari_min' => '3', 'estimasi_hari_max' => '4'],
            ['provinsi_id' => 10, 'harga' => 18000, 'estimasi_hari_min' => '3', 'estimasi_hari_max' => '4'],
            ['provinsi_id' => 11, 'harga' => 20000, 'estimasi_hari_min' => '3', 'estimasi_hari_max' => '4'],
            ['provinsi_id' => 12, 'harga' => 22000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 13, 'harga' => 30000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 14, 'harga' => 30000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 15, 'harga' => 25000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 16, 'harga' => 30000, 'estimasi_hari_min' => '5', 'estimasi_hari_max' => '6'],
            ['provinsi_id' => 17, 'harga' => 25000, 'estimasi_hari_min' => '3', 'estimasi_hari_max' => '4'],
            ['provinsi_id' => 18, 'harga' => 28000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 19, 'harga' => 28000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 20, 'harga' => 30000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 21, 'harga' => 32000, 'estimasi_hari_min' => '5', 'estimasi_hari_max' => '6'],
            ['provinsi_id' => 22, 'harga' => 15000, 'estimasi_hari_min' => '2', 'estimasi_hari_max' => '3'],
            ['provinsi_id' => 23, 'harga' => 20000, 'estimasi_hari_min' => '3', 'estimasi_hari_max' => '4'],
            ['provinsi_id' => 24, 'harga' => 25000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 25, 'harga' => 25000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 26, 'harga' => 28000, 'estimasi_hari_min' => '4', 'estimasi_hari_max' => '5'],
            ['provinsi_id' => 27, 'harga' => 28000, 'estimasi_hari_min' => '5', 'estimasi_hari_max' => '6'],
            ['provinsi_id' => 28, 'harga' => 30000, 'estimasi_hari_min' => '5', 'estimasi_hari_max' => '6'],
            ['provinsi_id' => 29, 'harga' => 30000, 'estimasi_hari_min' => '5', 'estimasi_hari_max' => '6'],
            ['provinsi_id' => 30, 'harga' => 30000, 'estimasi_hari_min' => '5', 'estimasi_hari_max' => '6'],
            ['provinsi_id' => 31, 'harga' => 35000, 'estimasi_hari_min' => '5', 'estimasi_hari_max' => '7'],
            ['provinsi_id' => 32, 'harga' => 35000, 'estimasi_hari_min' => '5', 'estimasi_hari_max' => '7'],
            ['provinsi_id' => 33, 'harga' => 40000, 'estimasi_hari_min' => '6', 'estimasi_hari_max' => '8'],
            ['provinsi_id' => 34, 'harga' => 40000, 'estimasi_hari_min' => '6', 'estimasi_hari_max' => '8'],
            ['provinsi_id' => 35, 'harga' => 45000, 'estimasi_hari_min' => '7', 'estimasi_hari_max' => '9'],
            ['provinsi_id' => 36, 'harga' => 45000, 'estimasi_hari_min' => '7', 'estimasi_hari_max' => '9'],
            ['provinsi_id' => 37, 'harga' => 45000, 'estimasi_hari_min' => '7', 'estimasi_hari_max' => '9'],
            ['provinsi_id' => 38, 'harga' => 45000, 'estimasi_hari_min' => '7', 'estimasi_hari_max' => '9'],
        ];

        DB::table('ongkir')->insert($ongkir);
    }
}
