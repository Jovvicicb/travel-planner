import { validateExpenseForm } from "../common/expenseValidationRules";

export function validateUpdateExpenseForm(data) {
  return validateExpenseForm(data);
}
