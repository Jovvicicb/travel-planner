import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { UpdateDestinationForm } from "../../components/trips/destinations/update/UpdateDestinationForm";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useDestinations } from "../../hooks/trips/destinations/list/useDestinations";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";
import { useUpdateDestination } from "../../hooks/trips/destinations/update/useUpdateDestination";
import { createUpdateDestinationFormModel } from "../../models/trips/destinations/update/updateDestinationFormModel";
import { validateUpdateDestinationForm } from "../../validation/trips/destinations/update/destinationUpdateValidation";

function EditDestinationPageContent({ trip, destination }) {
  const navigate = useNavigate();
  const { updatingDestination, updateDestinationError, updateDestination } =
    useUpdateDestination();

  const [formData, setFormData] = useState(() =>
    createUpdateDestinationFormModel(destination),
  );
  const [errors, setErrors] = useState({});

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

    const validation = validateUpdateDestinationForm(formData, trip);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    await updateDestination(trip.id, destination.id, formData);

    navigate(`/trips/${trip.id}?tab=destinations`);
  }

  function handleCancel() {
    navigate(`/trips/${trip.id}?tab=destinations`);
  }

  return (
    <>
      {updateDestinationError && (
        <div className="mb-5">
          <ErrorBox message={updateDestinationError} />
        </div>
      )}

      <UpdateDestinationForm
        formData={formData}
        errors={errors}
        travelPlan={trip}
        submitting={updatingDestination}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}

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
        backTo={trip ? `/trips/${trip.id}` : "/trips"}
        backLabel={trip ? "Back to trip details" : "Back to travel plans"}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {loading && <LoadingState message="Loading destination..." />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !error && !destination && (
            <ErrorBox message="Destination not found." />
          )}

          {!loading && !error && trip && destination && (
            <EditDestinationPageContent trip={trip} destination={destination} />
          )}
        </div>
      </main>
    </>
  );
}
