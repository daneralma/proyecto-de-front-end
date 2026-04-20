<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cuotas', function (Blueprint $table) {
            $table->id();
            
            // Relación con la tabla estudiantes
            $table->foreignId('estudiante_id')->constrained('estudiantes')->onDelete('cascade');
            
            $table->string('mes'); // Enero, Febrero, etc.
            $table->decimal('monto_original', 8, 2); // Precio base de la mensualidad
            $table->decimal('descuento', 8, 2)->default(0); // Monto descontado
            $table->decimal('monto_pagado', 8, 2); // Lo que el estudiante pagó al final
            
            $table->enum('estado', ['Pagado', 'Faltante'])->default('Faltante');
            $table->text('observaciones')->nullable(); 
            
            $table->timestamps(); // create_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuotas');
    }
};