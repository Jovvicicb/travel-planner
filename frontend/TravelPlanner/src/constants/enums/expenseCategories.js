export const EXPENSE_CATEGORIES = {
  TRANSPORT: 0,
  ACCOMMODATION: 1,
  FOOD: 2,
  TICKETS: 3,
  SHOPPING: 4,
  OTHER: 5,
};

export const EXPENSE_CATEGORY_OPTIONS = [
  {
    value: EXPENSE_CATEGORIES.TRANSPORT,
    label: "Transport",
  },
  {
    value: EXPENSE_CATEGORIES.ACCOMMODATION,
    label: "Accommodation",
  },
  {
    value: EXPENSE_CATEGORIES.FOOD,
    label: "Food",
  },
  {
    value: EXPENSE_CATEGORIES.TICKETS,
    label: "Tickets",
  },
  {
    value: EXPENSE_CATEGORIES.SHOPPING,
    label: "Shopping",
  },
  {
    value: EXPENSE_CATEGORIES.OTHER,
    label: "Other",
  },
];

export const EXPENSE_CATEGORY_LABELS = {
  [EXPENSE_CATEGORIES.TRANSPORT]: "Transport",
  [EXPENSE_CATEGORIES.ACCOMMODATION]: "Accommodation",
  [EXPENSE_CATEGORIES.FOOD]: "Food",
  [EXPENSE_CATEGORIES.TICKETS]: "Tickets",
  [EXPENSE_CATEGORIES.SHOPPING]: "Shopping",
  [EXPENSE_CATEGORIES.OTHER]: "Other",
};

export function getExpenseCategoryLabel(category) {
  return EXPENSE_CATEGORY_LABELS[category] || "Unknown";
}

export function isValidExpenseCategory(category) {
  return Object.prototype.hasOwnProperty.call(
    EXPENSE_CATEGORY_LABELS,
    category,
  );
}
