<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Estudiante;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // 1. LOGIN PARA ADMINISTRADOR
    public function login(Request $request) {
        $request->validate(['email' => 'required|email', 'password' => 'required']);
        
        $user = User::where('email', $request->email)->first();

        // Si el intento de login FALLA (por eso el !)
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        // Si los datos son correctos, genera el token
        return response()->json([
            'access_token' => $user->createToken('token')->plainTextToken, 
            'role' => $user->role // Verifica si en tu migración es 'role' o 'rol'
        ]);
    }

   // LOGIN PARA ESTUDIANTES
    public function loginEstudiante(Request $request) {
        $request->validate(['rude' => 'required', 'password' => 'required']);
        
        $estudiante = Estudiante::where('rude', $request->rude)->first();
        
        if (!$estudiante || !Hash::check($request->password, $estudiante->password)) {
            return response()->json(['error' => 'RUDE o contraseña incorrectos'], 401);
        }
        
        return response()->json([
            'access_token' => $estudiante->createToken('token')->plainTextToken, 
            'role' => 'estudiante'
        ]);
    }

    // 3. LOGOUT (Cerrar sesión)
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['mensaje' => 'Sesión cerrada']);
    }
}