import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { UpdateTripForm } from "../../components/trips/update/UpdateTripForm";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { createUpdateTripFormModel } from "../../models/trips/update/updateTripFormModel";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";
import { useUpdateTrip } from "../../hooks/trips/update/useUpdateTrip";
import { validateUpdateTripForm } from "../../validation/trips/update/tripUpdateValidation";

function EditTripPageContent({ trip }) {
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

export function EditTripPage() {
  const { tripId } = useParams();
  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  return (
    <>
      <AppHeader
        title={trip ? `Edit ${trip.title}` : "Edit travel plan"}
        description="Update the main information for this travel plan."
        backTo={trip ? `/trips/${trip.id}` : "/trips"}
        backLabel={trip ? "Back to details" : "Back to travel plans"}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {loadingTrip && <LoadingState message="Loading travel plan..." />}

          {!loadingTrip && tripError && <ErrorBox message={tripError} />}

          {!loadingTrip && !tripError && trip && (
            <EditTripPageContent trip={trip} />
          )}
        </div>
      </main>
    </>
  );
}
