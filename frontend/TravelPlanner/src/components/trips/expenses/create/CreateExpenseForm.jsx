import { ExpenseForm } from "../form/ExpenseForm";

export function CreateExpenseForm({
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
      submitLabel="Add expense"
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
