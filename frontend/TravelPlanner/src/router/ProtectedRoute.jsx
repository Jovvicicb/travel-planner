import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export function ProtectedRoute() {
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return <p>Loading application...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}