import { useEffect, useState } from "react";
import { useCreateExpense } from "../../../../hooks/trips/expenses/create/useCreateExpense";
import { createExpenseFormModel } from "../../../../models/trips/expenses/create/createExpenseFormModel";
import { validateCreateExpenseForm } from "../../../../validation/trips/expenses/create/expenseCreateValidation";
import { CreateExpenseForm } from "../../expenses/create/CreateExpenseForm";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";

export function TripExpensesTab({ trip }) {
  const [formData, setFormData] = useState(() => createExpenseFormModel());
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { creatingExpense, createExpenseError, createExpense } =
    useCreateExpense();

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage]);

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

    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCreateExpenseForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdExpense = await createExpense(trip.id, formData);

    setFormData(createExpenseFormModel());
    setErrors({});
    setSuccessMessage(
      `Expense "${createdExpense.title}" created successfully.`,
    );
  }

  function handleCancel() {
    setFormData(createExpenseFormModel());
    setErrors({});
    setSuccessMessage("");
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Expenses"
        description="Record travel expenses and categorize them for budget tracking."
      />

      {successMessage && (
        <div className="mb-5">
          <SuccessBox message={successMessage} />
        </div>
      )}

      {createExpenseError && (
        <div className="mb-5">
          <ErrorBox message={createExpenseError} />
        </div>
      )}

      <CreateExpenseForm
        formData={formData}
        errors={errors}
        submitting={creatingExpense}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <div className="mt-6 border-t-2 border-[#b8a692] pt-5">
        <SectionHeader
          title="Expense list"
          description="Expense list and budget summary will be displayed here after the list endpoint is connected."
        />

        <EmptyState
          title="Expense list is not loaded yet"
          description="Create expense is connected. Expense list and budget calculation will be added when the backend list or summary endpoint is available."
        />
      </div>
    </div>
  );
}
