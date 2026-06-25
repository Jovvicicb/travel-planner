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
  },
};
