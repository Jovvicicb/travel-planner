import { toAdminUserDisplayModel } from "../../../mappers/admin/users/adminUserDisplayMapper";

const primaryBadgeClassName =
  "rounded-full border border-[#746454] bg-[#6f5f48] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#fffaf3]";

const secondaryBadgeClassName =
  "rounded-full border border-[#cdbca9] bg-[#fffaf3] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]";

function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
        {label}
      </p>

      <p className="mt-1 wrap-break-word text-sm font-black text-[#2f2924]">
        {value}
      </p>
    </div>
  );
}

export function AdminUserProfileCard({ user }) {
  const displayUser = toAdminUserDisplayModel(user);

  return (
    <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <div className="flex flex-col justify-between gap-4 border-b border-[#d6c8b8] pb-5 sm:flex-row sm:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={primaryBadgeClassName}>
              {displayUser.roleLabel}
            </span>

            <span className={secondaryBadgeClassName}>
              {displayUser.statusLabel}
            </span>
          </div>

          <h2 className="wrap-break-word text-2xl font-black tracking-tight text-[#2f2924]">
            {displayUser.fullName}
          </h2>

          <p className="mt-2 wrap-break-word text-sm font-semibold text-[#7b6b5d]">
            {displayUser.email}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoItem label="User id" value={`#${displayUser.id}`} />
        <InfoItem label="Role" value={displayUser.roleLabel} />
        <InfoItem label="Status" value={displayUser.statusLabel} />
        <InfoItem label="Created" value={displayUser.createdAtDisplay} />
      </div>
    </section>
  );
}
