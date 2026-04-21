import React, { useState } from 'react';

function RegistroEstudiante() {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    rude: '',
    password: '',
    curso: ''
  });

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
        const BASE_URL = 'https://proyecto-de-back-laravel.onrender.com'; 
        const respuesta = await fetch(`${BASE_URL}/api/estudiantes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(formData)
        });

        if (respuesta.ok) {
            alert('¡Estudiante registrado y guardado en la base de datos!');
            setFormData({ nombre_completo: '', rude: '', password: '', curso: '' });
        } else if (respuesta.status === 401) {
            alert('Error 401: No tienes permiso. Intenta cerrar sesión y volver a entrar como Admin.');
        } else {
            const errorData = await respuesta.json();
            alert('Error: ' + (errorData.error || 'No se pudo registrar'));
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
        alert('Error al conectar con el servidor');
    }
  };

// 1. Definimos la URL de Render (como hicimos en el Login)





  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">Registrar Nuevo Estudiante</h3>
        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label className="form-label">Nombre Completo</label>
            <input type="text" className="form-control" value={formData.nombre_completo}
              onChange={(e) => setFormData({...formData, nombre_completo: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label">RUDE (Usuario)</label>
            <input type="text" className="form-control" value={formData.rude}
              onChange={(e) => setFormData({...formData, rude: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña inicial</label>
            <input type="password" className="form-control" value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Curso</label>
            <select className="form-select" value={formData.curso}
              onChange={(e) => setFormData({...formData, curso: e.target.value})} required>
              <option value="">Seleccione...</option>
              <option value="1ro">1ro de Secundaria</option>
              <option value="2do">2do de Secundaria</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">Guardar Estudiante</button>
        </form>
      </div>
    </div>
  );
}

export default RegistroEstudiante;


