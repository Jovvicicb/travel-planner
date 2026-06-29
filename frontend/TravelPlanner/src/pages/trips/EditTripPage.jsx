import { useParams } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { EditTripFormContent } from "../../components/trips/update/EditTripFormContent";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";

export function EditTripPage() {
  const { tripId } = useParams();
  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  return (
    <>
      <AppHeader
        title={trip ? `Edit ${trip.title}` : "Edit travel plan"}
        description="Update the main information for this travel plan."
        backTo={trip ? `/trips/${trip.id}` : "/trips"}
        backLabel={trip ? "Back to details" : "Back to travel plans"}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {loadingTrip && <LoadingState message="Loading travel plan..." />}

          {!loadingTrip && tripError && <ErrorBox message={tripError} />}

          {!loadingTrip && !tripError && trip && (
            <EditTripFormContent key={trip.id} trip={trip} />
          )}
        </div>
      </main>
    </>
  );
}
