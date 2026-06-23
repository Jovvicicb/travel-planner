import { useAuth } from "../../hooks/auth/useAuth";
import { SidebarLink } from "./SidebarLink";
import { UserSidebarCard } from "./UserSidebarCard";

export function Sidebar() {
  const { isAdmin } = useAuth();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[#867463] bg-[#5a4d41] px-4 py-5 text-[#f8f3ec] shadow-xl shadow-[#2f2924]/15 lg:flex lg:flex-col">
    <div className="mb-8 px-2">
        <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f8f3ec] text-base font-black text-[#5a4d41] shadow-md shadow-[#2f2924]/15">
            TP
            </div>

            <h2 className="text-base font-black tracking-tight text-[#fffaf3]">
            Travel Planner
            </h2>
        </div>
    </div>

      <nav className="flex flex-1 flex-col gap-1">
        <SidebarLink to="/trips" label="Travel plans" icon="🧭" />
        <SidebarLink to="/reminders" label="Reminders" icon="⏰" />
        <SidebarLink to="/shared" label="Shared access" icon="👥" />

        {isAdmin && (
          <div className="mt-5 border-t border-[#746454] pt-5">
            <p className="mb-2 px-3 text-xs font-black uppercase tracking-[0.18em] text-[#b9aa99]">
              Administration
            </p>

            <SidebarLink to="/admin/users" label="Users" icon="⚙️" />
          </div>
        )}
      </nav>

      <UserSidebarCard />
    </aside>
  );
}