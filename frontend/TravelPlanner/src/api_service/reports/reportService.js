import { API_ROUTES } from "../apiRoutes";
import { apiClient } from "../apiClient";

export const reportService = {
  downloadTripReport(tripId) {
    return apiClient.get(API_ROUTES.reports.tripReport(tripId), {
      responseType: "blob",
    });
  },
};
