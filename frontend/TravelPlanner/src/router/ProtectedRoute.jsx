import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export function ProtectedRoute() {
  const location = useLocation();
  const { initializing, isAuthenticated, logoutRedirect } = useAuth();

  if (initializing) {
    return <p>Loading application...</p>;
  }

  if (!isAuthenticated) {
    if (logoutRedirect) {
      return <Navigate to="/login" replace />;
    }

    const redirectPath = `${location.pathname}${location.search}`;

    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(redirectPath)}`}
        replace
      />
    );
  }

  return <Outlet />;
}
