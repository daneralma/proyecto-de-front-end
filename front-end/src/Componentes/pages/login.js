import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [modoEstudiante, setModoEstudiante] = useState(false); 
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const BASE_URL = 'https://tu-api-laravel.onrender.com'; 

  const manejarEnvio = async (e) => {
      e.preventDefault();
      setError('');

    
      const rutaApi = modoEstudiante 
        ? `${BASE_URL}/api/login-estudiante` 
        : `${BASE_URL}/api/login`;

    try {
          const respuesta = await fetch(rutaApi, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
            [modoEstudiante ? 'rude' : 'email']: email,
            password: password
            })
          });
          
      const texto = await respuesta.text();
      const datos = texto ? JSON.parse(texto) : {};

      if (respuesta.ok) {
              localStorage.setItem('token', datos.access_token);
              localStorage.setItem('usuario', JSON.stringify(datos.usuario));
              localStorage.setItem('rol', modoEstudiante ? 'estudiante' : 'admin');

              alert(`¡Bienvenido ${modoEstudiante ? 'Estudiante' : 'Administrador'}!`);
              navigate(modoEstudiante ? '/perfil-estudiante' : '/productos');
            } else {
              setError(datos.error || datos.message || 'Credenciales incorrectas');
            }
          } catch (err) {
            console.error("Detalle del error:", err);
            // Actualizamos el mensaje de error para que sea más acorde a internet
            setError('Error de conexión: No se pudo contactar con el servidor de la institución.'); 
          }
        };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h3 className="text-center mb-2 fw-bold">
                {modoEstudiante ? 'Ingreso Estudiantes' : 'Panel Administrativo'}
              </h3>
              <p className="text-center text-muted mb-4 small">
                {modoEstudiante ? 'Usa tu código RUDE para entrar' : 'Ingreso solo personal autorizado'}
              </p>
              
              {error && <div className="alert alert-danger p-2 small text-center">{error}</div>}
              
              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    {modoEstudiante ? 'Código RUDE' : 'Correo Electrónico'}
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder={modoEstudiante ? "Ej: 806700012023..." : "admin@luzdelhimalaya.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold mb-3">
                  {modoEstudiante ? 'Entrar como Estudiante' : 'Entrar al Sistema'}
                </button>

                <hr />

                <button 
                  type="button" 
                  className={`btn w-100 fw-bold ${modoEstudiante ? 'btn-outline-dark' : 'btn-outline-secondary'}`}
                  onClick={() => {
                    setModoEstudiante(!modoEstudiante);
                    setEmail('');
                    setPassword('');
                    setError('');
                  }}
                >
                  {modoEstudiante ? '← Volver a Admin' : 'Soy Estudiante'}
                </button>
              </form> 
            </div>
          </div>
          <p className="text-center mt-3 text-muted" style={{fontSize: '0.8rem'}}>
            Colegio Luz del Himalaya - Sistema de Gestión 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;