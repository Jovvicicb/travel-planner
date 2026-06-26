import { ChecklistItemForm } from "../form/ChecklistItemForm";

export function UpdateChecklistItemForm({
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
      submitLabel="Update checklist item"
      showCompletedField
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
