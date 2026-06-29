import { ButtonLink } from "../../ui/ButtonLink";
import { EmptyState } from "../../ui/EmptyState";
import { ErrorBox } from "../../ui/ErrorBox";
import { LoadingState } from "../../ui/LoadingState";
import { SectionHeader } from "../../ui/SectionHeader";
import { TripList } from "./TripList";

export function TravelPlansSection({ trips, loadingTrips, tripsError }) {
  return (
    <section className="rounded-b-3xl rounded-tr-3xl border border-t-0 border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Plans"
        description="Browse all travel plans you own or can edit as a collaborator."
      />

      {loadingTrips && <LoadingState message="Loading travel plans..." />}

      {!loadingTrips && tripsError && <ErrorBox message={tripsError} />}

      {!loadingTrips && !tripsError && trips.length === 0 && (
        <EmptyState
          title="No travel plans yet"
          description="Create your first travel plan and start organizing your destinations, activities and budget."
          action={
            <ButtonLink to="/trips/create">Create travel plan</ButtonLink>
          }
        />
      )}

      {!loadingTrips && !tripsError && trips.length > 0 && (
        <TripList trips={trips} />
      )}
    </section>
  );
}
