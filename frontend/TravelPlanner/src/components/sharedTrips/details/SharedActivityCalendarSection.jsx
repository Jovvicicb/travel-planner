import { getActivityStatusLabel } from "../../../constants/enums/activityStatuses";
import {
  formatDisplayDate,
  formatDisplayTime,
} from "../../../helpers/display/displayFormatHelper";
import { EmptyState } from "../../ui/EmptyState";
import { SectionHeader } from "../../ui/SectionHeader";

export function SharedActivityCalendarSection({ activityCalendar }) {
  const hasActivityCalendarDays = activityCalendar.length > 0;

  return (
    <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Activity calendar"
        description="Read-only activities grouped by travel date."
      />

      {!hasActivityCalendarDays && (
        <EmptyState
          title="No activities"
          description="This shared travel plan does not have activities yet."
        />
      )}

      {hasActivityCalendarDays && (
        <div className="grid gap-4">
          {activityCalendar.map((day) => (
            <article
              key={day.date}
              className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4"
            >
              <h3 className="border-b border-[#d6c8b8] pb-3 text-sm font-black text-[#2f2924]">
                {formatDisplayDate(day.date)}
              </h3>

              <div className="mt-4 grid gap-3">
                {day.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] p-3"
                  >
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h4 className="text-sm font-black text-[#2f2924]">
                          {activity.title}
                        </h4>

                        <p className="mt-1 text-xs font-semibold text-[#7b6b5d]">
                          {formatDisplayTime(activity.startTime)} -{" "}
                          {formatDisplayTime(activity.endTime)} ·{" "}
                          {activity.location}
                        </p>
                      </div>

                      <span className="w-fit rounded-full border border-[#cdbca9] bg-[#fffaf3] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]">
                        {getActivityStatusLabel(activity.status)}
                      </span>
                    </div>

                    {activity.description && (
                      <p className="mt-2 line-clamp-2 text-sm font-semibold text-[#7b6b5d]">
                        {activity.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
