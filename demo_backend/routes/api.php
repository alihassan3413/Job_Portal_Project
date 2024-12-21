<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\SellerMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes for logout and me, with role-based middleware
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // buyer related to products
    Route::get('/products', [ProductController::class, 'index']);  
    Route::get('/products/{product}', [ProductController::class, 'show']);
});


Route::middleware(['auth:sanctum', SellerMiddleware::class])->prefix('/seller')->group(function () {
    Route::post('/products', [ProductController::class, 'store']);  // Seller can create their own products
    Route::put('/products/{product}', [ProductController::class, 'update']);  // Seller can update their own products
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    Route::get('/products', [ProductController::class, 'index']);  // Seller can delete their own products
});

// Routes for Admin
Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);  // Create product
    Route::put('/products/{product}', [ProductController::class, 'update']);  // Update product
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);  // Delete product
    Route::get('/products/{product}', [ProductController::class, 'show']);  // Show single product
    Route::get('/products', [ProductController::class, 'index']);  // List all products
});


// Routes for Seller
