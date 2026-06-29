import {
  getNextUserRole,
  getRoleActionLabel,
  toAdminUserDisplayModel,
} from "../../../mappers/admin/users/adminUserDisplayMapper";
import { Button } from "../../ui/Button";

const cardContentClassName =
  "flex flex-col justify-between gap-4 sm:flex-row sm:items-start";

const roleCardClassName =
  "rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5";

const dangerCardClassName =
  "rounded-3xl border border-[#d7a6a6] bg-[#fff5f5] p-5 shadow-sm shadow-[#2f2924]/5";

export function AdminUserActionsCard({
  user,
  updatingRole,
  deletingUser,
  onUpdateRole,
  onDelete,
}) {
  const displayUser = toAdminUserDisplayModel(user);
  const nextRole = getNextUserRole(user);
  const roleActionLabel = getRoleActionLabel(user);

  const actionDisabled = updatingRole || deletingUser;

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <article className={roleCardClassName}>
        <div className={cardContentClassName}>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7b6b5d]">
              Role management
            </p>

            <h2 className="mt-2 text-xl font-black text-[#2f2924]">
              Change user role
            </h2>

            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#7b6b5d]">
              Current role is {displayUser.roleLabel}. Use this action to switch
              the user between standard user and admin access.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              type="button"
              size="sm"
              disabled={actionDisabled}
              onClick={() => onUpdateRole(nextRole)}
            >
              {updatingRole ? "Updating..." : roleActionLabel}
            </Button>
          </div>
        </div>
      </article>

      <article className={dangerCardClassName}>
        <div className={cardContentClassName}>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a4b4b]">
              Danger zone
            </p>

            <h2 className="mt-2 text-xl font-black text-[#6f2929]">
              Delete user
            </h2>

            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#8a5a5a]">
              This removes the user account. Travel plans owned by this user are
              deleted during the admin cleanup process.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              type="button"
              variant="danger"
              size="sm"
              disabled={actionDisabled}
              onClick={onDelete}
            >
              {deletingUser ? "Deleting..." : "Delete user"}
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}
