import { ExpenseCard } from "./ExpenseCard";

export function ExpenseList({ expenses, tripId }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} tripId={tripId} />
      ))}
    </div>
  );
}
