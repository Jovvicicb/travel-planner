import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";

export const reminderService = {
  getByTrip(tripId) {
    return apiClient.get(API_ROUTES.reminders.byTrip(tripId));
  },
};
