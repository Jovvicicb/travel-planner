import { Link } from "react-router-dom";
import { Card } from "../../ui/Card";
import { toTripListItemDisplayModel } from "../../../mappers/trips/list/tripListItemDisplayMapper";

export function TripCard({ trip }) {
  const displayTrip = toTripListItemDisplayModel(trip);

  return (
    <Link to={`/trips/${displayTrip.id}`} className="group block h-full">
      <Card className="h-full cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:border-[#b8a692] hover:shadow-md hover:shadow-[#2f2924]/10">
        <article className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="line-clamp-2 text-xl font-bold tracking-tight text-[#2f2924] transition group-hover:text-[#4b4036]">
                {displayTrip.title}
              </h2>

              <span className="shrink-0 rounded-full bg-[#e3d6c8] px-3 py-1 text-xs font-black text-[#6f5f48] ring-1 ring-[#cdbca9]">
                #{displayTrip.id}
              </span>
            </div>

            <div className="my-5 h-0.75 rounded-full bg-[#cdbca9]" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
                  Dates
                </p>
                <p className="mt-1 text-sm font-black text-[#4b4036]">
                  {displayTrip.dateRange}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
                  Budget
                </p>
                <p className="mt-1 text-sm font-black text-[#4b4036]">
                  {displayTrip.budget}
                </p>
              </div>
            </div>

            <div className="my-5 h-px bg-[#d6c8b8]" />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#7b6b5d]">
              View travel plan details
            </p>

            <span className="text-2xl font-light text-[#6f5f48] transition group-hover:translate-x-1 group-hover:text-[#4b4036]">
              →
            </span>
          </div>
        </article>
      </Card>
    </Link>
  );
}
