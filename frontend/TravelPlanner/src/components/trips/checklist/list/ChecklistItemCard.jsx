import { Button } from "../../../ui/Button";
import { ButtonLink } from "../../../ui/ButtonLink";
import { toChecklistItemDisplayModel } from "../../../../mappers/trips/checklist/list/checklistItemDisplayMapper";

export function ChecklistItemCard({
  item,
  tripId,
  toggling,
  onToggle,
  onDelete,
}) {
  const displayItem = toChecklistItemDisplayModel(item);

  const completed = displayItem.isCompleted;

  return (
    <article
      className={[
        "rounded-2xl border p-4 shadow-sm transition",
        completed
          ? "border-[#cdbca9] bg-[#f8f3ec] shadow-[#2f2924]/5"
          : "border-[#d6c8b8] bg-[#fffaf3] shadow-[#2f2924]/5",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <label className="flex min-w-0 cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={completed}
            disabled={toggling}
            onChange={() => onToggle(item)}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#6f5f48] disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={[
                  "rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em]",
                  completed
                    ? "border-[#746454] bg-[#6f5f48] text-[#fffaf3]"
                    : "border-[#cdbca9] bg-[#eee6dc] text-[#4b4036]",
                ].join(" ")}
              >
                {displayItem.statusLabel}
              </span>

              <span className="text-xs font-semibold text-[#7b6b5d]">
                Created: {displayItem.createdAtDisplay}
              </span>
            </div>

            <h3
              className={[
                "wrap-break-word text-base font-black tracking-tight",
                completed
                  ? "text-[#7b6b5d] line-through decoration-[#7b6b5d]/60"
                  : "text-[#2f2924]",
              ].join(" ")}
            >
              {displayItem.title}
            </h3>
          </div>
        </label>

        <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
          <ButtonLink
            to={`/trips/${tripId}/checklist/${displayItem.id}/edit`}
            variant="secondary"
            size="sm"
          >
            Edit
          </ButtonLink>

          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onDelete(item)}
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
