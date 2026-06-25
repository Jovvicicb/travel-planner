import { toTripDetailsDisplayModel } from "../../../../mappers/trips/details/tripDetailsDisplayMapper";
import { Card } from "../../../ui/Card";
import { SectionHeader } from "../../../ui/SectionHeader";
import { TripInfoItem } from "../TripInfoItem";

export function TripOverviewTab({ trip }) {
  const displayTrip = toTripDetailsDisplayModel(trip);

  return (
    <Card>
      <SectionHeader
        title="Overview"
        description="Review the main information about this travel plan."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TripInfoItem label="Start date" value={displayTrip.startDate} />
        <TripInfoItem label="End date" value={displayTrip.endDate} />
        <TripInfoItem label="Budget" value={displayTrip.budget} />
        <TripInfoItem label="Owner ID" value={`#${displayTrip.ownerUserId}`} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-5">
          <h3 className="text-base font-black text-[#2f2924]">Description</h3>

          <p className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-[#7b6b5d]">
            {displayTrip.description}
          </p>
        </section>

        <section className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-5">
          <h3 className="text-base font-black text-[#2f2924]">Notes</h3>

          <p className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-[#7b6b5d]">
            {displayTrip.notes}
          </p>
        </section>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <TripInfoItem label="Created at" value={displayTrip.createdAt} />
        <TripInfoItem label="Updated at" value={displayTrip.updatedAt} />
      </div>
    </Card>
  );
}
