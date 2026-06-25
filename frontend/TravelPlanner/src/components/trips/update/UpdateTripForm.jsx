import { TravelPlanForm } from "../form/TravelPlanForm";

export function UpdateTripForm({
  formData,
  errors,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <TravelPlanForm
      formData={formData}
      errors={errors}
      submitting={submitting}
      submitLabel="Update travel plan"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
