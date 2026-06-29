import { EXPENSE_CATEGORIES } from "../../../../constants/enums/expenseCategories";
import { toDateInputValue } from "../../../../helpers/forms/dateTimeInputHelper";

export function createUpdateExpenseFormModel(expense) {
  return {
    title: expense.title || "",
    category:
      expense.category === null || expense.category === undefined
        ? String(EXPENSE_CATEGORIES.OTHER)
        : String(expense.category),
    amount:
      expense.amount === null || expense.amount === undefined
        ? ""
        : String(expense.amount),
    expenseDate: toDateInputValue(expense.expenseDate),
    description: expense.description || "",
  };
}
