import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { TripsPage } from "../pages/trips/TripsPage";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage";
import { AppLayout } from "../components/layout/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { AdminRoute } from "./AdminRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/trips" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/trips" element={<TripsPage />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/trips" replace />} />
    </Routes>
  );
}