import { REMINDER_STATUSES } from "../../../../constants/enums/reminderStatuses";
import { toReminderDisplayModel } from "../../../../mappers/reminders/reminderDisplayMapper";
import { Button } from "../../../ui/Button";
import { ButtonLink } from "../../../ui/ButtonLink";

const statusClasses = {
  upcoming: "border-[#746454] bg-[#6f5f48] text-[#fffaf3]",
  triggered: "border-[#b8844c] bg-[#fff1db] text-[#7a4d19]",
  completed: "border-[#8ba888] bg-[#edf7ec] text-[#3f6f3d]",
};

export function ReminderCard({
  reminder,
  completing,
  deleting,
  onComplete,
  onDelete,
}) {
  const displayReminder = toReminderDisplayModel(reminder);

  const canComplete = displayReminder.status === REMINDER_STATUSES.TRIGGERED;
  const canEdit = displayReminder.status !== REMINDER_STATUSES.COMPLETED;

  return (
    <article className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={[
                "rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em]",
                statusClasses[displayReminder.statusTone] ||
                  statusClasses.upcoming,
              ].join(" ")}
            >
              {displayReminder.statusLabel}
            </span>

            <span className="rounded-full border border-[#cdbca9] bg-[#f8f3ec] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]">
              {displayReminder.reminderAtDisplay}
            </span>
          </div>

          <h3 className="wrap-break-word text-base font-black tracking-tight text-[#2f2924]">
            {displayReminder.title}
          </h3>

          {displayReminder.description && (
            <p className="mt-2 wrap-break-word text-sm font-semibold leading-6 text-[#7b6b5d]">
              {displayReminder.description}
            </p>
          )}

          <div className="mt-3 grid gap-1 text-xs font-semibold text-[#9a8b7b]">
            <p>Created: {displayReminder.createdAtDisplay}</p>

            {displayReminder.completedAtDisplay && (
              <p>Completed: {displayReminder.completedAtDisplay}</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
          {canEdit && (
            <ButtonLink
              to={`/trips/${displayReminder.travelPlanId}/reminders/${displayReminder.id}/edit`}
              variant="secondary"
              size="sm"
            >
              Edit
            </ButtonLink>
          )}

          {canComplete && (
            <Button
              type="button"
              size="sm"
              disabled={completing || deleting}
              onClick={() => onComplete(reminder)}
            >
              {completing ? "Completing..." : "Complete"}
            </Button>
          )}

          <Button
            type="button"
            variant="danger"
            size="sm"
            disabled={completing || deleting}
            onClick={() => onDelete(reminder)}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </article>
  );
}
