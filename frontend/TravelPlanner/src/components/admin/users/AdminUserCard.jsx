import { toAdminUserDisplayModel } from "../../../mappers/admin/users/adminUserDisplayMapper";
import { ButtonLink } from "../../ui/ButtonLink";

const primaryBadgeClassName =
  "rounded-full border border-[#746454] bg-[#6f5f48] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#fffaf3]";

const secondaryBadgeClassName =
  "rounded-full border border-[#cdbca9] bg-[#f8f3ec] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]";

export function AdminUserCard({ user }) {
  const displayUser = toAdminUserDisplayModel(user);

  return (
    <article className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={primaryBadgeClassName}>
              {displayUser.roleLabel}
            </span>

            <span className={secondaryBadgeClassName}>
              {displayUser.statusLabel}
            </span>

            <span className={secondaryBadgeClassName}>
              User #{displayUser.id}
            </span>
          </div>

          <h3 className="wrap-break-word text-base font-black tracking-tight text-[#2f2924]">
            {displayUser.fullName}
          </h3>

          <p className="mt-1 wrap-break-word text-sm font-semibold text-[#7b6b5d]">
            {displayUser.email}
          </p>

          <p className="mt-3 text-xs font-semibold text-[#9a8b7b]">
            Created: {displayUser.createdAtDisplay}
          </p>
        </div>

        <div className="shrink-0">
          <ButtonLink
            to={`/admin/users/${displayUser.id}`}
            size="sm"
            variant="primary"
          >
            Open profile
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
