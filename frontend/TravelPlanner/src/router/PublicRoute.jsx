import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export function PublicRoute() {
  const location = useLocation();
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return <p>Loading application...</p>;
  }

  if (isAuthenticated) {
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect");

    if (redirectPath && redirectPath.startsWith("/")) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Navigate to="/trips" replace />;
  }

  return <Outlet />;
}
