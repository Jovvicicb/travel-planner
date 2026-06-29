import { useParams } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { CreateActivityFormContent } from "../../components/trips/activities/create/CreateActivityFormContent";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useDestinations } from "../../hooks/trips/destinations/list/useDestinations";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";

export function CreateActivityPage() {
  const { tripId, destinationId } = useParams();

  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  const { destinations, loadingDestinations, destinationsError } =
    useDestinations(tripId);

  const destination = destinations.find(
    (item) => item.id === Number(destinationId),
  );

  const loading = loadingTrip || loadingDestinations;
  const error = tripError || destinationsError;

  return (
    <>
      <AppHeader
        title="Add activity"
        description="Create a new activity for the selected destination."
        backTo={trip ? `/trips/${trip.id}?tab=destinations` : "/trips"}
        backLabel={trip ? "Back to destinations" : "Back to travel plans"}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          {loading && <LoadingState message="Loading destination..." />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !error && !destination && (
            <ErrorBox message="Destination not found." />
          )}

          {!loading && !error && trip && destination && (
            <CreateActivityFormContent
              key={destination.id}
              trip={trip}
              destination={destination}
            />
          )}
        </section>
      </main>
    </>
  );
}
