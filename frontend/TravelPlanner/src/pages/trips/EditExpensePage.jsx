import { useParams } from "react-router-dom";

import { AppHeader } from "../../components/layout/AppHeader";
import { EditExpenseFormContent } from "../../components/trips/expenses/update/EditExpenseFormContent";
import { ErrorBox } from "../../components/ui/ErrorBox";
import { LoadingState } from "../../components/ui/LoadingState";
import { useTripDetails } from "../../hooks/trips/details/useTripDetails";
import { useExpenses } from "../../hooks/trips/expenses/list/useExpenses";

export function EditExpensePage() {
  const { tripId, expenseId } = useParams();

  const { trip, loadingTrip, tripError } = useTripDetails(tripId);
  const { expenses, loadingExpenses, expensesError } = useExpenses(tripId);

  const expense = expenses.find((item) => item.id === Number(expenseId));

  const loading = loadingTrip || loadingExpenses;
  const error = tripError || expensesError;

  const backTo = `/trips/${tripId}?tab=expenses`;

  return (
    <>
      <AppHeader
        title="Edit expense"
        description={
          expense
            ? `Update expense "${expense.title}".`
            : "Update selected expense."
        }
        backTo={backTo}
        backLabel="Back to expenses"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5">
          {loading && <LoadingState message="Loading expense..." />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !error && !expense && (
            <ErrorBox message="Expense not found." />
          )}

          {!loading && !error && trip && expense && (
            <EditExpenseFormContent
              key={expense.id}
              trip={trip}
              expense={expense}
            />
          )}
        </section>
      </main>
    </>
  );
}
