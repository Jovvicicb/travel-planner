import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";
import { toCreateTravelPlanRequest } from "../../mappers/trips/create/createTripRequestMapper";
import { toUpdateTravelPlanRequest } from "../../mappers/trips/update/updateTripRequestMapper";
import { toCreateDestinationRequest } from "../../mappers/trips/destinations/create/createDestinationRequestMapper";
import { toUpdateDestinationRequest } from "../../mappers/trips/destinations/update/updateDestinationRequestMapper";
import { toCreateActivityRequest } from "../../mappers/trips/activities/create/createActivityRequestMapper";
import { toUpdateActivityRequest } from "../../mappers/trips/activities/update/updateActivityRequestMapper";
import { toCreateExpenseRequest } from "../../mappers/trips/expenses/create/createExpenseRequestMapper";
import { toUpdateExpenseRequest } from "../../mappers/trips/expenses/update/updateExpenseRequestMapper";
import { toCreateChecklistItemRequest } from "../../mappers/trips/checklist/create/createChecklistItemRequestMapper";
import { toUpdateChecklistItemRequest } from "../../mappers/trips/checklist/update/updateChecklistItemRequestMapper";
import { toCreateShareRequest } from "../../mappers/trips/shares/create/createShareRequestMapper";

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

  // Activities
  createActivity(tripId, destinationId, data) {
    return apiClient.post(
      API_ROUTES.trips.activitiesCreate(tripId, destinationId),
      toCreateActivityRequest(data),
    );
  },

  getActivities(tripId, destinationId) {
    return apiClient.get(
      API_ROUTES.trips.activitiesList(tripId, destinationId),
    );
  },

  getActivityCalendar(tripId) {
    return apiClient.get(API_ROUTES.trips.activitiesCalendar(tripId));
  },

  updateActivity(tripId, destinationId, activityId, data) {
    return apiClient.put(
      API_ROUTES.trips.activitiesUpdate(tripId, destinationId, activityId),
      toUpdateActivityRequest(data),
    );
  },

  deleteActivity(tripId, destinationId, activityId) {
    return apiClient.delete(
      API_ROUTES.trips.activitiesDelete(tripId, destinationId, activityId),
    );
  },

  // Expenses and budget
  createExpense(tripId, data) {
    return apiClient.post(
      API_ROUTES.trips.expensesCreate(tripId),
      toCreateExpenseRequest(data),
    );
  },

  getExpenses(tripId) {
    return apiClient.get(API_ROUTES.trips.expensesList(tripId));
  },

  updateExpense(tripId, expenseId, data) {
    return apiClient.put(
      API_ROUTES.trips.expensesUpdate(tripId, expenseId),
      toUpdateExpenseRequest(data),
    );
  },

  deleteExpense(tripId, expenseId) {
    return apiClient.delete(API_ROUTES.trips.expensesDelete(tripId, expenseId));
  },

  getBudgetSummary(tripId) {
    return apiClient.get(API_ROUTES.trips.budgetSummary(tripId));
  },

  // Checklist
  createChecklistItem(tripId, data) {
    return apiClient.post(
      API_ROUTES.trips.checklistCreate(tripId),
      toCreateChecklistItemRequest(data),
    );
  },

  getChecklistItems(tripId) {
    return apiClient.get(API_ROUTES.trips.checklistList(tripId));
  },

  updateChecklistItem(tripId, itemId, data) {
    return apiClient.put(
      API_ROUTES.trips.checklistUpdate(tripId, itemId),
      toUpdateChecklistItemRequest(data),
    );
  },

  toggleChecklistItem(tripId, itemId) {
    return apiClient.patch(API_ROUTES.trips.checklistToggle(tripId, itemId));
  },

  deleteChecklistItem(tripId, itemId) {
    return apiClient.delete(API_ROUTES.trips.checklistDelete(tripId, itemId));
  },

  // Sharing
  createShare(tripId, data) {
    return apiClient.post(
      API_ROUTES.trips.sharesCreate(tripId),
      toCreateShareRequest(data),
    );
  },

  getShares(tripId) {
    return apiClient.get(API_ROUTES.trips.sharesList(tripId));
  },

  deactivateShare(tripId, shareId) {
    return apiClient.delete(API_ROUTES.trips.sharesDeactivate(tripId, shareId));
  },

  claimShare(token) {
    return apiClient.post(API_ROUTES.trips.claimShare(token), {});
  },

  getCollaborators(tripId) {
    return apiClient.get(API_ROUTES.trips.collaboratorsList(tripId));
  },

  removeCollaborator(tripId, userId) {
    return apiClient.delete(
      API_ROUTES.trips.collaboratorsRemove(tripId, userId),
    );
  },
};
