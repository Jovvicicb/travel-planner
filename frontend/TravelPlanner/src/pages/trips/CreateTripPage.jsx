import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { TravelPlanForm } from "../../components/trips/form/TravelPlanForm";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { useCreateTrip } from "../../hooks/trips/create/useCreateTrip";
import { createTripFormModel } from "../../models/trips/create/createTripFormModel";
import { validateCreateTripForm } from "../../validation/trips/create/tripCreateValidation";

export function CreateTripPage() {
  const navigate = useNavigate();
  const { creating, createError, createTrip } = useCreateTrip();

  const [formData, setFormData] = useState(() => ({
    ...createTripFormModel,
  }));

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

    const validation = validateCreateTripForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdTrip = await createTrip(formData);

    if (!createdTrip) {
      return;
    }

    navigate(`/trips/${createdTrip.id}`, { replace: true });
  }

  function handleCancel() {
    navigate("/trips");
  }

  return (
    <>
      <AppHeader
        title="Create travel plan"
        description="Add the basic information for your new trip."
        backTo="/trips"
        backLabel="Back to travel plans"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {createError && (
            <div className="mb-5">
              <ErrorBox message={createError} />
            </div>
          )}

          <TravelPlanForm
            formData={formData}
            errors={errors}
            submitting={creating}
            submitLabel="Create travel plan"
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </main>
    </>
  );
}
