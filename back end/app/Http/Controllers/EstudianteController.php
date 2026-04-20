<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estudiante;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class EstudianteController extends Controller
{
    // MÉTODO 1: El Admin registra estudiantes
    public function store(Request $request)
    {
        try {
            // 1. Validamos que lleguen todos los datos del formulario
            $request->validate([
                'nombre_completo' => 'required|string',
                'rude'            => 'required|unique:estudiantes,rude',
                'password'        => 'required|min:6',
                'curso'           => 'required'
            ]);

            // 2. Creamos el registro en la tabla 'estudiantes'
            $estudiante = \App\Models\Estudiante::create([
                'nombre_completo' => $request->nombre_completo,
                'rude'            => $request->rude,
                'password'        => \Illuminate\Support\Facades\Hash::make($request->password), // Encriptamos
                'curso'           => $request->curso,
            ]);

            return response()->json([
                'mensaje' => 'Estudiante guardado en phpMyAdmin correctamente',
                'estudiante' => $estudiante
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // MÉTODO 2: El Estudiante inicia sesión
    public function login(Request $request)
    {
        try {
            $request->validate([
                'rude' => 'required',
                'password' => 'required',
            ]);

            // Buscamos al estudiante por su RUDE
            $estudiante = Estudiante::where('rude', $request->rude)->first();

            // Verificamos si existe y si la contraseña es correcta
            if (!$estudiante || !Hash::check($request->password, $estudiante->password)) {
                return response()->json([
                    'error' => 'RUDE o contraseña incorrectos.'
                ], 401);
            }

            // Creamos el token de Sanctum
            $token = $estudiante->createToken('token-estudiante')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'usuario' => $estudiante,
                'mensaje' => '¡Bienvenido al sistema!'
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}