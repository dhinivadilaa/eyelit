<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EkspedisiSeeder extends Seeder
{
    public function run(): void
    {
        $ekspedisi = [
            ['nama_ekspedisi' => 'JNE (Jalur Nugraha Ekakurir)', 'logo_ekspedisi' => null, 'status_ekspedisi' => true],
            ['nama_ekspedisi' => 'J&T Express', 'logo_ekspedisi' => null, 'status_ekspedisi' => true],
            ['nama_ekspedisi' => 'SiCepat Express', 'logo_ekspedisi' => null, 'status_ekspedisi' => true],
        ];

        DB::table('ekspedisi')->insert($ekspedisi);
    }
}
