import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If no token, go to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise allow dashboard to load
  return children;
}

export default ProtectedRoute;
