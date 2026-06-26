import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useUpdateExpense() {
  const [updatingExpense, setUpdatingExpense] = useState(false);
  const [updateExpenseError, setUpdateExpenseError] = useState("");

  async function updateExpense(tripId, expenseId, data) {
    try {
      setUpdatingExpense(true);
      setUpdateExpenseError("");

      const result = await tripService.updateExpense(tripId, expenseId, data);

      return result.data;
    } catch (error) {
      setUpdateExpenseError(error.message);
      throw error;
    } finally {
      setUpdatingExpense(false);
    }
  }

  return {
    updatingExpense,
    updateExpenseError,
    updateExpense,
  };
}
