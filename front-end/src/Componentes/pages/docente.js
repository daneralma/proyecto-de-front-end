import React, { useState, useEffect } from 'react';

const Docentes = () => {
  // Estado para la lista de docentes
  const [listaDocentes, setListaDocentes] = useState([]);
  
  // Estado para el formulario
  const [nuevoDocente, setNuevoDocente] = useState({
    nombre: '',
    materia: '',
    descripcion: '',
    foto: ''
  });

  const userRole = localStorage.getItem('rol') || localStorage.getItem('role');
  const isAdmin = userRole === 'admin';

  // Cargar docentes guardados al iniciar
  useEffect(() => {
    const guardados = localStorage.getItem('docentes_colegio');
    if (guardados) {
      setListaDocentes(JSON.parse(guardados));
    }
  }, []);

  const manejarCambio = (e) => {
    setNuevoDocente({ ...nuevoDocente, [e.target.name]: e.target.value });
  };

  const agregarDocente = (e) => {
    e.preventDefault();
    if (!nuevoDocente.nombre || !nuevoDocente.materia) return;

    const nuevaLista = [...listaDocentes, { ...nuevoDocente, id: Date.now() }];
    setListaDocentes(nuevaLista);
    localStorage.setItem('docentes_colegio', JSON.stringify(nuevaLista));
    
    // Limpiar formulario
    setNuevoDocente({ nombre: '', materia: '', descripcion: '', foto: '' });
    alert("Docente añadido al plantel.");
  };

  const eliminarDocente = (id) => {
    const filtrados = listaDocentes.filter(d => d.id !== id);
    setListaDocentes(filtrados);
    localStorage.setItem('docentes_colegio', JSON.stringify(filtrados));
  };

  return (
    <div className="container mt-5 pb-5">
      <h2 className="text-center fw-bold mb-4">Plantel Docente - Luz del Himalaya</h2>

      {/* SECCIÓN SOLO PARA ADMIN: Formulario */}
      {isAdmin && (
        <div className="card shadow-sm p-4 mb-5 border-warning" style={{ borderLeft: '5px solid' }}>
          <h4 className="text-warning mb-3"><i className="bi bi-person-plus-fill"></i> Panel de Administración: Añadir Docente</h4>
          <form onSubmit={agregarDocente} className="row g-3">
            <div className="col-md-6">
              <input type="text" name="nombre" className="form-control" placeholder="Nombre completo" value={nuevoDocente.nombre} onChange={manejarCambio} required />
            </div>
            <div className="col-md-6">
              <input type="text" name="materia" className="form-control" placeholder="Materia (ej: Matemáticas)" value={nuevoDocente.materia} onChange={manejarCambio} required />
            </div>
            <div className="col-md-12">
              <input type="text" name="foto" className="form-control" placeholder="URL de la foto (puedes usar una de internet)" value={nuevoDocente.foto} onChange={manejarCambio} />
            </div>
            <div className="col-md-12">
              <textarea name="descripcion" className="form-control" placeholder="Breve descripción profesional" value={nuevoDocente.descripcion} onChange={manejarCambio}></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-warning fw-bold">Guardar Docente</button>
            </div>
          </form>
        </div>
      )}

      {/* LISTA DE DOCENTES (VISTA GENERAL) */}
      <div className="row">
        {listaDocentes.length > 0 ? (
          listaDocentes.map((docente) => (
            <div className="col-md-4 mb-4" key={docente.id}>
              <div className="card h-100 shadow-sm border-0 text-center p-3">
                <img 
                  src={docente.foto || "https://via.placeholder.com/150?text=Docente"} 
                  className="rounded-circle mx-auto mt-3 shadow" 
                  alt={docente.nombre}
                  style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #ffc107' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-1">{docente.nombre}</h5>
                  <p className="text-warning fw-bold small text-uppercase">{docente.materia}</p>
                  <p className="card-text text-muted small">{docente.descripcion}</p>
                </div>
                {isAdmin && (
                  <div className="card-footer bg-transparent border-0">
                    <button onClick={() => eliminarDocente(docente.id)} className="btn btn-outline-danger btn-sm w-100">
                      Eliminar Registro
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">Aún no se han registrado docentes en el sistema.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Docentes;