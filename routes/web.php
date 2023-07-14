<?php

use App\Http\Controllers\GoogleController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/register', [RegisterController::class, 'show']);
Route::post('/register', [RegisterController::class, 'register']);

Route::get('/login', [LoginController::class, 'show']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);

Route::get('/redirect', [GoogleController::class, 'redirect']);
Route::get('/callback', [GoogleController::class, 'callback']);

Route::middleware('auth')->group(function () {

    Route::get('/user', function () {
        return auth()->user();
    });

    Route::get('/', [MessagesController::class, 'index']);
    Route::post('/messages', [MessagesController::class, 'store']);
    Route::patch('/messages', [MessagesController::class, 'update']);
});


Route::get('/a', function () {
    return Inertia::render('Counter', [
        'count' => -69
    ]);
});

Route::get('/b', function () {
    return Inertia::render('User', [
        'user' => auth()->user()
    ]);
});
