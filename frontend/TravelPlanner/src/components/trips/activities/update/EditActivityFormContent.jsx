import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateActivity } from "../../../../hooks/trips/activities/update/useUpdateActivity";
import { createUpdateActivityFormModel } from "../../../../models/trips/activities/update/updateActivityFormModel";
import { validateUpdateActivityForm } from "../../../../validation/trips/activities/update/activityUpdateValidation";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { ActivityForm } from "../form/ActivityForm";

export function EditActivityFormContent({ trip, destination, activity }) {
  const navigate = useNavigate();

  const { updatingActivity, updateActivityError, updateActivity } =
    useUpdateActivity();

  const [formData, setFormData] = useState(() =>
    createUpdateActivityFormModel(activity),
  );

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

    const validation = validateUpdateActivityForm(formData, destination);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const updatedActivity = await updateActivity(
      trip.id,
      destination.id,
      activity.id,
      formData,
    );

    if (!updatedActivity) {
      return;
    }

    navigate(activitiesPath);
  }

  function handleCancel() {
    navigate(activitiesPath);
  }

  return (
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

      <ActivityForm
        formData={formData}
        errors={errors}
        destination={destination}
        submitting={updatingActivity}
        submitLabel="Update activity"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}
