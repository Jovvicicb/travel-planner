import { useParams } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { EditActivityFormContent } from "../../components/trips/activities/update/EditActivityFormContent";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useActivities } from "../../hooks/trips/activities/list/useActivities";
import { useDestinations } from "../../hooks/trips/destinations/list/useDestinations";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";

export function EditActivityPage() {
  const { tripId, destinationId, activityId } = useParams();

  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  const { destinations, loadingDestinations, destinationsError } =
    useDestinations(tripId);

  const { activities, loadingActivities, activitiesError } = useActivities(
    tripId,
    destinationId,
  );

  const destination = destinations.find(
    (item) => item.id === Number(destinationId),
  );

  const activity = activities.find((item) => item.id === Number(activityId));

  const loading = loadingTrip || loadingDestinations || loadingActivities;
  const error = tripError || destinationsError || activitiesError;

  const backTo = `/trips/${tripId}?tab=activities&destinationId=${destinationId}`;

  return (
    <>
      <AppHeader
        title="Edit activity"
        description={
          activity
            ? `Update activity "${activity.title}".`
            : "Update selected activity."
        }
        backTo={backTo}
        backLabel="Back to activities"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          {loading && <LoadingState message="Loading activity..." />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !error && !destination && (
            <ErrorBox message="Destination not found." />
          )}

          {!loading && !error && destination && !activity && (
            <ErrorBox message="Activity not found." />
          )}

          {!loading && !error && trip && destination && activity && (
            <EditActivityFormContent
              key={activity.id}
              trip={trip}
              destination={destination}
              activity={activity}
            />
          )}
        </section>
      </main>
    </>
  );
}
