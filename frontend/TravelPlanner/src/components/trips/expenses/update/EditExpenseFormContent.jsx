import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateExpense } from "../../../../hooks/trips/expenses/update/useUpdateExpense";
import { createUpdateExpenseFormModel } from "../../../../models/trips/expenses/update/updateExpenseFormModel";
import { validateUpdateExpenseForm } from "../../../../validation/trips/expenses/update/expenseUpdateValidation";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { UpdateExpenseForm } from "./UpdateExpenseForm";

export function EditExpenseFormContent({ trip, expense }) {
  const navigate = useNavigate();

  const { updatingExpense, updateExpenseError, updateExpense } =
    useUpdateExpense();

  const [formData, setFormData] = useState(() =>
    createUpdateExpenseFormModel(expense),
  );

  const [errors, setErrors] = useState({});

  const expensesPath = `/trips/${trip.id}?tab=expenses`;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateUpdateExpenseForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const updatedExpense = await updateExpense(trip.id, expense.id, formData);

    if (!updatedExpense) {
      return;
    }

    navigate(expensesPath);
  }

  function handleCancel() {
    navigate(expensesPath);
  }

  return (
    <>
      <SectionHeader
        title="Update expense"
        description="Change expense details and save updated travel cost information."
      />

      {updateExpenseError && (
        <div className="mb-5">
          <ErrorBox message={updateExpenseError} />
        </div>
      )}

      <UpdateExpenseForm
        formData={formData}
        errors={errors}
        submitting={updatingExpense}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}
