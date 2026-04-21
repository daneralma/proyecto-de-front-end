<?php

namespace App\Http\Controllers;

use App\Models\Cuota;
use Illuminate\Http\Request;


class CuotaController extends Controller
{
    public function pagar(Request $request)
    {
        try {
            $request->validate([
                'estudiante_id' => 'required',
                'meses' => 'required|array',
                'monto_mensual' => 'required|numeric'
            ]);

            $montoBase = $request->monto_mensual;
            $cantidadMeses = count($request->meses);
            $descuentoPorMes = ($cantidadMeses > 5) ? ($montoBase * 0.10) : 0;

            foreach ($request->meses as $mes) {
                Cuota::create([
                    'estudiante_id' => $request->estudiante_id,
                    'mes' => $mes,
                    'monto_original' => $montoBase,
                    'descuento' => $descuentoPorMes,
                    'monto_pagado' => $montoBase - $descuentoPorMes,
                    'estado' => 'Pagado',
                    'observaciones' => 'Pago registrado desde el sistema'
                ]);
            }
            return response()->json(['mensaje' => '¡Pago guardado con éxito!'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}