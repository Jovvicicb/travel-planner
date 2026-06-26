export function ActivityCalendarRibbon({ activity, onSelectActivity }) {
  return (
    <button
      type="button"
      onClick={() => onSelectActivity(activity)}
      title={`${activity.title}`}
      className="block w-full truncate rounded-lg border border-[#cdbca9] bg-[#6f5f48] px-2 py-1 text-left text-[11px] font-black text-[#fffaf3] shadow-sm shadow-[#2f2924]/10 transition hover:border-[#4b4036] hover:bg-[#5a4d41]"
    >
      {activity.title}
    </button>
  );
}
