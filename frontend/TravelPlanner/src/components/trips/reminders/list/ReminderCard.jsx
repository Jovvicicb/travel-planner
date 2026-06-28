import { useNavigate } from "react-router-dom";
import { REMINDER_STATUSES } from "../../../../constants/enums/reminderStatuses";
import { toReminderDisplayModel } from "../../../../mappers/reminders/reminderDisplayMapper";
import { Card } from "../../../ui/Card";
import { Button } from "../../../ui/Button";
import { ButtonLink } from "../../../ui/ButtonLink";

const statusClasses = {
  upcoming: "bg-[#e3d6c8] text-[#6f5f48] ring-[#cdbca9]",
  triggered: "bg-[#fff1db] text-[#7a4d19] ring-[#d7a86e]",
  completed: "bg-[#edf7ec] text-[#3f6f3d] ring-[#a9c7a6]",
};

export function ReminderCard({
  reminder,
  completing,
  deleting,
  onComplete,
  onDelete,
}) {
  const navigate = useNavigate();
  const displayReminder = toReminderDisplayModel(reminder);

  const canComplete = displayReminder.status === REMINDER_STATUSES.TRIGGERED;
  const canEdit = displayReminder.status !== REMINDER_STATUSES.COMPLETED;

  function handleOpenPlan() {
    navigate(`/trips/${displayReminder.travelPlanId}?tab=reminders`);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenPlan();
    }
  }

  function stopCardClick(event) {
    event.stopPropagation();
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpenPlan}
      onKeyDown={handleKeyDown}
      className="group block h-full"
    >
      <Card className="h-full cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:border-[#b8a692] hover:shadow-md hover:shadow-[#2f2924]/10">
        <article className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
                    Name
                  </p>

                  <h2 className="mt-1 line-clamp-2 text-xl font-bold tracking-tight text-[#2f2924] transition group-hover:text-[#4b4036]">
                    {displayReminder.title}
                  </h2>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
                    Description
                  </p>

                  {displayReminder.description ? (
                    <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-[#7b6b5d]">
                      {displayReminder.description}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm font-semibold italic text-[#9a8b7b]">
                      No description added.
                    </p>
                  )}
                </div>
              </div>

              <span
                className={[
                  "shrink-0 rounded-full px-3 py-1 text-xs font-black ring-1",
                  statusClasses[displayReminder.statusTone] ||
                    statusClasses.upcoming,
                ].join(" ")}
              >
                {displayReminder.statusLabel}
              </span>
            </div>

            <div className="my-5 h-0.75 rounded-full bg-[#cdbca9]" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
                  Reminder time
                </p>

                <p className="mt-1 text-sm font-black text-[#4b4036]">
                  {displayReminder.reminderAtDisplay}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
                  Travel plan
                </p>

                <p className="mt-1 text-sm font-black text-[#4b4036]">
                  #{displayReminder.travelPlanId}
                </p>
              </div>
            </div>

            <div className="my-5 h-px bg-[#d6c8b8]" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold text-[#7b6b5d]">
              Open travel plan reminders
            </p>

            <div
              onClick={stopCardClick}
              className="flex flex-wrap gap-2 sm:justify-end"
            >
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
      </Card>
    </div>
  );
}
