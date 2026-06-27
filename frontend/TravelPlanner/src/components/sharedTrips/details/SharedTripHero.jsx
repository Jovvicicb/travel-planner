import { toSharedTripDisplayModel } from "../../../mappers/sharedTrips/details/sharedTripDisplayMapper";

function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-[#2f2924]">{value}</p>
    </div>
  );
}

export function SharedTripHero({ sharedTrip }) {
  const displayTrip = toSharedTripDisplayModel(sharedTrip);

  if (!displayTrip) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <div className="flex flex-col justify-between gap-4 border-b border-[#d6c8b8] pb-5 lg:flex-row lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#746454] bg-[#6f5f48] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#fffaf3]">
              {displayTrip.accessLevelLabel}
            </span>

            <span className="rounded-full border border-[#cdbca9] bg-[#fffaf3] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]">
              Read-only preview
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-[#2f2924]">
            {displayTrip.trip.title}
          </h2>

          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#7b6b5d]">
            {displayTrip.trip.description}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <InfoItem label="Destination" value={displayTrip.trip.destination} />

        <InfoItem label="Dates" value={displayTrip.trip.dateRange} />

        <InfoItem
          label="Planned budget"
          value={displayTrip.trip.budgetDisplay}
        />
      </div>
    </section>
  );
}
