<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\CuotaController;

/*
|--------------------------------------------------------------------------
| API Routes - Colegio Luz del Himalaya
|--------------------------------------------------------------------------
*/

// --- 1. RUTAS PÚBLICAS (No requieren Token) ---
// El login DEBE estar aquí afuera para que el usuario pueda entrar
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/login-estudiante', [AuthController::class, 'loginEstudiante']); 

Route::get('/saludo', function () {
    return response()->json(['mensaje' => '¡Conexión exitosa con Laravel!']);
});


// --- 2. RUTAS PROTEGIDAS (Requieren Token Sanctum desde React) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Gestión de Estudiantes
    Route::post('/estudiantes', [EstudianteController::class, 'store']);
    Route::get('/perfil-estudiante', [EstudianteController::class, 'perfil']);

    // Gestión de Pagos/Cuotas
    Route::post('/pagos/registrar', [CuotaController::class, 'pagar']);

    // Cerrar Sesión
    Route::post('/logout', [AuthController::class, 'logout']);

    // Ver usuario actual
    Route::get('/user', function (Request $request) {
        return $request->user();
    }); 
});