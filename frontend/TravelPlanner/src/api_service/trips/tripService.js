import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";
import { toCreateTravelPlanRequest } from "../../mappers/trips/create/createTripRequestMapper";


export const tripService = {
  createTravelPlan(data) {
    return apiClient.post(
      API_ROUTES.trips.create,
      toCreateTravelPlanRequest(data)
    );
  },
};