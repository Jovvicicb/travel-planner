import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export function PublicRoute() {
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return <p>Loading application...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to="/trips" replace />;
  }

  return <Outlet />;
}
