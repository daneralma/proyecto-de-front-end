import React from 'react';

// 1. Ahora recibimos "imagen" además de nombre y precio
function Producto({ nombre, precio, imagen }) {
  return (
    <div className="card shadow-sm mb-4">
      
      {/* 2. El espacio para la imagen */}
      <img 
        // Si no le pasas una imagen, mostrará un cuadro gris por defecto
        src={imagen || "https://via.placeholder.com/300x250?text=Foto+Pendiente"} 
        className="card-img-top" 
        alt={`Imagen de ${nombre}`}
        // Esto asegura que todas las fotos midan lo mismo sin deformarse
        style={{ height: '250px', objectFit: 'cover' }} 
      />

      <div className="card-body text-center">
        
        <h2 className="card-title h5 text-dark mb-3">
          {nombre}
        </h2>
        
        <p className="card-text fs-4 fw-bold text-success mb-3">
          Precio: ${precio}
        </p>

        <button className="btn btn-outline-primary w-100">
          Ver Detalles
        </button>
        
      </div>
    </div>
  );
}

export default Producto;