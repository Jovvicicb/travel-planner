import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { UpdateActivityForm } from "../../components/trips/activities/update/UpdateActivityForm";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useActivities } from "../../hooks/trips/activities/list/useActivities";
import { useUpdateActivity } from "../../hooks/trips/activities/update/useUpdateActivity";
import { useDestinations } from "../../hooks/trips/destinations/list/useDestinations";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";
import { createUpdateActivityFormModel } from "../../models/trips/activities/update/updateActivityFormModel";
import { validateUpdateActivityForm } from "../../validation/trips/activities/update/activityUpdateValidation";

export function EditActivityPage() {
  const { tripId, destinationId, activityId } = useParams();
  const navigate = useNavigate();

  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  const { destinations, loadingDestinations, destinationsError } =
    useDestinations(tripId);

  const { activities, loadingActivities, activitiesError } = useActivities(
    tripId,
    destinationId,
  );

  const { updatingActivity, updateActivityError, updateActivity } =
    useUpdateActivity();

  const destination = destinations.find(
    (item) => item.id === Number(destinationId),
  );

  const activity = activities.find((item) => item.id === Number(activityId));

  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  const loading = loadingTrip || loadingDestinations || loadingActivities;
  const error = tripError || destinationsError || activitiesError;

  if (!formData && activity) {
    setFormData(createUpdateActivityFormModel(activity));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateUpdateActivityForm(formData, destination);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    await updateActivity(trip.id, destination.id, activity.id, formData);

    navigate(
      `/trips/${trip.id}?tab=activities&destinationId=${destination.id}`,
    );
  }

  function handleCancel() {
    navigate(`/trips/${tripId}?tab=activities&destinationId=${destinationId}`);
  }

  return (
    <>
      <AppHeader
        title="Edit activity"
        description={
          activity
            ? `Update activity "${activity.title}".`
            : "Update selected activity."
        }
        backTo={`/trips/${tripId}?tab=activities&destinationId=${destinationId}`}
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

          {!loading &&
            !error &&
            trip &&
            destination &&
            activity &&
            formData && (
              <>
                <SectionHeader
                  title="Update activity"
                  description="Change activity details. Activity date must stay inside the selected destination date range."
                />

                {updateActivityError && (
                  <div className="mb-5">
                    <ErrorBox message={updateActivityError} />
                  </div>
                )}

                <UpdateActivityForm
                  formData={formData}
                  errors={errors}
                  destination={destination}
                  submitting={updatingActivity}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              </>
            )}
        </section>
      </main>
    </>
  );
}
