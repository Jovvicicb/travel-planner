import { validateCreateExpenseForm } from "../create/expenseCreateValidation";

export function validateUpdateExpenseForm(data) {
  return validateCreateExpenseForm(data);
}
