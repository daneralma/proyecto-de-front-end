<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Estudiante extends Authenticatable
{
    use HasApiTokens, Notifiable;

    // Definimos una sola vez los campos que se pueden llenar
    protected $fillable = [
        'nombre_completo',
        'rude',
        'password',
        'curso',
    ];

    // Ocultamos la contraseña para que no viaje hacia React por seguridad
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Esto asegura que Laravel maneje la encriptación correctamente
    protected $casts = [
        'password' => 'hashed',
    ];
}