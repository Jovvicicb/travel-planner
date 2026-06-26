import { ExpenseForm } from "../form/ExpenseForm";

export function UpdateExpenseForm({
  formData,
  errors,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <ExpenseForm
      formData={formData}
      errors={errors}
      submitting={submitting}
      submitLabel="Update expense"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
