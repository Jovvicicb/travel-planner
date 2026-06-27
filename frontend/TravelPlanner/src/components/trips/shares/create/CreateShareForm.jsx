import { ShareForm } from "../form/ShareForm";

export function CreateShareForm({
  formData,
  errors,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <ShareForm
      formData={formData}
      errors={errors}
      submitting={submitting}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
