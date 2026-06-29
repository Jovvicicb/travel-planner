import {
  formatSharedDate,
  formatSharedMoney,
} from "../../../helpers/sharedTrips/sharedTripFormatHelper";
import { EmptyState } from "../../ui/EmptyState";
import { SectionHeader } from "../../ui/SectionHeader";
import { EXPENSE_CATEGORY_LABELS } from "../../../constants/enums/expenseCategories";

export function SharedExpensesSection({ expenses }) {
  const hasExpenses = expenses.length > 0;

  return (
    <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Expenses"
        description="Read-only recorded expenses for this shared travel plan."
      />

      {!hasExpenses && (
        <EmptyState
          title="No expenses"
          description="This shared travel plan does not have recorded expenses yet."
        />
      )}

      {hasExpenses && (
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
                    {formatSharedDate(expense.expenseDate)}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-[#cdbca9] bg-[#f8f3ec] px-3 py-1 text-xs font-black text-[#4b4036]">
                  {formatSharedMoney(expense.amount)}
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
