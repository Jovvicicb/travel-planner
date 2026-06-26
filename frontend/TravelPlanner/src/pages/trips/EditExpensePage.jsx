import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import { UpdateExpenseForm } from "../../components/trips/expenses/update/UpdateExpenseForm";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useExpenses } from "../../hooks/trips/expenses/list/useExpenses";
import { useUpdateExpense } from "../../hooks/trips/expenses/update/useUpdateExpense";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";
import { createUpdateExpenseFormModel } from "../../models/trips/expenses/update/updateExpenseFormModel";
import { validateUpdateExpenseForm } from "../../validation/trips/expenses/update/expenseUpdateValidation";

export function EditExpensePage() {
  const { tripId, expenseId } = useParams();
  const navigate = useNavigate();

  const { trip, loadingTrip, tripError } = useTripDetails(tripId);

  const { expenses, loadingExpenses, expensesError } = useExpenses(tripId);

  const { updatingExpense, updateExpenseError, updateExpense } =
    useUpdateExpense();

  const expense = expenses.find((item) => item.id === Number(expenseId));

  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  const loading = loadingTrip || loadingExpenses;
  const error = tripError || expensesError;

  if (!formData && expense) {
    setFormData(createUpdateExpenseFormModel(expense));
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
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateUpdateExpenseForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    await updateExpense(trip.id, expense.id, formData);

    navigate(`/trips/${trip.id}?tab=expenses`);
  }

  function handleCancel() {
    navigate(`/trips/${tripId}?tab=expenses`);
  }

  return (
    <>
      <AppHeader
        title="Edit expense"
        description={
          expense
            ? `Update expense "${expense.title}".`
            : "Update selected expense."
        }
        backTo={`/trips/${tripId}?tab=expenses`}
        backLabel="Back to expenses"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          {loading && <LoadingState message="Loading expense..." />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !error && !expense && (
            <ErrorBox message="Expense not found." />
          )}

          {!loading && !error && trip && expense && formData && (
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
          )}
        </section>
      </main>
    </>
  );
}
