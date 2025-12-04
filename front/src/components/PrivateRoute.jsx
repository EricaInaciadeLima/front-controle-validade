import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    // Decodifica o payload do JWT
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      // Remove token vencido
      localStorage.removeItem("token");
      localStorage.removeItem("empresa");
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    // Se der erro ao decodificar, trata como inválido
    localStorage.removeItem("token");
    localStorage.removeItem("empresa");
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;