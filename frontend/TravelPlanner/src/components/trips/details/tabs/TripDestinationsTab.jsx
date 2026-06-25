import { useEffect, useState } from "react";
import { useCreateDestination } from "../../../../hooks/trips/destinations/create/useCreateDestination";
import { useDestinations } from "../../../../hooks/trips/destinations/list/useDestinations";
import { createDestinationFormModel } from "../../../../models/trips/destinations/create/createDestinationFormModel";
import { validateCreateDestinationForm } from "../../../../validation/trips/destinations/create/destinationCreateValidation";
import { CreateDestinationForm } from "../../destinations/create/CreateDestinationForm";
import { DestinationList } from "../../destinations/list/DestinationList";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";

export function TripDestinationsTab({ trip }) {
  const [formData, setFormData] = useState(() => createDestinationFormModel());
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const {
    destinations,
    loadingDestinations,
    destinationsError,
    reloadDestinations,
  } = useDestinations(trip.id);

  const { creatingDestination, createDestinationError, createDestination } =
    useCreateDestination();

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage]);

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

    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCreateDestinationForm(formData, trip);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdDestination = await createDestination(trip.id, formData);

    setFormData(createDestinationFormModel());
    setErrors({});
    setSuccessMessage(
      `Destination "${createdDestination.name}" created successfully.`,
    );

    await reloadDestinations();
  }

  function handleCancel() {
    setFormData(createDestinationFormModel());
    setErrors({});
    setSuccessMessage("");
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Destinations"
        description="Add and review destinations that belong to this travel plan. Destination dates must stay inside the travel plan date range."
      />

      {successMessage && (
        <div className="mb-5">
          <SuccessBox message={successMessage} />
        </div>
      )}

      {createDestinationError && (
        <div className="mb-5">
          <ErrorBox message={createDestinationError} />
        </div>
      )}

      <CreateDestinationForm
        formData={formData}
        errors={errors}
        travelPlan={trip}
        submitting={creatingDestination}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <div className="mt-6 border-t-2 border-[#b8a692] pt-5">
        <SectionHeader
          title="Destination list"
          description="Review all destinations currently planned for this trip."
        />

        {loadingDestinations && (
          <LoadingState message="Loading destinations..." />
        )}

        {!loadingDestinations && destinationsError && (
          <ErrorBox message={destinationsError} />
        )}

        {!loadingDestinations &&
          !destinationsError &&
          destinations.length === 0 && (
            <EmptyState
              title="No destinations yet"
              description="Add the first destination to start building this travel plan."
            />
          )}

        {!loadingDestinations &&
          !destinationsError &&
          destinations.length > 0 && (
            <DestinationList destinations={destinations} />
          )}
      </div>
    </div>
  );
}
