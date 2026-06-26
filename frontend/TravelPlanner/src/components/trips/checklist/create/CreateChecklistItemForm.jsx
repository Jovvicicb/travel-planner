import { ChecklistItemForm } from "../form/ChecklistItemForm";

export function CreateChecklistItemForm({
  formData,
  errors,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <ChecklistItemForm
      formData={formData}
      errors={errors}
      submitting={submitting}
      submitLabel="Add checklist item"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
