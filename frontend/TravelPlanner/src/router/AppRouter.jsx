import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { TripsPage } from "../pages/trips/TripsPage";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage";
import { CreateTripPage } from "../pages/trips/CreateTripPage";
import { TripDetailsPage } from "../pages/trips/TripDetailsPage";
import { EditTripPage } from "../pages/trips/EditTripPage";
import { AppLayout } from "../components/layout/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { AdminRoute } from "./AdminRoute";
import { EditDestinationPage } from "../pages/trips/EditDestinationPage";
import { CreateActivityPage } from "../pages/trips/CreateActivityPage";
import { EditActivityPage } from "../pages/trips/EditActivityPage";
import { EditExpensePage } from "../pages/trips/EditExpensePage";

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
          <Route path="/trips/create" element={<CreateTripPage />} />
          <Route path="/trips/:tripId/edit" element={<EditTripPage />} />
          <Route
            path="/trips/:tripId/destinations/:destinationId/edit"
            element={<EditDestinationPage />}
          />
          <Route
            path="/trips/:tripId/destinations/:destinationId/activities/create"
            element={<CreateActivityPage />}
          />
          <Route
            path="/trips/:tripId/destinations/:destinationId/activities/:activityId/edit"
            element={<EditActivityPage />}
          />
          <Route
            path="/trips/:tripId/expenses/:expenseId/edit"
            element={<EditExpensePage />}
          />
          <Route path="/trips/:tripId" element={<TripDetailsPage />} />
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
