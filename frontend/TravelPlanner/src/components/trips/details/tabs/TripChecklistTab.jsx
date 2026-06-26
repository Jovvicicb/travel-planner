import { useEffect, useState } from "react";
import { useCreateChecklistItem } from "../../../../hooks/trips/checklist/create/useCreateChecklistItem";
import { useChecklistItems } from "../../../../hooks/trips/checklist/list/useChecklistItems";
import { createChecklistItemFormModel } from "../../../../models/trips/checklist/create/createChecklistItemFormModel";
import { validateCreateChecklistItemForm } from "../../../../validation/trips/checklist/create/checklistItemCreateValidation";
import { CreateChecklistItemForm } from "../../checklist/create/CreateChecklistItemForm";
import { ChecklistItemList } from "../../checklist/list/ChecklistItemList";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";

export function TripChecklistTab({ trip }) {
  const [formData, setFormData] = useState(() =>
    createChecklistItemFormModel(),
  );
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const {
    checklistItems,
    loadingChecklistItems,
    checklistItemsError,
    reloadChecklistItems,
  } = useChecklistItems(trip.id);

  const {
    creatingChecklistItem,
    createChecklistItemError,
    createChecklistItem,
  } = useCreateChecklistItem();

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

    const validation = validateCreateChecklistItemForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdItem = await createChecklistItem(trip.id, formData);

    setFormData(createChecklistItemFormModel());
    setErrors({});
    setSuccessMessage(
      `Checklist item "${createdItem.title}" created successfully.`,
    );

    await reloadChecklistItems();
  }

  function handleCancel() {
    setFormData(createChecklistItemFormModel());
    setErrors({});
    setSuccessMessage("");
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Checklist"
        description="Create trip preparation tasks and keep important items organized."
      />

      {successMessage && (
        <div className="mb-5">
          <SuccessBox message={successMessage} />
        </div>
      )}

      {createChecklistItemError && (
        <div className="mb-5">
          <ErrorBox message={createChecklistItemError} />
        </div>
      )}

      <CreateChecklistItemForm
        formData={formData}
        errors={errors}
        submitting={creatingChecklistItem}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <div className="mt-6 border-t-2 border-[#b8a692] pt-5">
        <SectionHeader
          title="Checklist items"
          description="Review preparation tasks connected to this travel plan."
        />

        {loadingChecklistItems && (
          <LoadingState message="Loading checklist items..." />
        )}

        {!loadingChecklistItems && checklistItemsError && (
          <ErrorBox message={checklistItemsError} />
        )}

        {!loadingChecklistItems &&
          !checklistItemsError &&
          checklistItems.length === 0 && (
            <EmptyState
              title="No checklist items yet"
              description="Add the first checklist item to start organizing trip tasks."
            />
          )}

        {!loadingChecklistItems &&
          !checklistItemsError &&
          checklistItems.length > 0 && (
            <ChecklistItemList items={checklistItems} tripId={trip.id} />
          )}
      </div>
    </div>
  );
}
