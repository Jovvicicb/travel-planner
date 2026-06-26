import { useEffect, useState } from "react";
import { useCreateChecklistItem } from "../../../../hooks/trips/checklist/create/useCreateChecklistItem";
import { createChecklistItemFormModel } from "../../../../models/trips/checklist/create/createChecklistItemFormModel";
import { validateCreateChecklistItemForm } from "../../../../validation/trips/checklist/create/checklistItemCreateValidation";
import { CreateChecklistItemForm } from "../../checklist/create/CreateChecklistItemForm";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";

export function TripChecklistTab({ trip }) {
  const [formData, setFormData] = useState(() =>
    createChecklistItemFormModel(),
  );
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

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
          description="Checklist list will be displayed here after the list endpoint is connected."
        />

        <EmptyState
          title="Checklist list is not loaded yet"
          description="Create checklist item is connected. Checklist list, complete status, update and delete will be added when the backend endpoints are available."
        />
      </div>
    </div>
  );
}
