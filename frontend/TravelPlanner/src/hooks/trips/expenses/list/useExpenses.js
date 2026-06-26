import { useCallback, useEffect, useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useExpenses(tripId) {
  const [expenses, setExpenses] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [expensesError, setExpensesError] = useState("");

  const loadExpenses = useCallback(async () => {
    if (!tripId || Number(tripId) <= 0) {
      setExpenses([]);
      setExpensesError("");
      return;
    }

    try {
      setLoadingExpenses(true);
      setExpensesError("");

      const result = await tripService.getExpenses(tripId);

      setExpenses(result.data || []);
    } catch (error) {
      setExpenses([]);
      setExpensesError(error.message);
    } finally {
      setLoadingExpenses(false);
    }
  }, [tripId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadExpenses();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadExpenses]);

  return {
    expenses,
    loadingExpenses,
    expensesError,
    reloadExpenses: loadExpenses,
  };
}
