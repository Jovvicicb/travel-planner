function formatMoney(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

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
    plannedBudgetDisplay: formatMoney(summary.plannedBudget),
    totalExpensesDisplay: formatMoney(summary.totalExpenses),
    remainingBudgetDisplay: formatMoney(summary.remainingBudget),
    statusLabel: summary.isOverBudget ? "Over budget" : "Within budget",
  };
}
