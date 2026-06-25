import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";
import { toCreateTravelPlanRequest } from "../../mappers/trips/create/createTripRequestMapper";
import { toUpdateTravelPlanRequest } from "../../mappers/trips/update/updateTripRequestMapper";

export const tripService = {
  getTravelPlans() {
    return apiClient.get(API_ROUTES.trips.list);
  },

  getTravelPlanById(id) {
    return apiClient.get(API_ROUTES.trips.details(id));
  },

  createTravelPlan(data) {
    return apiClient.post(
      API_ROUTES.trips.create,
      toCreateTravelPlanRequest(data),
    );
  },

  updateTravelPlan(id, data) {
    return apiClient.put(
      API_ROUTES.trips.update(id),
      toUpdateTravelPlanRequest(data),
    );
  },

  deleteTravelPlan(id) {
    return apiClient.delete(API_ROUTES.trips.delete(id));
  },
};
