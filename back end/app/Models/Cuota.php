<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuota extends Model
{
    use HasFactory;

    protected $table = 'cuotas';

    // Solo debe aparecer una vez
    protected $fillable = [
        'estudiante_id',
        'mes',
        'monto_original',
        'descuento',
        'monto_pagado',
        'estado',
        'observaciones'
    ];

    /**
     * Relación: Una cuota pertenece a un estudiante.
     * Asegúrate de que el modelo Estudiante exista en App\Models.
     */
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_id');
    }
}