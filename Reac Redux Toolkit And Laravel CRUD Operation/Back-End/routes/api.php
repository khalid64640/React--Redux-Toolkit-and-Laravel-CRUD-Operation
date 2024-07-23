<?php

use App\Http\Controllers\StudentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('users', [StudentsController::class, 'fetch']);

Route::post('/store', [StudentsController::class,'storeFormData']);

Route::delete('/delete/{id}',[StudentsController::class, 'deleteUser']);


// In routes/api.php
Route::get('getData/{id}', [StudentsController::class, 'getData']);
Route::put('update/{id}', [StudentsController::class, 'updateUser']);



