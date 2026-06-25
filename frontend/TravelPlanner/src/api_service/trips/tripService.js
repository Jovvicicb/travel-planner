import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";
import { toCreateTravelPlanRequest } from "../../mappers/trips/create/createTripRequestMapper";
import { toUpdateTravelPlanRequest } from "../../mappers/trips/update/updateTripRequestMapper";
import { toCreateDestinationRequest } from "../../mappers/trips/destinations/create/createDestinationRequestMapper";

export const tripService = {
  // Travel plans
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

  // Destinations
  createDestination(tripId, data) {
    return apiClient.post(
      API_ROUTES.trips.destinationsCreate(tripId),
      toCreateDestinationRequest(data),
    );
  },
};
