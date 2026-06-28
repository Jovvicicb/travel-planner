import { ReminderForm } from "../form/ReminderForm";

export function UpdateReminderForm({
  formData,
  errors,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <ReminderForm
      formData={formData}
      errors={errors}
      submitting={submitting}
      submitLabel="Save reminder"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
