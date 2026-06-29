import { useParams } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { EditDestinationFormContent } from "../../components/trips/destinations/update/EditDestinationFormContent";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useDestinations } from "../../hooks/trips/destinations/list/useDestinations";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";

export function EditDestinationPage() {
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
        title={destination ? `Edit ${destination.name}` : "Edit destination"}
        description="Update the selected destination information for this travel plan."
        backTo={trip ? `/trips/${trip.id}?tab=destinations` : "/trips"}
        backLabel={trip ? "Back to destinations" : "Back to travel plans"}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {loading && <LoadingState message="Loading destination..." />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !error && !destination && (
            <ErrorBox message="Destination not found." />
          )}

          {!loading && !error && trip && destination && (
            <EditDestinationFormContent
              key={destination.id}
              trip={trip}
              destination={destination}
            />
          )}
        </div>
      </main>
    </>
  );
}
