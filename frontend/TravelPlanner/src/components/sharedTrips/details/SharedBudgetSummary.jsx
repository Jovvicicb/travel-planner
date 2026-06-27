import { toSharedTripDisplayModel } from "../../../mappers/sharedTrips/details/sharedTripDisplayMapper";

function BudgetItem({ label, value, danger = false }) {
  return (
    <div className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
        {label}
      </p>

      <p
        className={[
          "mt-2 text-xl font-black tracking-tight",
          danger ? "text-[#7f2f2f]" : "text-[#2f2924]",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

export function SharedBudgetSummary({ sharedTrip }) {
  const displayTrip = toSharedTripDisplayModel(sharedTrip);

  if (!displayTrip?.budget) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <div className="mb-4 flex flex-col justify-between gap-2 border-b border-[#d6c8b8] pb-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-black text-[#2f2924]">Budget summary</h2>

          <p className="mt-1 text-xs font-semibold text-[#7b6b5d]">
            Backend-calculated budget state for this shared travel plan.
          </p>
        </div>

        <span
          className={[
            "w-fit rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em]",
            displayTrip.budget.isOverBudget
              ? "border-[#7f2f2f]/30 bg-[#7f2f2f]/10 text-[#7f2f2f]"
              : "border-[#746454] bg-[#6f5f48] text-[#fffaf3]",
          ].join(" ")}
        >
          {displayTrip.budget.statusLabel}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <BudgetItem
          label="Planned budget"
          value={displayTrip.budget.plannedBudgetDisplay}
        />

        <BudgetItem
          label="Total expenses"
          value={displayTrip.budget.totalExpensesDisplay}
          danger={displayTrip.budget.isOverBudget}
        />

        <BudgetItem
          label={
            displayTrip.budget.isOverBudget
              ? "Over budget by"
              : "Remaining budget"
          }
          value={displayTrip.budget.remainingBudgetDisplay}
          danger={displayTrip.budget.isOverBudget}
        />
      </div>
    </section>
  );
}
