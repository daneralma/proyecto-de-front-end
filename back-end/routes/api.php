<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\CuotaController; // Usaremos este para los pagos


Route::post('/login', [AuthController::class, 'login']); 
Route::post('/login-estudiante', [AuthController::class, 'loginEstudiante']); 

Route::get('/saludo', function () {
    return response()->json(['mensaje' => '¡Conexión exitosa con Laravel!']);
});


Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/estudiantes', [EstudianteController::class, 'store']);
    Route::get('/perfil-estudiante', [EstudianteController::class, 'perfil']);

    Route::post('/pagos/registrar', [CuotaController::class, 'pagar']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    }); 
});