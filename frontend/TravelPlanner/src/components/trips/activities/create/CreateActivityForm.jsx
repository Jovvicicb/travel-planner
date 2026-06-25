import { ActivityForm } from "../form/ActivityForm";

export function CreateActivityForm({
  formData,
  errors,
  destinations,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <ActivityForm
      formData={formData}
      errors={errors}
      destinations={destinations}
      submitting={submitting}
      submitLabel="Add activity"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
