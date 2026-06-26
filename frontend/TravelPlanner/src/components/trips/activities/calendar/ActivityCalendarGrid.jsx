import { WEEK_DAYS } from "../../../../helpers/calendar/calendarDateHelper";
import { ActivityCalendarCell } from "./ActivityCalendarCell";

export function ActivityCalendarGrid({ calendarCells, onSelectActivity }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d6c8b8]">
      <div className="grid grid-cols-7">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="border-b border-r border-[#d6c8b8] bg-[#eee6dc] px-2 py-2 text-center text-xs font-black uppercase tracking-[0.12em] text-[#7b6b5d]"
          >
            {day}
          </div>
        ))}

        {calendarCells.map((cell) => (
          <ActivityCalendarCell
            key={cell.key}
            cell={cell}
            onSelectActivity={onSelectActivity}
          />
        ))}
      </div>
    </div>
  );
}
