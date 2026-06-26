import { useMemo, useState } from "react";
import {
  buildActivitiesByDate,
  buildCalendarCells,
  formatMonthTitle,
  getInitialCalendarMonth,
} from "../../../../helpers/calendar/calendarDateHelper";
import { Button } from "../../../ui/Button";
import { ActivityCalendarGrid } from "./ActivityCalendarGrid";

export function ActivityCalendarMonthView({
  trip,
  destinations,
  calendarDays,
  onSelectActivity,
}) {
  const [currentMonth, setCurrentMonth] = useState(() =>
    getInitialCalendarMonth(trip, calendarDays),
  );

  const activitiesByDate = useMemo(
    () => buildActivitiesByDate(calendarDays),
    [calendarDays],
  );

  const calendarCells = useMemo(
    () =>
      buildCalendarCells({
        currentMonth,
        activitiesByDate,
        trip,
        destinations,
      }),
    [currentMonth, activitiesByDate, trip, destinations],
  );

  function handlePreviousMonth() {
    setCurrentMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  }

  function handleNextMonth() {
    setCurrentMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  }

  function handleCurrentTripMonth() {
    setCurrentMonth(getInitialCalendarMonth(trip, calendarDays));
  }

  return (
    <div className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="mb-4 flex flex-col justify-between gap-3 border-b border-[#d6c8b8] pb-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-black tracking-tight text-[#2f2924]">
            {formatMonthTitle(currentMonth)}
          </h3>

          <p className="mt-1 text-xs font-semibold text-[#7b6b5d]">
            Trip days are highlighted. Destination stays are shown inside each
            day, and activities appear as clickable ribbons.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handlePreviousMonth}
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCurrentTripMonth}
          >
            Trip month
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleNextMonth}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.12em]">
        <span className="rounded-full border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-1 text-[#7b6b5d]">
          Trip day
        </span>

        <span className="rounded-full border border-[#cdbca9] bg-[#eee6dc] px-3 py-1 text-[#4b4036]">
          Destination stay
        </span>

        <span className="rounded-full border border-[#746454] bg-[#6f5f48] px-3 py-1 text-[#fffaf3]">
          Activity
        </span>
      </div>

      <ActivityCalendarGrid
        calendarCells={calendarCells}
        onSelectActivity={onSelectActivity}
      />
    </div>
  );
}
