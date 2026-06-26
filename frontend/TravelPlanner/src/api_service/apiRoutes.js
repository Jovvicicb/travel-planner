export const API_ROUTES = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
  },

  trips: {
    list: "/trips",
    create: "/trips",
    details: (id) => `/trips/${id}`,
    update: (id) => `/trips/${id}`,
    delete: (id) => `/trips/${id}`,

    destinationsList: (tripId) => `/trips/${tripId}/destinations`,
    destinationsCreate: (tripId) => `/trips/${tripId}/destinations`,
    destinationsUpdate: (tripId, destinationId) =>
      `/trips/${tripId}/destinations/${destinationId}`,
    destinationsDelete: (tripId, destinationId) =>
      `/trips/${tripId}/destinations/${destinationId}`,

    activitiesCreate: (tripId, destinationId) =>
      `/trips/${tripId}/destinations/${destinationId}/activities`,

    activitiesList: (tripId, destinationId) =>
      `/trips/${tripId}/destinations/${destinationId}/activities`,

    activitiesCalendar: (tripId) => `/trips/${tripId}/activities/calendar`,

    activitiesUpdate: (tripId, destinationId, activityId) =>
      `/trips/${tripId}/destinations/${destinationId}/activities/${activityId}`,

    activitiesDelete: (tripId, destinationId, activityId) =>
      `/trips/${tripId}/destinations/${destinationId}/activities/${activityId}`,

    // Expenses and budget
    expensesCreate: (tripId) => `/trips/${tripId}/expenses`,
    expensesList: (tripId) => `/trips/${tripId}/expenses`,
  },
};
