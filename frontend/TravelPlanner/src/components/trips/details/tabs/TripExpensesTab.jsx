import { useState } from "react";

import { useSuccessMessage } from "../../../../hooks/common/useSuccessMessage";
import { useCreateExpense } from "../../../../hooks/trips/expenses/create/useCreateExpense";
import { useDeleteExpense } from "../../../../hooks/trips/expenses/delete/useDeleteExpense";
import { useExpenses } from "../../../../hooks/trips/expenses/list/useExpenses";
import { createExpenseFormModel } from "../../../../models/trips/expenses/create/createExpenseFormModel";
import { validateCreateExpenseForm } from "../../../../validation/trips/expenses/create/expenseCreateValidation";
import { ConfirmDialog } from "../../../ui/ConfirmDialog";
import { EmptyState } from "../../../ui/EmptyState";
import { ErrorBox } from "../../../ui/ErrorBox";
import { LoadingState } from "../../../ui/LoadingState";
import { SectionHeader } from "../../../ui/SectionHeader";
import { SuccessBox } from "../../../ui/SuccessBox";
import { ExpenseForm } from "../../expenses/form/ExpenseForm";
import { ExpenseList } from "../../expenses/list/ExpenseList";

export function TripExpensesTab({ trip }) {
  const [formData, setFormData] = useState(() => createExpenseFormModel());
  const [errors, setErrors] = useState({});
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const { successMessage, setSuccessMessage, clearSuccessMessage } =
    useSuccessMessage();

  const { expenses, loadingExpenses, expensesError, reloadExpenses } =
    useExpenses(trip.id);

  const { creatingExpense, createExpenseError, createExpense } =
    useCreateExpense();

  const { deletingExpense, deleteExpenseError, deleteExpense } =
    useDeleteExpense();

  const hasExpenses = expenses.length > 0;

  function resetForm() {
    setFormData(createExpenseFormModel());
    setErrors({});
  }

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

    clearSuccessMessage();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCreateExpenseForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const createdExpense = await createExpense(trip.id, formData);

    if (!createdExpense) {
      return;
    }

    resetForm();

    setSuccessMessage(
      `Expense "${createdExpense.title}" created successfully.`,
    );

    await reloadExpenses();
  }

  function handleCancel() {
    resetForm();
    clearSuccessMessage();
  }

  function handleDeleteClick(expense) {
    setExpenseToDelete(expense);
    clearSuccessMessage();
  }

  function handleCancelDelete() {
    setExpenseToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!expenseToDelete) {
      return;
    }

    const deletedExpense = await deleteExpense(trip.id, expenseToDelete.id);

    if (!deletedExpense) {
      return;
    }

    const deletedExpenseTitle = expenseToDelete.title;

    setExpenseToDelete(null);
    setSuccessMessage(`Expense "${deletedExpenseTitle}" deleted successfully.`);

    await reloadExpenses();
  }

  return (
    <div className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
      <SectionHeader
        title="Expenses"
        description="Record travel expenses and review all costs connected to this travel plan."
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

      {deleteExpenseError && (
        <div className="mb-5">
          <ErrorBox message={deleteExpenseError} />
        </div>
      )}

      <ExpenseForm
        formData={formData}
        errors={errors}
        submitting={creatingExpense}
        submitLabel="Add expense"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <div className="mt-6 border-t-2 border-[#b8a692] pt-5">
        <SectionHeader
          title="Expense list"
          description="Review all recorded expenses for this travel plan."
        />

        {loadingExpenses && <LoadingState message="Loading expenses..." />}

        {!loadingExpenses && expensesError && (
          <ErrorBox message={expensesError} />
        )}

        {!loadingExpenses && !expensesError && !hasExpenses && (
          <EmptyState
            title="No expenses yet"
            description="Add the first expense to start tracking travel costs."
          />
        )}

        {!loadingExpenses && !expensesError && hasExpenses && (
          <ExpenseList
            expenses={expenses}
            tripId={trip.id}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      <ConfirmDialog
        open={Boolean(expenseToDelete)}
        title="Delete expense?"
        description={
          expenseToDelete
            ? `This action will permanently delete "${expenseToDelete.title}". This cannot be undone.`
            : ""
        }
        confirmLabel="Delete expense"
        cancelLabel="Cancel"
        confirming={deletingExpense}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
