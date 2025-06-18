import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user_id") !== null;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
