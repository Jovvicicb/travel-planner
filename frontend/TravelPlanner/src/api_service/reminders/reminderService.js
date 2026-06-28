import { toCreateReminderRequest } from "../../mappers/reminders/create/createReminderRequestMapper";
import { toUpdateReminderRequest } from "../../mappers/reminders/update/updateReminderRequestMapper";
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

  getTriggered() {
    return apiClient.get(API_ROUTES.reminders.triggered);
  },

  getTriggeredCount() {
    return apiClient.get(API_ROUTES.reminders.triggeredCount);
  },

  getById(reminderId) {
    return apiClient.get(API_ROUTES.reminders.details(reminderId));
  },

  update(reminderId, data) {
    return apiClient.put(
      API_ROUTES.reminders.update(reminderId),
      toUpdateReminderRequest(data),
    );
  },

  complete(reminderId) {
    return apiClient.patch(API_ROUTES.reminders.complete(reminderId), {});
  },

  delete(reminderId) {
    return apiClient.delete(API_ROUTES.reminders.delete(reminderId));
  },
};
