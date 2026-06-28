import { useAuth } from "../../hooks/auth/useAuth";
import { useTriggeredReminderCount } from "../../hooks/reminders/count/useTriggeredReminderCount";
import { SidebarLink } from "./SidebarLink";
import { UserSidebarCard } from "./UserSidebarCard";

export function Sidebar() {
  const { isAdmin } = useAuth();
  const { triggeredReminderCount } = useTriggeredReminderCount();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 self-start border-r border-[#867463] bg-[#816d5a] p-4 text-[#f8f3ec] shadow-xl shadow-[#2f2924]/15 lg:flex lg:flex-col">
      <div className="rounded-3xl border border-[#746454] bg-[#5a4d41] p-4 shadow-lg shadow-[#2f2924]/15">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f8f3ec] text-base font-black text-[#5a4d41] shadow-md shadow-[#2f2924]/15">
            TP
          </div>

          <div>
            <h2 className="text-base font-black tracking-tight text-[#fffaf3]">
              Travel Planner
            </h2>

            <p className="mt-0.5 text-xs font-semibold text-[#d8cbbb]">
              Plan smarter trips
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-5 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto rounded-3xl border border-[#867463] bg-[#6a5b4d] p-3 shadow-inner shadow-[#2f2924]/10">
        <div>
          <p className="mb-2 px-3 text-xs font-black uppercase tracking-[0.18em] text-[#d8cbbb]">
            Workspace
          </p>

          <div className="grid gap-1">
            <SidebarLink to="/trips" label="Travel plans" icon="🧭" />
            <SidebarLink to="/shared-access" label="Shared access" icon="👥" />

            <SidebarLink
              to="/reminders"
              label="Reminders"
              icon="⏰"
              badge={triggeredReminderCount}
            />
          </div>
        </div>

        {isAdmin && (
          <div className="border-t border-[#867463] pt-5">
            <p className="mb-2 px-3 text-xs font-black uppercase tracking-[0.18em] text-[#d8cbbb]">
              Admin tools
            </p>

            <div className="grid gap-1">
              <SidebarLink to="/admin/users" label="Users" icon="⚙️" />
            </div>
          </div>
        )}
      </nav>

      <UserSidebarCard />
    </aside>
  );
}
