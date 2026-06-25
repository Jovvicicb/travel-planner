import { useState } from "react";
import { createDestinationFormModel } from "../../../../models/trips/destinations/create/createDestinationFormModel";
import { validateCreateDestinationForm } from "../../../../validation/trips/destinations/create/destinationCreateValidation";
import { useCreateDestination } from "../../../../hooks/trips/destinations/create/useCreateDestination";
import { CreateDestinationForm } from "../../destinations/create/CreateDestinationForm";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";

export function TripDestinationsTab({ trip }) {
  const [formData, setFormData] = useState(() => createDestinationFormModel());
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { creatingDestination, createDestinationError, createDestination } =
    useCreateDestination();

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
        description="Add destinations that belong to this travel plan. Destination dates must stay inside the travel plan date range."
      />

      {successMessage && (
        <div className="mb-5 rounded-2xl border border-[#b8a692] bg-[#fffaf3] px-4 py-3 text-sm font-bold text-[#4b4036]">
          {successMessage}
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
    </div>
  );
}
