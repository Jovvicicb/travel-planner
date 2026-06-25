import { toDestinationListItemDisplayModel } from "../../../../mappers/trips/destinations/list/destinationListItemDisplayMapper";

export function DestinationCard({ destination, action }) {
  const displayDestination = toDestinationListItemDisplayModel(destination);

  return (
    <article className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-[#2f2924]">
            {displayDestination.name}
          </h3>

          <p className="mt-1 text-sm font-semibold text-[#4b4036]">
            <span className="text-xs font-black uppercase tracking-[0.12em] text-[#9a8b7b]">
              Location:
            </span>{" "}
            {displayDestination.location}
          </p>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="my-4 h-px bg-[#d6c8b8]" />

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
            Dates
          </p>

          <p className="mt-1 text-sm font-black text-[#4b4036]">
            {displayDestination.dateRange}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
            Notes
          </p>

          <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#7b6b5d]">
            {displayDestination.notes}
          </p>
        </div>
      </div>
    </article>
  );
}
