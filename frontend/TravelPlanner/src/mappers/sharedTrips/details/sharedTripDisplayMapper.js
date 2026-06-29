import {
  canClaimShareEditAccess,
  getShareAccessLevelBadgeLabel,
} from "../../../constants/enums/shareAccessLevels";
import {
  formatDisplayDate,
  formatDisplayMoney,
} from "../../../helpers/display/displayFormatHelper";

export function toSharedTripDisplayModel(sharedTrip) {
  if (!sharedTrip) {
    return null;
  }

  const trip = sharedTrip.travelPlan;
  const budget = sharedTrip.budgetSummary;
  const accessLevel = sharedTrip.accessLevel;
  const tripDateRange = `${formatDisplayDate(trip.startDate)} - ${formatDisplayDate(
    trip.endDate,
  )}`;

  return {
    accessLevel,
    accessLevelLabel: getShareAccessLevelBadgeLabel(accessLevel),
    canClaimEditAccess: canClaimShareEditAccess(accessLevel),

    trip: {
      id: trip.id,
      title: trip.title,
      description: trip.description || "No description added.",
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      dateRange: tripDateRange,
      budget: trip.budget,
      budgetDisplay: formatDisplayMoney(trip.budget),
    },

    budget: budget
      ? {
          plannedBudgetDisplay: formatDisplayMoney(budget.plannedBudget),
          totalExpensesDisplay: formatDisplayMoney(budget.totalExpenses),
          remainingBudgetDisplay: formatDisplayMoney(budget.remainingBudget),
          isOverBudget: budget.isOverBudget,
          statusLabel: budget.isOverBudget ? "Over budget" : "Within budget",
        }
      : null,
  };
}
