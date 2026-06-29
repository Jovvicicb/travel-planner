import { NavLink } from "react-router-dom";

export function SidebarLink({ to, label, icon, badge }) {
  const badgeValue = Number(badge);
  const showBadge = badgeValue > 0;
  const badgeLabel = badgeValue > 99 ? "99+" : badgeValue;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition-all duration-200",
          isActive
            ? "bg-[#f8f3ec] text-[#4b4036] shadow-md shadow-[#2f2924]/10 ring-1 ring-[#d6c8b8]"
            : "text-[#f4eadf] hover:bg-[#746454] hover:text-[#fffaf3]",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              "grid h-8 w-8 place-items-center rounded-xl text-base ring-1 transition",
              isActive
                ? "bg-[#5a4d41] text-[#fffaf3] ring-[#746454]"
                : "bg-[#5a4d41] text-[#fffaf3] ring-[#867463] group-hover:bg-[#4b4036]",
            ].join(" ")}
          >
            {icon}
          </span>

          <span className="min-w-0 flex-1 truncate">{label}</span>

          {showBadge && (
            <span
              className={[
                "min-w-6 rounded-full px-2 py-0.5 text-center text-xs font-black shadow-sm shadow-[#2f2924]/15",
                isActive
                  ? "bg-[#7f2f2f] text-[#fffaf3]"
                  : "bg-[#f2c7c7] text-[#7f2f2f]",
              ].join(" ")}
            >
              {badgeLabel}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
