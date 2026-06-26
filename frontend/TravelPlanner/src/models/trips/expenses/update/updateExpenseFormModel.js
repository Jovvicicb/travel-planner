function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

export function createUpdateExpenseFormModel(expense) {
  return {
    title: expense.title || "",
    category:
      expense.category === null || expense.category === undefined
        ? "5"
        : String(expense.category),
    amount:
      expense.amount === null || expense.amount === undefined
        ? ""
        : String(expense.amount),
    expenseDate: toDateInputValue(expense.expenseDate),
    description: expense.description || "",
  };
}
