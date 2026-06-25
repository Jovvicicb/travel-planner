import { DestinationForm } from "../form/DestinationForm";

export function CreateDestinationForm({
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
      submitLabel="Add destination"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
