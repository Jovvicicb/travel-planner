import { useCallback, useEffect, useState } from "react";
import { tripService } from "../../../api_service/trips/tripService";

export function useBudgetSummary(tripId) {
  const [budgetSummary, setBudgetSummary] = useState(null);
  const [loadingBudgetSummary, setLoadingBudgetSummary] = useState(false);
  const [budgetSummaryError, setBudgetSummaryError] = useState("");

  const loadBudgetSummary = useCallback(async () => {
    if (!tripId || Number(tripId) <= 0) {
      setBudgetSummary(null);
      setBudgetSummaryError("");
      return;
    }

    try {
      setLoadingBudgetSummary(true);
      setBudgetSummaryError("");

      const result = await tripService.getBudgetSummary(tripId);

      setBudgetSummary(result.data || null);
    } catch (error) {
      setBudgetSummary(null);
      setBudgetSummaryError(error.message);
    } finally {
      setLoadingBudgetSummary(false);
    }
  }, [tripId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadBudgetSummary();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadBudgetSummary]);

  return {
    budgetSummary,
    loadingBudgetSummary,
    budgetSummaryError,
    reloadBudgetSummary: loadBudgetSummary,
  };
}
