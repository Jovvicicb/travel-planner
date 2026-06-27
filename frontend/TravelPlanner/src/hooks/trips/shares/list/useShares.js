import { useCallback, useEffect, useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useShares(tripId) {
  const [shares, setShares] = useState([]);
  const [loadingShares, setLoadingShares] = useState(false);
  const [sharesError, setSharesError] = useState("");

  const loadShares = useCallback(async () => {
    if (!tripId || Number(tripId) <= 0) {
      setShares([]);
      setSharesError("");
      return;
    }

    try {
      setLoadingShares(true);
      setSharesError("");

      const result = await tripService.getShares(tripId);

      setShares(result.data || []);
    } catch (error) {
      setShares([]);
      setSharesError(error.message);
    } finally {
      setLoadingShares(false);
    }
  }, [tripId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadShares();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadShares]);

  return {
    shares,
    loadingShares,
    sharesError,
    reloadShares: loadShares,
  };
}
