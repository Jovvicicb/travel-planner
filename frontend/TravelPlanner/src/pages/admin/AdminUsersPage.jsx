import { AdminUserList } from "../../components/admin/users/AdminUserList";
import { AppHeader } from "../../components/layout/AppHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useAdminUsers } from "../../hooks/admin/users/useAdminUsers";

export function AdminUsersPage() {
  const { users, loadingUsers, usersError } = useAdminUsers();

  return (
    <div className="grid gap-6">
      <AppHeader
        title="User management"
        subtitle="Review registered Travel Planner users in one place."
      />

      <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
        <SectionHeader
          title="Users"
          description="View all registered users with their role, status and account creation date."
        />

        {loadingUsers && <LoadingState message="Loading users..." />}

        {!loadingUsers && usersError && <ErrorBox message={usersError} />}

        {!loadingUsers && !usersError && users.length === 0 && (
          <EmptyState
            title="No users found"
            description="Registered users will appear here."
          />
        )}

        {!loadingUsers && !usersError && users.length > 0 && (
          <div className="grid gap-5">
            <div className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 shadow-sm shadow-[#2f2924]/5">
              <p className="text-sm font-black text-[#2f2924]">
                Total users: {users.length}
              </p>
            </div>

            <AdminUserList users={users} />
          </div>
        )}
      </section>
    </div>
  );
}
