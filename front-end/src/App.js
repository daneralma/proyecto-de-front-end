import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import { Header, Footer } from './Componentes/header';
import Home from './Componentes/pages/home'; 
import Productos from './Componentes/pages/productos'; 
import Login from './Componentes/pages/login';
import RegistroEstudiante from './Componentes/pages/formulario';
import Cuotas from './Componentes/pages/cuotas';
import Docentes from './Componentes/pages/docente'; // <--- Usando D mayúscula

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/docente" element={<Docentes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro-estudiante" element={<RegistroEstudiante />} />
            <Route path="/pagos" element={<Cuotas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;