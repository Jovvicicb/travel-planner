import { useState } from "react";

import { useSuccessMessage } from "../../../../hooks/common/useSuccessMessage";
import { useCreateDestination } from "../../../../hooks/trips/destinations/create/useCreateDestination";
import { useDeleteDestination } from "../../../../hooks/trips/destinations/delete/useDeleteDestination";
import { useDestinations } from "../../../../hooks/trips/destinations/list/useDestinations";
import { createDestinationFormModel } from "../../../../models/trips/destinations/create/createDestinationFormModel";
import { validateCreateDestinationForm } from "../../../../validation/trips/destinations/create/destinationCreateValidation";
import { DestinationForm } from "../../destinations/form/DestinationForm";
import { DestinationList } from "../../destinations/list/DestinationList";
import { ConfirmDialog } from "../../../ui/ConfirmDialog";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";

export function TripDestinationsTab({ trip }) {
  const [formData, setFormData] = useState(() => createDestinationFormModel());
  const [errors, setErrors] = useState({});
  const [destinationToDelete, setDestinationToDelete] = useState(null);

  const { successMessage, setSuccessMessage, clearSuccessMessage } =
    useSuccessMessage();

  const {
    destinations,
    loadingDestinations,
    destinationsError,
    reloadDestinations,
  } = useDestinations(trip.id);

  const { creatingDestination, createDestinationError, createDestination } =
    useCreateDestination();

  const { deletingDestination, deleteDestinationError, deleteDestination } =
    useDeleteDestination();

  const hasDestinations = destinations.length > 0;

  function resetForm() {
    setFormData(createDestinationFormModel());
    setErrors({});
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

    clearSuccessMessage();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCreateDestinationForm(formData, trip);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdDestination = await createDestination(trip.id, formData);

    if (!createdDestination) {
      return;
    }

    resetForm();

    setSuccessMessage(
      `Destination "${createdDestination.name}" created successfully.`,
    );

    await reloadDestinations();
  }

  function handleCancel() {
    resetForm();
    clearSuccessMessage();
  }

  function handleDeleteClick(destination) {
    setDestinationToDelete(destination);
    clearSuccessMessage();
  }

  function handleCancelDelete() {
    setDestinationToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!destinationToDelete) {
      return;
    }

    const deletedDestination = await deleteDestination(
      trip.id,
      destinationToDelete.id,
    );

    if (!deletedDestination) {
      return;
    }

    const deletedDestinationName = destinationToDelete.name;

    setDestinationToDelete(null);

    setSuccessMessage(
      `Destination "${deletedDestinationName}" deleted successfully.`,
    );

    await reloadDestinations();
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

      {deleteDestinationError && (
        <div className="mb-5">
          <ErrorBox message={deleteDestinationError} />
        </div>
      )}

      <DestinationForm
        formTitle="Add destination"
        formDescription="Dates must stay inside the travel plan range."
        formData={formData}
        errors={errors}
        travelPlan={trip}
        submitting={creatingDestination}
        submitLabel="Add destination"
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

        {!loadingDestinations && !destinationsError && !hasDestinations && (
          <EmptyState
            title="No destinations yet"
            description="Add the first destination to start building this travel plan."
          />
        )}

        {!loadingDestinations && !destinationsError && hasDestinations && (
          <DestinationList
            destinations={destinations}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      <ConfirmDialog
        open={Boolean(destinationToDelete)}
        title="Delete destination?"
        description={
          destinationToDelete
            ? `This action will permanently delete "${destinationToDelete.name}" from this travel plan. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete destination"
        cancelLabel="Cancel"
        confirming={deletingDestination}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
