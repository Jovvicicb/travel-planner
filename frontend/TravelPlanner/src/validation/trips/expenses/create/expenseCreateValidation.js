function isEmpty(value) {
  return !value || value.trim() === "";
}

export function validateCreateExpenseForm(data) {
  const errors = {};

  const title = data.title?.trim() || "";
  const description = data.description?.trim() || "";
  const category = Number(data.category);
  const amount = Number(data.amount);

  if (isEmpty(title)) {
    errors.title = "Expense title is required.";
  } else if (title.length > 120) {
    errors.title = "Expense title cannot exceed 120 characters.";
  }

  if (
    data.category === "" ||
    Number.isNaN(category) ||
    ![0, 1, 2, 3, 4, 5].includes(category)
  ) {
    errors.category = "Expense category is not valid.";
  }

  if (data.amount === "" || Number.isNaN(amount)) {
    errors.amount = "Expense amount is required.";
  } else if (amount <= 0) {
    errors.amount = "Expense amount must be greater than zero.";
  }

  if (isEmpty(data.expenseDate)) {
    errors.expenseDate = "Expense date is required.";
  }

  if (description.length > 1000) {
    errors.description = "Expense description cannot exceed 1000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
