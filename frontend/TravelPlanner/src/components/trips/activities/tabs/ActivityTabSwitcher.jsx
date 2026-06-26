const ACTIVITY_VIEW_TABS = [
  {
    id: "list",
    label: "Activities by destination",
  },
  {
    id: "calendar",
    label: "Calendar view",
  },
];

export function ActivityTabSwitcher({ activeView, onChange }) {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2">
      {ACTIVITY_VIEW_TABS.map((tab) => {
        const active = activeView === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={[
              "rounded-2xl border px-4 py-3 text-sm font-black transition",
              active
                ? "border-[#746454] bg-[#6f5f48] text-[#fffaf3] shadow-sm shadow-[#2f2924]/15"
                : "border-[#d6c8b8] bg-[#fffaf3] text-[#4b4036] hover:border-[#746454] hover:bg-[#f8f3ec]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
