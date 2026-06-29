import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateChecklistItem } from "../../../../hooks/trips/checklist/update/useUpdateChecklistItem";
import { createUpdateChecklistItemFormModel } from "../../../../models/trips/checklist/update/updateChecklistItemFormModel";
import { validateUpdateChecklistItemForm } from "../../../../validation/trips/checklist/update/checklistItemUpdateValidation";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { UpdateChecklistItemForm } from "./UpdateChecklistItemForm";

export function EditChecklistItemFormContent({ trip, item }) {
  const navigate = useNavigate();

  const {
    updatingChecklistItem,
    updateChecklistItemError,
    updateChecklistItem,
  } = useUpdateChecklistItem();

  const [formData, setFormData] = useState(() =>
    createUpdateChecklistItemFormModel(item),
  );

  const [errors, setErrors] = useState({});

  const checklistPath = `/trips/${trip.id}?tab=checklist`;

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

    const updatedChecklistItem = await updateChecklistItem(
      trip.id,
      item.id,
      formData,
    );

    if (!updatedChecklistItem) {
      return;
    }

    navigate(checklistPath);
  }

  function handleCancel() {
    navigate(checklistPath);
  }

  return (
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
  );
}
