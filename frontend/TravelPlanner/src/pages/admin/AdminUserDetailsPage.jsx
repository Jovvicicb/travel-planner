import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminUserActionsCard } from "../../components/admin/users/AdminUserActionsCard";
import { AdminUserProfileCard } from "../../components/admin/users/AdminUserProfileCard";
import { AppHeader } from "../../components/layout/AppHeader";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SuccessBox } from "../../components/ui/SuccessBox";
import { useAdminUser } from "../../hooks/admin/users/useAdminUser";
import { useDeleteAdminUser } from "../../hooks/admin/users/useDeleteAdminUser";
import { useUpdateAdminUserRole } from "../../hooks/admin/users/useUpdateAdminUserRole";

export function AdminUserDetailsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { user, loadingUser, userError, reloadUser } = useAdminUser(userId);

  const { updatingRole, updateRoleError, updateUserRole } =
    useUpdateAdminUserRole();

  const { deletingUser, deleteUserError, deleteUser } = useDeleteAdminUser();

  async function handleUpdateRole(nextRole) {
    if (!user) {
      return;
    }

    const updatedUser = await updateUserRole(user.id, nextRole);

    if (!updatedUser) {
      return;
    }

    setSuccessMessage("User role updated successfully.");

    await reloadUser();
  }

  function handleOpenDeleteDialog() {
    setDeleteDialogOpen(true);
    setSuccessMessage("");
  }

  function handleCancelDelete() {
    setDeleteDialogOpen(false);
  }

  async function handleConfirmDelete() {
    if (!user) {
      return;
    }

    await deleteUser(user.id);

    setDeleteDialogOpen(false);

    navigate("/admin/users", {
      replace: true,
    });
  }

  return (
    <>
      <AppHeader
        title="User profile"
        description="Review selected user account details and manage account access."
        backTo="/admin/users"
        backLabel="Back to users"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="grid w-full gap-6">
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
            <>
              {successMessage && <SuccessBox message={successMessage} />}

              {updateRoleError && <ErrorBox message={updateRoleError} />}

              {deleteUserError && <ErrorBox message={deleteUserError} />}

              <AdminUserProfileCard user={user} />

              <AdminUserActionsCard
                user={user}
                updatingRole={updatingRole}
                deletingUser={deletingUser}
                onUpdateRole={handleUpdateRole}
                onDelete={handleOpenDeleteDialog}
              />
            </>
          )}
        </section>
      </main>

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete user?"
        description={
          user
            ? `This will delete ${user.fullName || "this user"} and all travel plans owned by this account.`
            : ""
        }
        confirmLabel="Delete user"
        cancelLabel="Cancel"
        confirming={deletingUser}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
