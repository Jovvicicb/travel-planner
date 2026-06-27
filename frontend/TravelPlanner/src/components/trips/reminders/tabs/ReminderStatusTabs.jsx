import { REMINDER_STATUS_TABS } from "../../../../constants/enums/reminderStatuses";

export function ReminderStatusTabs({ activeTab, counts, onChange }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-2 md:grid-cols-3">
      {REMINDER_STATUS_TABS.map((tab) => {
        const active = activeTab === tab.id;
        const count = counts[tab.id] || 0;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={[
              "rounded-xl border px-4 py-3 text-left transition",
              active
                ? "border-[#746454] bg-[#6f5f48] text-[#fffaf3] shadow-sm shadow-[#2f2924]/10"
                : "border-transparent bg-transparent text-[#4b4036] hover:border-[#d6c8b8] hover:bg-[#f8f3ec]",
            ].join(" ")}
          >
            <span className="block text-sm font-black">{tab.label}</span>

            <span
              className={[
                "mt-1 block text-xs font-semibold",
                active ? "text-[#eadfd2]" : "text-[#7b6b5d]",
              ].join(" ")}
            >
              {count} reminder{count === 1 ? "" : "s"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
