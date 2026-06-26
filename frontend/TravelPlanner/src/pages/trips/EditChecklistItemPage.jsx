import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { UpdateChecklistItemForm } from "../../components/trips/checklist/update/UpdateChecklistItemForm";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useChecklistItems } from "../../hooks/trips/checklist/list/useChecklistItems";
import { useUpdateChecklistItem } from "../../hooks/trips/checklist/update/useUpdateChecklistItem";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";
import { createUpdateChecklistItemFormModel } from "../../models/trips/checklist/update/updateChecklistItemFormModel";
import { validateUpdateChecklistItemForm } from "../../validation/trips/checklist/update/checklistItemUpdateValidation";

export function EditChecklistItemPage() {
  const { tripId, itemId } = useParams();
  const navigate = useNavigate();

  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  const { checklistItems, loadingChecklistItems, checklistItemsError } =
    useChecklistItems(tripId);

  const {
    updatingChecklistItem,
    updateChecklistItemError,
    updateChecklistItem,
  } = useUpdateChecklistItem();

  const item = checklistItems.find(
    (checklistItem) => checklistItem.id === Number(itemId),
  );

  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  const loading = loadingTrip || loadingChecklistItems;
  const error = tripError || checklistItemsError;

  if (!formData && item) {
    setFormData(createUpdateChecklistItemFormModel(item));
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateUpdateChecklistItemForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    await updateChecklistItem(trip.id, item.id, formData);

    navigate(`/trips/${trip.id}?tab=checklist`);
  }

  function handleCancel() {
    navigate(`/trips/${tripId}?tab=checklist`);
  }

  return (
    <>
      <AppHeader
        title="Edit checklist item"
        description={
          item
            ? `Update checklist item "${item.title}".`
            : "Update selected checklist item."
        }
        backTo={`/trips/${tripId}?tab=checklist`}
        backLabel="Back to checklist"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          {loading && <LoadingState message="Loading checklist item..." />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !error && !item && (
            <ErrorBox message="Checklist item not found." />
          )}

          {!loading && !error && trip && item && formData && (
            <>
              <SectionHeader
                title="Update checklist item"
                description="Change checklist item title and completion status."
              />

              {updateChecklistItemError && (
                <div className="mb-5">
                  <ErrorBox message={updateChecklistItemError} />
                </div>
              )}

              <UpdateChecklistItemForm
                formData={formData}
                errors={errors}
                submitting={updatingChecklistItem}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
}
