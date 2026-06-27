import { EmptyState } from "../../ui/EmptyState";
import { SectionHeader } from "../../ui/SectionHeader";

const EXPENSE_CATEGORY_LABELS = {
  0: "Transport",
  1: "Accommodation",
  2: "Food",
  3: "Tickets",
  4: "Shopping",
  5: "Other",
};

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function SharedExpensesSection({ expenses }) {
  return (
    <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Expenses"
        description="Read-only recorded expenses for this shared travel plan."
      />

      {expenses.length === 0 && (
        <EmptyState
          title="No expenses"
          description="This shared travel plan does not have recorded expenses yet."
        />
      )}

      {expenses.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {expenses.map((expense) => (
            <article
              key={expense.id}
              className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-[#2f2924]">
                    {expense.title}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-[#7b6b5d]">
                    {EXPENSE_CATEGORY_LABELS[expense.category] || "Unknown"} ·{" "}
                    {formatDate(expense.expenseDate)}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-[#cdbca9] bg-[#f8f3ec] px-3 py-1 text-xs font-black text-[#4b4036]">
                  {formatMoney(expense.amount)}
                </span>
              </div>

              <p className="mt-3 line-clamp-2 text-sm font-semibold text-[#7b6b5d]">
                {expense.description || "No description added."}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
