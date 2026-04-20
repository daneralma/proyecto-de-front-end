<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Estudiante;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $request->validate(['email' => 'required|email', 'password' => 'required']);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }
        return response()->json(['access_token' => $user->createToken('token')->plainTextToken, 'role' => 'admin']);
    }

    public function loginEstudiante(Request $request) {
        $request->validate(['rude' => 'required', 'password' => 'required']);
        $estudiante = Estudiante::where('rude', $request->rude)->first();
        if (!$estudiante || !Hash::check($request->password, $estudiante->password)) {
            return response()->json(['error' => 'RUDE o contraseña incorrectos'], 401);
        }
        return response()->json(['access_token' => $estudiante->createToken('token')->plainTextToken, 'role' => 'estudiante']);
    }
}