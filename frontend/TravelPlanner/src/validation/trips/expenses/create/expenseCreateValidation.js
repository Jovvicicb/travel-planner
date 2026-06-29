import { validateExpenseForm } from "../common/expenseValidationRules";

export function validateCreateExpenseForm(data) {
  return validateExpenseForm(data);
}
