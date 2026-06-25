import { useEffect, useState } from "react";
import { useCreateActivity } from "../../../../hooks/trips/activities/create/useCreateActivity";
import { useDestinations } from "../../../../hooks/trips/destinations/list/useDestinations";
import { createActivityFormModel } from "../../../../models/trips/activities/create/createActivityFormModel";
import { validateCreateActivityForm } from "../../../../validation/trips/activities/create/activityCreateValidation";
import { CreateActivityForm } from "../../activities/create/CreateActivityForm";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";

export function TripActivitiesTab({ trip }) {
  const [formData, setFormData] = useState(() => createActivityFormModel());
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { destinations, loadingDestinations, destinationsError } =
    useDestinations(trip.id);

  const { creatingActivity, createActivityError, createActivity } =
    useCreateActivity();

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

    const validation = validateCreateActivityForm(formData, destinations);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdActivity = await createActivity(
      trip.id,
      formData.destinationId,
      formData,
    );

    setFormData(createActivityFormModel());
    setErrors({});
    setSuccessMessage(
      `Activity "${createdActivity.title}" created successfully.`,
    );
  }

  function handleCancel() {
    setFormData(createActivityFormModel());
    setErrors({});
    setSuccessMessage("");
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Activities"
        description="Add activities to destinations in this travel plan. Activity dates must stay inside the selected destination date range."
      />

      {successMessage && (
        <div className="mb-5">
          <SuccessBox message={successMessage} />
        </div>
      )}

      {destinationsError && (
        <div className="mb-5">
          <ErrorBox message={destinationsError} />
        </div>
      )}

      {createActivityError && (
        <div className="mb-5">
          <ErrorBox message={createActivityError} />
        </div>
      )}

      {loadingDestinations && (
        <LoadingState message="Loading destinations..." />
      )}

      {!loadingDestinations &&
        destinations.length === 0 &&
        !destinationsError && (
          <EmptyState
            title="No destinations available"
            description="Add a destination first before creating activities."
          />
        )}

      {!loadingDestinations && destinations.length > 0 && (
        <CreateActivityForm
          formData={formData}
          errors={errors}
          destinations={destinations}
          submitting={creatingActivity}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
