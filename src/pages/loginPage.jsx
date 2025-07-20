import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [ loading, setLoading ] = useState(false);

  const BASE_URL = import.meta.env.VITE_URL_SIGNIN;

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!username.trim() || !password.trim()) {
    toast.warning("Por favor ingresa usuario y contraseña", {
      position: "top-center",
      autoClose: 1000,
    });
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Credenciales incorrectas");
    }

    localStorage.setItem("token", data.token);

    toast.success("Login exitoso, redirigiendo...", {
      position: "top-center",
      autoClose: 1000,
      onClose: () => {
        setLoading(false);
        navigate("/posts");
      },
    });
  } catch (error) {
    toast.error(`${error.message}`, {
      position: "top-center",
      autoClose: 1000,
    });
    setLoading(false);
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "320px" }}>
        <img src="/logo-tcit.svg" alt="Logo" height="60" className="mb-4 mx-auto d-block" />
        <div
          className="alert alert-info text-center fw-bold mb-4"
          style={{ fontSize: "14px", border: "2px solid #0dcaf0" }}
        >
          <p className="mb-1">🔐 <strong>Para efectos de esta prueba:</strong></p>
          <p className="mb-1">
            <strong>Usuario:</strong> <span className="text-primary">tcit</span>
          </p>
          <p className="mb-0">
            <strong>Contraseña:</strong>{" "}
            <span className="text-primary">admintcit2025</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-custom w-100">
            Ingresar
          </button>
        </form>
      </div>

      {/* Contenedor de Toasts */}
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
