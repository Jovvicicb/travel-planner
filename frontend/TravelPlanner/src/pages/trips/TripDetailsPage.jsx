import { useParams } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { TripDetailsTabs } from "../../components/trips/details/tabs/TripDetailsTabs";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  return (
    <>
      <AppHeader
        title={trip?.title || "Travel plan details"}
        description={
          trip
            ? "View and organize all information related to this travel plan."
            : "Loading travel plan information."
        }
        backTo="/trips"
        backLabel="Back to travel plans"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        {loadingTrip && <LoadingState message="Loading travel plan..." />}

        {!loadingTrip && tripError && <ErrorBox message={tripError} />}

        {!loadingTrip && !tripError && trip && <TripDetailsTabs trip={trip} />}
      </main>
    </>
  );
}
