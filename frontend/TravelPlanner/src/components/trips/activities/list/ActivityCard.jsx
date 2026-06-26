import { ButtonLink } from "../../../ui/ButtonLink";
import { toActivityListItemDisplayModel } from "../../../../mappers/trips/activities/list/activityListItemDisplayMapper";

export function ActivityCard({ activity, tripId }) {
  const displayActivity = toActivityListItemDisplayModel(activity);

  return (
    <article className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-[#2f2924]">
            {displayActivity.title}
          </h3>

          <p className="mt-1 text-sm font-semibold text-[#4b4036]">
            <span className="text-xs font-black uppercase tracking-[0.12em] text-[#9a8b7b]">
              Location:
            </span>{" "}
            {displayActivity.location}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <span className="rounded-full border border-[#cdbca9] bg-[#f8f3ec] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]">
            {displayActivity.statusLabel}
          </span>

          <ButtonLink
            to={`/trips/${tripId}/destinations/${displayActivity.destinationId}/activities/${displayActivity.id}/edit`}
            variant="secondary"
            size="sm"
          >
            Edit
          </ButtonLink>
        </div>
      </div>

      <div className="my-4 h-px bg-[#d6c8b8]" />

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
            Date
          </p>

          <p className="mt-1 text-sm font-black text-[#4b4036]">
            {displayActivity.date}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
            Time
          </p>

          <p className="mt-1 text-sm font-black text-[#4b4036]">
            {displayActivity.timeRange}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
            Estimated cost
          </p>

          <p className="mt-1 text-sm font-black text-[#4b4036]">
            {displayActivity.cost}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#d6c8b8] bg-[#f8f3ec] p-3">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
          Description
        </p>

        <p className="mt-1 line-clamp-3 text-sm font-semibold leading-6 text-[#7b6b5d]">
          {displayActivity.description}
        </p>
      </div>
    </article>
  );
}
