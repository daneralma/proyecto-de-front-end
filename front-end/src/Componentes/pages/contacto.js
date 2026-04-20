import React, { useState } from 'react';

const Cuotas = () => {
  const mesesDelAño = [
    "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"
  ];

  const [estudianteId, setEstudianteId] = useState('');
  const [mesesSeleccionados, setMesesSeleccionados] = useState([]);
  const montoPorMes = 200; // Precio de pensión

  const manejarCheck = (mes) => {
    if (mesesSeleccionados.includes(mes)) {
      setMesesSeleccionados(mesesSeleccionados.filter(m => m !== mes));
    } else {
      setMesesSeleccionados([...mesesSeleccionados, mes]);
    }
  };

  const enviarPago = async () => {
    // Validación básica antes de enviar
    if (!estudianteId || mesesSeleccionados.length === 0) {
      alert("Por favor, ingresa el ID y selecciona al menos un mes.");
      return;
    }

    const datos = {
      estudiante_id: estudianteId,
      meses: mesesSeleccionados,
      monto_mensual: montoPorMes
    };

    try {
      const respuesta = await fetch('http://127.0.0.1:8000/api/pagos/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token') || localStorage.getItem('token')}`
        },
        body: JSON.stringify(datos)
      });

      // --- EL BLOQUE CORREGIDO ESTÁ AQUÍ ADENTRO ---
      if (respuesta.ok) {
        alert("¡Pago guardado con éxito!");
        setMesesSeleccionados([]); // Limpia los checkboxes
        setEstudianteId('');      // Limpia el campo de ID
      } else {
        const errorServidor = await respuesta.json();
        alert("Error: " + (errorServidor.error || "No se pudo registrar el pago"));
      }
      // --------------------------------------------

    } catch (error) {
      alert("Error al conectar con Laravel. Verifica que php artisan serve esté activo.");
    }
  };

  return (
    <div className="container mt-4 pb-5">
      <div className="card shadow p-4 border-0">
        <h3 className="text-center mb-4">Sistema de Pagos - Luz del Himalaya</h3>
        <hr />
        
        <div className="mb-4">
          <label className="form-label fw-bold fs-5">ID o RUDE del Estudiante</label>
          <input 
            type="text" 
            className="form-control form-control-lg shadow-sm" 
            placeholder="Ingrese el ID (Ej: 1)"
            value={estudianteId} 
            onChange={(e) => setEstudianteId(e.target.value)} 
          />
        </div>

        <h5 className="mb-3">Seleccionar Meses:</h5>
        <div className="row">
          {mesesDelAño.map(mes => (
            <div className="col-md-3 col-6 mb-2" key={mes}>
              <div 
                className={`form-check card p-2 shadow-sm transition-all ${
                  mesesSeleccionados.includes(mes) ? 'bg-primary text-white border-primary' : 'bg-light border-0'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  <input 
                    className="form-check-input ms-1" 
                    type="checkbox" 
                    checked={mesesSeleccionados.includes(mes)}
                    onChange={() => manejarCheck(mes)} 
                  />
                  <label className={`form-check-label ms-3 ${mesesSeleccionados.includes(mes) ? 'text-white' : 'text-dark'}`}>
                    {mes}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-dark text-white rounded-3 shadow-lg">
          <div className="d-flex justify-content-between mb-2">
            <span>Meses a pagar:</span>
            <span className="fw-bold text-info fs-5">{mesesSeleccionados.length}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Monto por mes:</span>
            <span className="fw-bold">{montoPorMes} Bs</span>
          </div>
          
          {mesesSeleccionados.length > 5 && (
            <div className="text-warning fw-bold mb-2">
              <i className="bi bi-star-fill me-2"></i> ¡Descuento del 10% aplicado!
            </div>
          )}
          
          <button 
            className="btn btn-success btn-lg w-100 mt-3 py-3 fw-bold shadow" 
            onClick={enviarPago}
          >
            REGISTRAR PAGO EN BASE DE DATOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cuotas;