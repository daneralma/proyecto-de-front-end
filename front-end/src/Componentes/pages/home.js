import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [datosBackEnd, setDatosBackEnd] = useState('');

  useEffect(() => {
    // 1. Petición a Laravel
    fetch('https://proyecto-de-back-laravel.onrender.com') // <-- Usa la ruta de prueba
      .then(respuesta => respuesta.json())
      .then(datos => setDatosBackEnd(datos.mensaje))
      .catch(error => console.error("Error conectando con Laravel:", error));

    // 2. Inicialización del carrusel
    // Usamos el import dinámico para evitar errores de renderizado
    const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
    const miElemento = document.querySelector('#carruselPrincipal');
    
    if (miElemento) {
      new bootstrap.Carousel(miElemento, {
        interval: 2500, // Tiempo en milisegundos (3 segundos)
        ride: 'carousel', // Fuerza el inicio automático
        pause: 'hover'    // Se pausa si el usuario pone el mouse encima
      });
    }
  }, []);

  return (
    <div> {/* Div padre único */}

      {/* CARRUSEL (Solo un ID carruselPrincipal aquí) */}
      <div id="carruselPrincipal" className="carousel slide carousel-fade shadow" data-bs-ride="carousel">
        
        {/* Indicadores */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carruselPrincipal" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carruselPrincipal" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carruselPrincipal" data-bs-slide-to="2"></button>
        </div>

        {/* Contenido de los Slides */}
        <div className="carousel-inner">
          {/* SLIDE 1 */}
          <div className="carousel-item active" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container p-5 text-center">
              <div className="py-5">
                <h1 className="display-4 fw-bold text-primary mb-3">Colegio Luz del Himalaya</h1>
                <p className="fs-4 text-muted mb-4">Iluminando el camino del saber.</p>
                <Link to="/" className="btn btn-primary btn-lg px-5 shadow-sm">Explorar</Link>
              </div>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="carousel-item" style={{ height: '400px' }}>
            <img src="/carr1.jpg" className="d-block w-100 h-100 object-fit-cover" alt="Alumnos" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>Infraestructura de Vanguardia</h5>
              <p>Aulas modernas para el aprendizaje tecnológico.</p>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="carousel-item" style={{ height: '400px' }}>
            <img src="/carr2.jpg" className="d-block w-100 h-100 object-fit-cover" alt="Laboratorio" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>Educación Integral</h5>
              <p>Fomentamos la curiosidad científica.</p>
            </div>
          </div>
        </div>

        {/* Controles */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carruselPrincipal" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carruselPrincipal" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Contenido inferior */}
      <div className="container mt-5">
        <div className="alert alert-info text-center shadow-sm mb-5">
          <h5 className="alert-heading">Prueba de Conexión React 🤝 Laravel</h5>
          <p className="mb-0 fw-bold">{datosBackEnd || "Cargando datos desde Laravel..."}</p>
        </div>

        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <div className="h-100 p-5 text-white bg-dark rounded-3 shadow-sm">
              <h2>Nuestra Identidad</h2>
              <p>Filosofía basada en forjar el carácter y el intelecto.</p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="h-100 p-5 bg-white border border-2 border-success rounded-3 shadow-sm">
              <h2 className="text-success">Clase Especial</h2>
              <p>Programa exclusivo de Innovación y Desarrollo Técnico.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;