<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan; // <-- IMPORTANTE: Añade esta línea
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\CuotaController;

// 1. RUTAS PÚBLICAS (Sin protección)
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/login-estudiante', [AuthController::class, 'loginEstudiante']); 

Route::get('/saludo', function () {
    return response()->json(['mensaje' => '¡Conexión exitosa con Laravel!']);
});

// ESTA RUTA DEBE SER PÚBLICA PARA QUE PUEDAS LIMPIAR LA BD
Route::get('/sembrar-datos-colegio', function () {
    try {
        Artisan::call('migrate:fresh', ['--force' => true]);
        Artisan::call('db:seed', ['--force' => true]);
        return response()->json(['mensaje' => '¡Base de datos sembrada con éxito!']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});


// 2. RUTAS PROTEGIDAS (Requieren Token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/estudiantes', [EstudianteController::class, 'store']);
    Route::get('/perfil-estudiante', [EstudianteController::class, 'perfil']);
    Route::post('/pagos/registrar', [CuotaController::class, 'pagar']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    }); 
});