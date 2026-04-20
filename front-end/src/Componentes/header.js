import React from 'react'; 
import { NavLink, Link, useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  
  // 1. ESCUDO DE SEGURIDAD
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');
  const userRole = localStorage.getItem('rol') || localStorage.getItem('role') || 'invitado';
  const isLoggedIn = !!token;

  // 2. PARSE SEGURO
  const rawUserData = localStorage.getItem('usuario');
  let userData = {};
  try {
    if (rawUserData && rawUserData !== "undefined") {
      userData = JSON.parse(rawUserData);
    }
  } catch (e) {
    userData = {}; 
  }

  const userName = userData.name || userData.nombre_completo || userData.rude || 'Usuario';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/home');
    window.location.reload(); 
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <img src="/logo.png" alt="Logo" width="60" height="60" className="me-2 rounded-circle border border-warning" />
            <span className="fs-3 fw-bold text-white">Luz del Himalaya</span>
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">Inicio</NavLink>
              </li>

              {/* OPCIONES PARA EL ADMINISTRADOR */}
              {isLoggedIn && userRole === 'admin' && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-warning fw-bold" to="/registro-estudiante">
                      + Registro Estudiantes
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-info fw-bold" to="/pagos">
                      sistema de pago
                    </NavLink>
                  </li>
                </>
              )}

              {/* OPCIÓN PARA EL ESTUDIANTE */}
              {isLoggedIn && userRole === 'estudiante' && (
                <li className="nav-item">
                  <NavLink className="nav-link text-info fw-bold" to="/pagos">
                    Mi Sistema de Pagos
                  </NavLink>
                </li>
              )}

              {/* MENÚ GENERAL */}
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle text-white border-0 bg-transparent" id="navbarDropdown" type="button" data-bs-toggle="dropdown">
                  Oferta académica
                </button>
                <ul className="dropdown-menu shadow border-0">
                    <li><NavLink className="dropdown-item" to="/primaria">Primaria</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/secundaria">Secundaria</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/actividad">Actividades Especiales</NavLink></li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/docente">Plantel Docente</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/productos">Reglamento</NavLink>
              </li>

              {/* SECCIÓN DE PERFIL / LOGIN */}
              <li className="nav-item ms-lg-4">
                {isLoggedIn ? (
                  <div className="d-flex align-items-center">
                    <div className="text-end me-2 d-none d-lg-block">
                      <span className="text-white d-block small lh-1">{userName}</span>
                      <span className="badge bg-warning text-dark mt-1" style={{ fontSize: '0.65rem' }}>
                        {userRole.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="dropdown">
                      <button className="btn btn-link p-0 dropdown-toggle d-flex align-items-center border-0" type="button" data-bs-toggle="dropdown">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${userName}&background=${userRole === 'admin' ? 'ffc107' : '0dcaf0'}&color=fff`} 
                          alt="Avatar" width="42" height="42" className="rounded-circle border border-2 border-warning" 
                        />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                        <li className="p-3 text-center border-bottom">
                            <h6 className="mb-0">{userName}</h6>
                            <small className="text-muted text-uppercase">{userRole}</small>
                        </li>
                        <li><button className="dropdown-item text-danger fw-bold mt-2" onClick={handleLogout}>Cerrar Sesión</button></li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link className="btn btn-outline-warning" to="/login">Iniciar Sesión</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-4 mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Luz del Himalaya</h5>
            <p className="small">Excelencia educativa en Quillacollo.</p>
          </div>
          <div className="col-md-4 mt-3 text-center">
             <p className="small mb-1">&copy; 2026 Todos los derechos reservados.</p>
          </div>
          <div className="col-md-4 mt-3 text-md-end text-center">
             <i className="bi bi-whatsapp me-3"></i>
             <i className="bi bi-facebook me-3"></i>
             <i className="bi bi-instagram"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}