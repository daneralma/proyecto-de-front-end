<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\CuotaController;
use App\Models\User; // <-- Añade esto para evitar errores

// 1. RUTAS PÚBLICAS
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/login-estudiante', [AuthController::class, 'loginEstudiante']); 

Route::get('/saludo', function () {
    return response()->json(['mensaje' => '¡Conexión exitosa con Laravel!']);
});

// RUTA MAESTRA PARA LIMPIAR Y CREAR ADMIN (Solo una versión)
Route::get('/sembrar-datos-colegio', function () {
    try {
        Artisan::call('migrate:fresh', ['--force' => true]);
        
        $admin = User::create([
            'name' => 'Admin Colegio',
            'email' => 'admin@luzdelhimalaya.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin'
        ]);

        return response()->json([
            'mensaje' => 'Base de datos reseteada y Admin creado',
            'usuario' => $admin->email,
            'password' => 'admin123'
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// 2. RUTAS PROTEGIDAS
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/estudiantes', [EstudianteController::class, 'store']);
    Route::get('/perfil-estudiante', [EstudianteController::class, 'perfil']);
    Route::post('/pagos/registrar', [CuotaController::class, 'pagar']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    }); 
});