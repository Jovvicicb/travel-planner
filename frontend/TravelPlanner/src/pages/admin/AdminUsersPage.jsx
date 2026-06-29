import { AdminUserList } from "../../components/admin/users/AdminUserList";
import { AppHeader } from "../../components/layout/AppHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useAdminUsers } from "../../hooks/admin/users/useAdminUsers";

export function AdminUsersPage() {
  const { users, loadingUsers, usersError } = useAdminUsers();

  const hasUsers = users.length > 0;

  return (
    <>
      <AppHeader
        title="User management"
        description="Review registered Travel Planner users in one place."
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="w-full rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          <SectionHeader
            title="Users"
            description="View all registered users with their role, status and account creation date."
          />

          {loadingUsers && <LoadingState message="Loading users..." />}

          {!loadingUsers && usersError && <ErrorBox message={usersError} />}

          {!loadingUsers && !usersError && !hasUsers && (
            <EmptyState
              title="No users found"
              description="Registered users will appear here."
            />
          )}

          {!loadingUsers && !usersError && hasUsers && (
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
      </main>
    </>
  );
}
