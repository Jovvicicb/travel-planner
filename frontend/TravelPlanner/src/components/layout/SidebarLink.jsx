import { NavLink } from "react-router-dom";

export function SidebarLink({ to, label, icon, badge }) {
  const showBadge = Number(badge) > 0;
  const badgeLabel = Number(badge) > 99 ? "99+" : badge;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition-all duration-200",
          isActive
            ? "bg-[#746454] text-[#fffaf3] shadow-md shadow-[#2f2924]/10 ring-1 ring-[#9a8874]"
            : "text-[#eadfD2] hover:bg-[#6a5b4d] hover:text-[#fffaf3]",
        ].join(" ")
      }
    >
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#6a5b4d] text-base ring-1 ring-[#867463] transition group-hover:bg-[#746454]">
        {icon}
      </span>

      <span>{label}</span>

      {showBadge && (
        <span className="ml-auto min-w-6 rounded-full bg-[#7f2f2f] px-2 py-0.5 text-center text-xs font-black text-[#fffaf3] shadow-sm shadow-[#2f2924]/15">
          {badgeLabel}
        </span>
      )}
    </NavLink>
  );
}
