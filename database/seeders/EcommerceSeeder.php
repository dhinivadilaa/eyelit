<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class EcommerceSeeder extends Seeder
{
    public function run(): void
    {
        // Categories
        $categories = [
            ['name' => 'Sunglasses', 'slug' => 'sunglasses', 'description' => 'Protective eyewear'],
            ['name' => 'Eyeglasses', 'slug' => 'eyeglasses', 'description' => 'Corrective eyewear'],
            ['name' => 'Sports', 'slug' => 'sports', 'description' => 'Sports eyewear'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Products
        $products = [
            [
                'name' => 'Classic Aviator',
                'brand' => 'Ray-Ban',
                'description' => 'Timeless aviator sunglasses',
                'price' => 250000,
                'stock' => 10,
                'category_id' => 1,
                'gender' => 'Unisex',
                'color' => 'Gold',
                'material' => 'Metal',
                'shape' => 'Aviator',
                'specifications' => ['bridge' => '14mm', 'size' => '58mm']
            ],
            [
                'name' => 'Round Glasses',
                'brand' => 'Warby Parker',
                'description' => 'Modern round eyeglasses',
                'price' => 180000,
                'stock' => 5,
                'category_id' => 2,
                'gender' => 'Unisex',
                'color' => 'Black',
                'material' => 'Acetate',
                'shape' => 'Round',
                'specifications' => ['bridge' => '18mm', 'size' => '50mm']
            ],
            // Add more products as needed
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}