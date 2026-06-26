export function toCreateExpenseRequest(data) {
  return {
    title: data.title.trim(),
    category: Number(data.category),
    amount: Number(data.amount),
    expenseDate: `${data.expenseDate}T00:00:00`,
    description: data.description.trim() || null,
  };
}
