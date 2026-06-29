import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateTrip } from "../../../hooks/trips/update/useUpdateTrip";
import { createUpdateTripFormModel } from "../../../models/trips/update/updateTripFormModel";
import { validateUpdateTripForm } from "../../../validation/trips/update/tripUpdateValidation";
import { ErrorBox } from "../../ui/ErrorBox";
import { UpdateTripForm } from "./UpdateTripForm";

export function EditTripFormContent({ trip }) {
  const navigate = useNavigate();
  const { updateTrip, updating, updateError } = useUpdateTrip();

  const [formData, setFormData] = useState(() =>
    createUpdateTripFormModel(trip),
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

    const validation = validateUpdateTripForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const updatedTrip = await updateTrip(trip.id, formData);

    if (!updatedTrip) {
      return;
    }

    navigate(`/trips/${updatedTrip.id}`);
  }

  function handleCancel() {
    navigate(`/trips/${trip.id}`);
  }

  return (
    <>
      {updateError && (
        <div className="mb-5">
          <ErrorBox message={updateError} />
        </div>
      )}

      <UpdateTripForm
        formData={formData}
        errors={errors}
        submitting={updating}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}
