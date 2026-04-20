<?php

namespace Database\Seeders;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EstudianteController;

// ... (el resto de tus rutas abajo)

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Administrador
        User::create([
            'name' => 'Admin Colegio',
            'email' => 'admin@luzdelhimalaya.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Estudiante
        Estudiante::create([
            'nombre_completo' => 'Juan Perez',
            'rude' => 'juan@estudiante.com',
            'password' => Hash::make('rude123'),
            'curso' => '6to de Secundaria'
        ]);
    }
}