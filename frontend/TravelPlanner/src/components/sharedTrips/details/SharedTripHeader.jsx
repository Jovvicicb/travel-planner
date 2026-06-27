import { ButtonLink } from "../../ui/ButtonLink";

export function SharedTripHeader() {
  return (
    <header className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex w-fit items-center gap-2 rounded-full border border-[#746454] bg-[#6f5f48] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#fffaf3]">
            Shared travel plan
          </div>

          <h1 className="text-2xl font-black tracking-tight text-[#2f2924]">
            Travel plan preview
          </h1>

          <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-[#7b6b5d]">
            You are viewing a shared read-only travel plan. Open the sections
            below to review destinations, activities, expenses, budget and
            checklist items.
          </p>
        </div>

        <ButtonLink to="/login" variant="secondary" size="sm">
          Sign in
        </ButtonLink>
      </div>
    </header>
  );
}
