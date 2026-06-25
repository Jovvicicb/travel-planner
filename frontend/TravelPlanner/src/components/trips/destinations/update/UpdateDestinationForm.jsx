import { DestinationForm } from "../form/DestinationForm";

export function UpdateDestinationForm({
  formData,
  errors,
  travelPlan,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <DestinationForm
      formData={formData}
      errors={errors}
      travelPlan={travelPlan}
      submitting={submitting}
      submitLabel="Update destination"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
