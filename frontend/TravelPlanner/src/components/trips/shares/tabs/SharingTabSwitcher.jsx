const SHARING_TABS = [
  {
    id: "links",
    label: "Share links",
  },
  {
    id: "collaborators",
    label: "Collaborators",
  },
];

export function SharingTabSwitcher({ activeTab, onChange }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-2 sm:grid-cols-2">
      {SHARING_TABS.map((tab) => {
        const active = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={[
              "rounded-xl border px-4 py-3 text-sm font-black transition",
              active
                ? "border-[#746454] bg-[#6f5f48] text-[#fffaf3] shadow-sm shadow-[#2f2924]/10"
                : "border-transparent bg-transparent text-[#4b4036] hover:border-[#d6c8b8] hover:bg-[#f8f3ec]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
