import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { TripsPage } from "../pages/trips/TripsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/trips" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/trips" element={<TripsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/trips" replace />} />
    </Routes>
  );
}