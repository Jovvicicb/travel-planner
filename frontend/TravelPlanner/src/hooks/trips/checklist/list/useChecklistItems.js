import { useCallback, useEffect, useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useChecklistItems(tripId) {
  const [checklistItems, setChecklistItems] = useState([]);
  const [loadingChecklistItems, setLoadingChecklistItems] = useState(false);
  const [checklistItemsError, setChecklistItemsError] = useState("");

  const loadChecklistItems = useCallback(async () => {
    if (!tripId || Number(tripId) <= 0) {
      setChecklistItems([]);
      setChecklistItemsError("");
      return;
    }

    try {
      setLoadingChecklistItems(true);
      setChecklistItemsError("");

      const result = await tripService.getChecklistItems(tripId);

      setChecklistItems(result.data || []);
    } catch (error) {
      setChecklistItems([]);
      setChecklistItemsError(error.message);
    } finally {
      setLoadingChecklistItems(false);
    }
  }, [tripId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadChecklistItems();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadChecklistItems]);

  return {
    checklistItems,
    loadingChecklistItems,
    checklistItemsError,
    reloadChecklistItems: loadChecklistItems,
  };
}
