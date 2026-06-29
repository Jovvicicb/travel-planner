import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateActivity } from "../../../../hooks/trips/activities/create/useCreateActivity";
import { createActivityFormModel } from "../../../../models/trips/activities/create/createActivityFormModel";
import { validateCreateActivityForm } from "../../../../validation/trips/activities/create/activityCreateValidation";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { ActivityForm } from "../form/ActivityForm";

export function CreateActivityFormContent({ trip, destination }) {
  const navigate = useNavigate();

  const { creatingActivity, createActivityError, createActivity } =
    useCreateActivity();

  const [formData, setFormData] = useState(() => createActivityFormModel());
  const [errors, setErrors] = useState({});

  const activitiesPath = `/trips/${trip.id}?tab=activities&destinationId=${destination.id}`;

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

    const createdActivity = await createActivity(
      trip.id,
      destination.id,
      formData,
    );

    if (!createdActivity) {
      return;
    }

    navigate(activitiesPath);
  }

  function handleCancel() {
    navigate(`/trips/${trip.id}?tab=destinations`);
  }

  return (
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

      <ActivityForm
        formData={formData}
        errors={errors}
        destination={destination}
        submitting={creatingActivity}
        submitLabel="Add activity"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}
