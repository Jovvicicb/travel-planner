import { useParams } from "react-router-dom";
import { AdminUserProfileCard } from "../../components/admin/users/AdminUserProfileCard";
import { AppHeader } from "../../components/layout/AppHeader";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useAdminUser } from "../../hooks/admin/users/useAdminUser";

export function AdminUserDetailsPage() {
  const { userId } = useParams();

  const { user, loadingUser, userError } = useAdminUser(userId);

  return (
    <>
      <AppHeader
        title="User profile"
        description="Review selected user account details."
        backTo="/admin/users"
        backLabel="Back to users"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="w-full">
          {loadingUser && (
            <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
              <LoadingState message="Loading user profile..." />
            </div>
          )}

          {!loadingUser && userError && (
            <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
              <ErrorBox message={userError} />
            </div>
          )}

          {!loadingUser && !userError && user && (
            <AdminUserProfileCard user={user} />
          )}
        </section>
      </main>
    </>
  );
}
