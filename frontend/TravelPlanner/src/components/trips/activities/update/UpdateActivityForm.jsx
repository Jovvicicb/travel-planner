import { ActivityForm } from "../form/ActivityForm";

export function UpdateActivityForm({
  formData,
  errors,
  destination,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <ActivityForm
      formData={formData}
      errors={errors}
      destination={destination}
      submitting={submitting}
      submitLabel="Update activity"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
