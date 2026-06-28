import logo from "../../assets/TravelPlaner_logo.png";
import { useAuth } from "../../hooks/auth/useAuth";
import { useTriggeredReminderCount } from "../../hooks/reminders/count/useTriggeredReminderCount";
import { SidebarLink } from "./SidebarLink";
import { SidebarSection } from "./SidebarSection";
import { UserSidebarCard } from "./UserSidebarCard";

export function Sidebar() {
  const { isAdmin } = useAuth();
  const { triggeredReminderCount } = useTriggeredReminderCount();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 self-start border-r border-[#867463] bg-[#816d5a] p-4 text-[#f8f3ec] shadow-xl shadow-[#2f2924]/15 lg:flex lg:flex-col">
      <div className="rounded-3xl border border-[#746454] bg-[#5a4d41] p-3 shadow-lg shadow-[#2f2924]/15">
        <img
          src={logo}
          alt="Travel Planner"
          className="h-18 w-full object-contain"
        />
      </div>

      <nav className="mt-5 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto rounded-3xl border border-[#867463] bg-[#6a5b4d] p-3 shadow-inner shadow-[#2f2924]/10">
        <SidebarSection title="Workspace">
          <SidebarLink to="/trips" label="Travel plans" icon="🧭" />
          <SidebarLink to="/shared-access" label="Shared access" icon="👥" />

          <SidebarLink
            to="/reminders"
            label="Reminders"
            icon="⏰"
            badge={triggeredReminderCount}
          />
        </SidebarSection>

        {isAdmin && (
          <SidebarSection title="Admin tools" separated>
            <SidebarLink to="/admin/users" label="Users" icon="⚙️" />
          </SidebarSection>
        )}
      </nav>

      <UserSidebarCard />
    </aside>
  );
}
