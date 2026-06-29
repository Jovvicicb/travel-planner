import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateDestination } from "../../../../hooks/trips/destinations/update/useUpdateDestination";
import { createUpdateDestinationFormModel } from "../../../../models/trips/destinations/update/updateDestinationFormModel";
import { validateUpdateDestinationForm } from "../../../../validation/trips/destinations/update/destinationUpdateValidation";
import { ErrorBox } from "../../../ui/ErrorBox";
import { UpdateDestinationForm } from "./UpdateDestinationForm";

export function EditDestinationFormContent({ trip, destination }) {
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

    const updatedDestination = await updateDestination(
      trip.id,
      destination.id,
      formData,
    );

    if (!updatedDestination) {
      return;
    }

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
