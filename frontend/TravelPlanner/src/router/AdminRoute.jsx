import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export function AdminRoute() {
  const { initializing, isAuthenticated, isAdmin } = useAuth();

  if (initializing) {
    return <p className="p-6 text-sm font-semibold text-slate-500">Loading application...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/trips" replace />;
  }

  return <Outlet />;
}