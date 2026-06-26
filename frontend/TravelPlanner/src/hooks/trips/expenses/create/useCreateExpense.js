import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useCreateExpense() {
  const [creatingExpense, setCreatingExpense] = useState(false);
  const [createExpenseError, setCreateExpenseError] = useState("");

  async function createExpense(tripId, data) {
    try {
      setCreatingExpense(true);
      setCreateExpenseError("");

      const result = await tripService.createExpense(tripId, data);

      return result.data;
    } catch (error) {
      setCreateExpenseError(error.message);
      throw error;
    } finally {
      setCreatingExpense(false);
    }
  }

  return {
    creatingExpense,
    createExpenseError,
    createExpense,
  };
}
