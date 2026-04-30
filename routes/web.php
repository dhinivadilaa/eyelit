<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\EmailCheckController;
use App\Http\Controllers\UsernameCheckController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/username-check', UsernameCheckController::class)->name('username.check');
Route::get('/email-check', EmailCheckController::class)->name('email.check');

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard')->middleware('admin');
});

require __DIR__.'/settings.php';
