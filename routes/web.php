<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BuyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InventoryController;

Route::get('/', function () {
    return redirect()->route('product-management.index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('product-management', ProductController::class);
    Route::resource('stock-movement', StockController::class);
    Route::resource('inventory-alerts', InventoryController::class);
    Route::resource('reports', ReportController::class);    
    Route::resource('user-management', UserController::class);

    Route::post('/buy/{product}', [BuyController::class, 'store'])->name('buy.store');

});

require __DIR__.'/settings.php';
