<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Estudiante;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear Administrador (en la tabla users)
        // DatabaseSeeder.php
        User::create([
            'name' => 'Admin Colegio',
            'email' => 'admin@luzdelhimalaya.com',
            // Debe estar así:
            'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
            'role' => 'admin', // <--- Asegúrate que diga 'role' con E
        ]);

        // 2. Crear Estudiante de prueba (en la tabla estudiantes)
        // Asegúrate de que tu modelo se llame 'Estudiante'

        Estudiante::create([
            'nombre_completo' => 'Juan Perez',
            'rude' => '12345678', // Usa el RUDE real para probar
            'password' => Hash::make('rude123'),
            'curso' => '6to de Secundaria'
        ]);
        
     
    }
}