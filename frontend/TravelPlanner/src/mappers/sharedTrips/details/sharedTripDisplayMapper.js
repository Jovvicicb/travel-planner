const SHARE_ACCESS_LEVEL_LABELS = {
  0: "View access",
  1: "Edit access",
};

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function toSharedTripDisplayModel(sharedTrip) {
  if (!sharedTrip) {
    return null;
  }

  const trip = sharedTrip.travelPlan;
  const budget = sharedTrip.budgetSummary;

  return {
    accessLevel: sharedTrip.accessLevel,
    accessLevelLabel:
      SHARE_ACCESS_LEVEL_LABELS[sharedTrip.accessLevel] || "Unknown access",
    canClaimEditAccess: sharedTrip.accessLevel === 1,

    trip: {
      id: trip.id,
      title: trip.title,
      description: trip.description || "No description added.",
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      dateRange: `${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`,
      budget: trip.budget,
      budgetDisplay: formatMoney(trip.budget),
    },

    budget: budget
      ? {
          plannedBudgetDisplay: formatMoney(budget.plannedBudget),
          totalExpensesDisplay: formatMoney(budget.totalExpenses),
          remainingBudgetDisplay: formatMoney(budget.remainingBudget),
          isOverBudget: budget.isOverBudget,
          statusLabel: budget.isOverBudget ? "Over budget" : "Within budget",
        }
      : null,
  };
}
