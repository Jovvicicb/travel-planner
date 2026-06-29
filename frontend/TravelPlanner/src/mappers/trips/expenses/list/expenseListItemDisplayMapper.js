import { getExpenseCategoryLabel } from "../../../../constants/enums/expenseCategories";
import {
  formatDisplayDate,
  formatDisplayMoney,
} from "../../../../helpers/display/displayFormatHelper";

export function toExpenseListItemDisplayModel(expense) {
  return {
    id: expense.id,
    travelPlanId: expense.travelPlanId,
    title: expense.title,
    category: expense.category,
    categoryLabel: getExpenseCategoryLabel(expense.category),
    amount: expense.amount,
    amountDisplay: formatDisplayMoney(expense.amount),
    expenseDate: expense.expenseDate,
    dateDisplay: formatDisplayDate(expense.expenseDate),
    description: expense.description || "No description added.",
  };
}
