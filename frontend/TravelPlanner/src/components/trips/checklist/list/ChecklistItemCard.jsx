import { toChecklistItemDisplayModel } from "../../../../mappers/trips/checklist/list/checklistItemDisplayMapper";

export function ChecklistItemCard({ item }) {
  const displayItem = toChecklistItemDisplayModel(item);

  return (
    <article className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={[
              "text-base font-bold tracking-tight",
              displayItem.isCompleted
                ? "text-[#7b6b5d] line-through"
                : "text-[#2f2924]",
            ].join(" ")}
          >
            {displayItem.title}
          </h3>

          <p className="mt-1 text-xs font-semibold text-[#7b6b5d]">
            Created: {displayItem.createdAtDisplay}
          </p>
        </div>

        <span
          className={[
            "shrink-0 rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em]",
            displayItem.isCompleted
              ? "border-[#746454] bg-[#6f5f48] text-[#fffaf3]"
              : "border-[#cdbca9] bg-[#f8f3ec] text-[#4b4036]",
          ].join(" ")}
        >
          {displayItem.statusLabel}
        </span>
      </div>
    </article>
  );
}
