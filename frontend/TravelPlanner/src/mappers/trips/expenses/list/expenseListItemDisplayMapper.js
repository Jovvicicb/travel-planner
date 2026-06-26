const EXPENSE_CATEGORY_LABELS = {
  0: "Transport",
  1: "Accommodation",
  2: "Food",
  3: "Tickets",
  4: "Shopping",
  5: "Other",
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

export function toExpenseListItemDisplayModel(expense) {
  return {
    id: expense.id,
    travelPlanId: expense.travelPlanId,
    title: expense.title,
    category: expense.category,
    categoryLabel: EXPENSE_CATEGORY_LABELS[expense.category] || "Unknown",
    amount: expense.amount,
    amountDisplay: formatMoney(expense.amount),
    expenseDate: expense.expenseDate,
    dateDisplay: formatDate(expense.expenseDate),
    description: expense.description || "No description added.",
  };
}
