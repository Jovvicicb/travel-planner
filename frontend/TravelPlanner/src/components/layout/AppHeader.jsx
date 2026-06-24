import { Link } from "react-router-dom";

export function AppHeader({
  title,
  description,
  action,
  backTo,
  backLabel = "Back",
}) {
  return (
    <header className="border-b border-[#d6c8b8] bg-[#f8f3ec] px-6 py-5 shadow-sm shadow-[#2f2924]/5 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7b6b5d]">
            Travel Planner
          </p>

          <h1 className="mt-1 text-3xl font-black tracking-tight text-[#2f2924]">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#7b6b5d]">
              {description}
            </p>
          )}
        </div>

        {(backTo || action) && (
          <div className="flex shrink-0 items-center gap-3">
            {backTo && (
              <Link
                to={backTo}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#d6c8b8] bg-[#f8f3ec] px-5 py-3 text-sm font-black text-[#4b4036] transition hover:bg-[#eee6dc]"
              >
                <span aria-hidden="true">←</span>
                {backLabel}
              </Link>
            )}

            {action}
          </div>
        )}
      </div>
    </header>
  );
}