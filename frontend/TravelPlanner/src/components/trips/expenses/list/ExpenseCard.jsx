import { toExpenseListItemDisplayModel } from "../../../../mappers/trips/expenses/list/expenseListItemDisplayMapper";

export function ExpenseCard({ expense }) {
  const displayExpense = toExpenseListItemDisplayModel(expense);

  return (
    <article className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-[#2f2924]">
            {displayExpense.title}
          </h3>

          <p className="mt-1 text-sm font-semibold text-[#4b4036]">
            <span className="text-xs font-black uppercase tracking-[0.12em] text-[#9a8b7b]">
              Category:
            </span>{" "}
            {displayExpense.categoryLabel}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-[#cdbca9] bg-[#f8f3ec] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]">
          {displayExpense.amountDisplay}
        </span>
      </div>

      <div className="my-4 h-px bg-[#d6c8b8]" />

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
            Date
          </p>

          <p className="mt-1 text-sm font-black text-[#4b4036]">
            {displayExpense.dateDisplay}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
            Description
          </p>

          <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#7b6b5d]">
            {displayExpense.description}
          </p>
        </div>
      </div>
    </article>
  );
}
