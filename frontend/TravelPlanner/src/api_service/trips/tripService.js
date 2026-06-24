import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";
import { toCreateTravelPlanRequest } from "../../mappers/trips/create/createTripRequestMapper";

export const tripService = {
  getTravelPlans() {
    return apiClient.get(API_ROUTES.trips.list);
  },

  createTravelPlan(data) {
    return apiClient.post(
      API_ROUTES.trips.create,
      toCreateTravelPlanRequest(data),
    );
  },
};
