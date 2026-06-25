import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { CreateActivityForm } from "../../components/trips/activities/create/CreateActivityForm";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useCreateActivity } from "../../hooks/trips/activities/create/useCreateActivity";
import { useDestinations } from "../../hooks/trips/destinations/list/useDestinations";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";
import { createActivityFormModel } from "../../models/trips/activities/create/createActivityFormModel";
import { validateCreateActivityForm } from "../../validation/trips/activities/create/activityCreateValidation";

export function CreateActivityPage() {
  const { tripId, destinationId } = useParams();
  const navigate = useNavigate();

  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  const { destinations, loadingDestinations, destinationsError } =
    useDestinations(tripId);

  const { creatingActivity, createActivityError, createActivity } =
    useCreateActivity();

  const [formData, setFormData] = useState(() => createActivityFormModel());
  const [errors, setErrors] = useState({});

  const destination = destinations.find(
    (item) => item.id === Number(destinationId),
  );

  const loading = loadingTrip || loadingDestinations;
  const error = tripError || destinationsError;

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

    const validation = validateCreateActivityForm(formData, destination);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    await createActivity(trip.id, destination.id, formData);

    navigate(
      `/trips/${trip.id}?tab=activities&destinationId=${destination.id}`,
    );
  }

  function handleCancel() {
    navigate(`/trips/${trip.id}?tab=destinations`);
  }

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
            <>
              <SectionHeader
                title="Create activity"
                description="Enter activity details. The activity date must stay inside the selected destination date range."
              />

              {createActivityError && (
                <div className="mb-5">
                  <ErrorBox message={createActivityError} />
                </div>
              )}

              <CreateActivityForm
                formData={formData}
                errors={errors}
                destination={destination}
                submitting={creatingActivity}
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
