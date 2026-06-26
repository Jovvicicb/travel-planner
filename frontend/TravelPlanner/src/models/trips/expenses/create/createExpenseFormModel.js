import { EXPENSE_CATEGORIES } from "../../../../constants/enums/expenseCategories";

export function createExpenseFormModel() {
  return {
    title: "",
    category: String(EXPENSE_CATEGORIES.OTHER),
    amount: "",
    expenseDate: "",
    description: "",
  };
}
