import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";
import { toCreateTravelPlanRequest } from "../../mappers/trips/create/createTripRequestMapper";
import { toUpdateTravelPlanRequest } from "../../mappers/trips/update/updateTripRequestMapper";
import { toCreateDestinationRequest } from "../../mappers/trips/destinations/create/createDestinationRequestMapper";
import { toUpdateDestinationRequest } from "../../mappers/trips/destinations/update/updateDestinationRequestMapper";

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
  getDestinations(tripId) {
    return apiClient.get(API_ROUTES.trips.destinationsList(tripId));
  },

  createDestination(tripId, data) {
    return apiClient.post(
      API_ROUTES.trips.destinationsCreate(tripId),
      toCreateDestinationRequest(data),
    );
  },

  updateDestination(tripId, destinationId, data) {
    return apiClient.put(
      API_ROUTES.trips.destinationsUpdate(tripId, destinationId),
      toUpdateDestinationRequest(data),
    );
  },

  deleteDestination(tripId, destinationId) {
    return apiClient.delete(
      API_ROUTES.trips.destinationsDelete(tripId, destinationId),
    );
  },
};
