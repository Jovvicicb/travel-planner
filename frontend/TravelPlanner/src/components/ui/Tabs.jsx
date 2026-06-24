export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="border-b border-[#d6c8b8]">
      <nav className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={[
                "rounded-t-2xl px-5 py-3 text-sm font-black transition",
                isActive
                  ? "bg-[#f8f3ec] text-[#2f2924] shadow-sm"
                  : "text-[#7b6b5d] hover:bg-[#e3d6c8] hover:text-[#2f2924]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
