import { toCreateReminderRequest } from "../../mappers/reminders/create/createReminderRequestMapper";
import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";

export const reminderService = {
  create(travelPlanId, data) {
    return apiClient.post(
      API_ROUTES.reminders.create,
      toCreateReminderRequest(travelPlanId, data),
    );
  },

  getByTrip(tripId) {
    return apiClient.get(API_ROUTES.reminders.byTrip(tripId));
  },
};
