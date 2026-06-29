import { formatDisplayMoney } from "../../../helpers/display/displayFormatHelper";

export function toBudgetSummaryDisplayModel(summary) {
  if (!summary) {
    return null;
  }

  return {
    travelPlanId: summary.travelPlanId,
    plannedBudget: summary.plannedBudget,
    totalExpenses: summary.totalExpenses,
    remainingBudget: summary.remainingBudget,
    isOverBudget: summary.isOverBudget,
    plannedBudgetDisplay: formatDisplayMoney(summary.plannedBudget),
    totalExpensesDisplay: formatDisplayMoney(summary.totalExpenses),
    remainingBudgetDisplay: formatDisplayMoney(summary.remainingBudget),
    statusLabel: summary.isOverBudget ? "Over budget" : "Within budget",
  };
}
