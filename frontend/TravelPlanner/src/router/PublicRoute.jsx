import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export function PublicRoute() {
  const location = useLocation();
  const {
    initializing,
    isAuthenticated,
    isAdmin,
    logoutRedirect,
    clearLogoutRedirect,
  } = useAuth();

  if (initializing) {
    return <p>Loading application...</p>;
  }

  if (isAuthenticated) {
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect");

    if (logoutRedirect) {
      clearLogoutRedirect();
      return <Navigate to="/trips" replace />;
    }

    if (
      redirectPath &&
      redirectPath.startsWith("/") &&
      (!redirectPath.startsWith("/admin") || isAdmin)
    ) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Navigate to="/trips" replace />;
  }

  return <Outlet />;
}
