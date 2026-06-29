import { toBudgetSummaryDisplayModel } from "../../../mappers/trips/budget/budgetSummaryDisplayMapper";

function BudgetSummaryItem({ label, value, danger = false }) {
  const valueClassName = [
    "mt-2 text-xl font-black tracking-tight",
    danger ? "text-[#7f2f2f]" : "text-[#2f2924]",
  ].join(" ");

  return (
    <div className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
        {label}
      </p>

      <p className={valueClassName}>{value}</p>
    </div>
  );
}

export function BudgetSummaryCard({ budgetSummary }) {
  const summary = toBudgetSummaryDisplayModel(budgetSummary);

  if (!summary) {
    return null;
  }

  const hasOverBudgetStatus = summary.isOverBudget;

  const statusBadgeClassName = [
    "w-fit rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em]",
    hasOverBudgetStatus
      ? "border-[#7f2f2f]/30 bg-[#7f2f2f]/10 text-[#7f2f2f]"
      : "border-[#746454] bg-[#6f5f48] text-[#fffaf3]",
  ].join(" ");

  return (
    <section className="rounded-2xl border border-[#d6c8b8] bg-[#f8f3ec] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="mb-4 flex flex-col justify-between gap-2 border-b border-[#d6c8b8] pb-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-black tracking-tight text-[#2f2924]">
            Budget overview
          </h3>

          <p className="mt-1 text-xs font-semibold text-[#7b6b5d]">
            Budget summary includes recorded expenses and estimated activity
            costs.
          </p>
        </div>

        <span className={statusBadgeClassName}>{summary.statusLabel}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <BudgetSummaryItem
          label="Planned budget"
          value={summary.plannedBudgetDisplay}
        />

        <BudgetSummaryItem
          label="Total expenses"
          value={summary.totalExpensesDisplay}
          danger={hasOverBudgetStatus}
        />

        <BudgetSummaryItem
          label={hasOverBudgetStatus ? "Over budget by" : "Remaining budget"}
          value={summary.remainingBudgetDisplay}
          danger={hasOverBudgetStatus}
        />
      </div>
    </section>
  );
}
