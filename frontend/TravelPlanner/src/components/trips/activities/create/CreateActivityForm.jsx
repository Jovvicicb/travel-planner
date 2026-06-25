import { ActivityForm } from "../form/ActivityForm";

export function CreateActivityForm({
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
      submitLabel="Add activity"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
