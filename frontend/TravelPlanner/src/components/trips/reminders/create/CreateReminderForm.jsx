import { ReminderForm } from "../form/ReminderForm";

export function CreateReminderForm({
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
      submitLabel="Create reminder"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
