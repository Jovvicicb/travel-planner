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

    expensesUpdate: (tripId, expenseId) =>
      `/trips/${tripId}/expenses/${expenseId}`,

    expensesDelete: (tripId, expenseId) =>
      `/trips/${tripId}/expenses/${expenseId}`,

    budgetSummary: (tripId) => `/trips/${tripId}/budget-summary`,

    // Checklist
    checklistCreate: (tripId) => `/trips/${tripId}/checklist`,

    checklistList: (tripId) => `/trips/${tripId}/checklist`,

    checklistUpdate: (tripId, itemId) => `/trips/${tripId}/checklist/${itemId}`,

    checklistToggle: (tripId, itemId) =>
      `/trips/${tripId}/checklist/${itemId}/toggle`,

    checklistDelete: (tripId, itemId) => `/trips/${tripId}/checklist/${itemId}`,

    // Sharing
    sharesCreate: (tripId) => `/trips/${tripId}/shares`,
    sharesList: (tripId) => `/trips/${tripId}/shares`,
    sharesDeactivate: (tripId, shareId) => `/trips/${tripId}/shares/${shareId}`,
    claimShare: (token) => `/trips/${token}/claim`,
    collaboratorsList: (tripId) => `/trips/${tripId}/collaborators`,
    collaboratorsRemove: (tripId, userId) =>
      `/trips/${tripId}/collaborators/${userId}`,
  },

  sharedTrips: {
    details: (token) => `/shared/trips/${token}`,
  },

  reminders: {
    create: "/reminders",
    byTrip: (tripId) => `/reminders/trip/${tripId}`,
    triggered: "/reminders/triggered",
    triggeredCount: "/reminders/triggered/count",
    details: (reminderId) => `/reminders/${reminderId}`,
    update: (reminderId) => `/reminders/${reminderId}`,
    complete: (reminderId) => `/reminders/${reminderId}/complete`,
    delete: (reminderId) => `/reminders/${reminderId}`,
  },

  reports: {
    tripReport: (tripId) => `/trips/${tripId}/report`,
  },

  admin: {
    users: {
      list: "/admin/users",
      details: (userId) => `/admin/users/${userId}`,
      updateRole: (userId) => `/admin/users/${userId}/role`,
      delete: (userId) => `/admin/users/${userId}`,
    },
  },
};
