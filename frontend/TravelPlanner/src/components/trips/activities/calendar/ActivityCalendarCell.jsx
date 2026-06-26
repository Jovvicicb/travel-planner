import { ActivityCalendarRibbon } from "./ActivityCalendarRibbon";

function getDestinationStayLabel(destinations) {
  if (destinations.length === 0) {
    return "";
  }

  if (destinations.length === 1) {
    return `Stay: ${destinations[0].name}`;
  }

  return `${destinations.length} stays`;
}

export function ActivityCalendarCell({ cell, onSelectActivity }) {
  if (cell.empty) {
    return (
      <div className="min-h-32 border-b border-r border-[#d6c8b8] bg-[#f8f3ec]/60 p-2" />
    );
  }

  const stayLabel = getDestinationStayLabel(cell.destinations);

  return (
    <div
      className={[
        "min-h-32 border-b border-r border-[#d6c8b8] p-2 transition",
        cell.isTripDay ? "bg-[#f8f3ec]" : "bg-[#fffaf3] opacity-55",
      ].join(" ")}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        {cell.isTripDay ? (
          <span className="rounded-full border border-[#d6c8b8] bg-[#fffaf3] px-2 py-0.5 text-[11px] font-black uppercase tracking-widest text-[#7b6b5d]">
            Trip day
          </span>
        ) : (
          <span />
        )}

        <span
          className={[
            "rounded-full px-2 py-0.5 text-xs font-black",
            cell.isTripDay
              ? "bg-[#6f5f48] text-[#fffaf3]"
              : "bg-[#eee6dc] text-[#9a8b7b]",
          ].join(" ")}
        >
          {cell.dayNumber}
        </span>
      </div>

      {stayLabel && (
        <div className="mb-2 truncate rounded-lg border border-[#cdbca9] bg-[#eee6dc] px-2 py-1 text-[11px] font-black text-[#4b4036]">
          {stayLabel}
        </div>
      )}

      <div className="space-y-1">
        {cell.activities.slice(0, 3).map((activity) => (
          <ActivityCalendarRibbon
            key={activity.id}
            activity={activity}
            onSelectActivity={onSelectActivity}
          />
        ))}

        {cell.activities.length > 3 && (
          <p className="text-[11px] font-black text-[#7b6b5d]">
            +{cell.activities.length - 3} more
          </p>
        )}
      </div>
    </div>
  );
}
