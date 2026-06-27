import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";

export const sharedTripService = {
  getSharedTravelPlan(token) {
    return apiClient.get(API_ROUTES.sharedTrips.details(token));
  },
};
