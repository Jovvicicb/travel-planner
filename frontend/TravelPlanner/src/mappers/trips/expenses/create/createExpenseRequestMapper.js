import { toStartOfDayRequestValue } from "../../../../helpers/forms/dateTimeInputHelper";

export function toCreateExpenseRequest(data) {
  const description = data.description?.trim();

  return {
    title: data.title.trim(),
    category: Number(data.category),
    amount: Number(data.amount),
    expenseDate: toStartOfDayRequestValue(data.expenseDate),
    description: description || null,
  };
}
