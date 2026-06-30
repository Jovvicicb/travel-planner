import { useState } from "react";

import { tripService } from "../../../../api_service/trips/tripService";

export function useDeleteExpense() {
  const [deletingExpense, setDeletingExpense] = useState(false);
  const [deleteExpenseError, setDeleteExpenseError] = useState("");

  async function deleteExpense(tripId, expenseId) {
    if (!tripId || Number(tripId) <= 0) {
      setDeleteExpenseError("Travel plan id is not valid.");
      return false;
    }

    if (!expenseId || Number(expenseId) <= 0) {
      setDeleteExpenseError("Expense id is not valid.");
      return false;
    }

    try {
      setDeletingExpense(true);
      setDeleteExpenseError("");

      await tripService.deleteExpense(tripId, expenseId);

      return true;
    } catch (error) {
      setDeleteExpenseError(error.message);
      throw error;
    } finally {
      setDeletingExpense(false);
    }
  }

  return {
    deletingExpense,
    deleteExpenseError,
    deleteExpense,
  };
}
