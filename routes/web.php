<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'Home')->name('home');
Route::inertia('/catalog', 'Catalog')->name('catalog');
Route::inertia('/product/{id}', 'ProductDetail')->name('product.detail');
Route::inertia('/cart', 'Cart')->name('cart');
Route::inertia('/checkout', 'Checkout')->name('checkout');
Route::inertia('/payment/{order}', 'Payment')->name('payment');
Route::inertia('/order/{order}', 'OrderDetail')->name('order.detail');
Route::inertia('/profile', 'Profile')->name('profile');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/admin/dashboard', 'Admin/Dashboard')->name('admin.dashboard');
    Route::inertia('/admin/products', 'Admin/Products')->name('admin.products');
    Route::inertia('/admin/orders', 'Admin/Orders')->name('admin.orders');
    Route::inertia('/admin/users', 'Admin/Users')->name('admin.users');
});

require __DIR__.'/settings.php';
