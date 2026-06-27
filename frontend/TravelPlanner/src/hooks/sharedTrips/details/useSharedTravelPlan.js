import { useCallback, useEffect, useState } from "react";
import { sharedTripService } from "../../../api_service/sharedTrips/sharedTripService";

export function useSharedTravelPlan(token) {
  const [sharedTrip, setSharedTrip] = useState(null);
  const [loadingSharedTrip, setLoadingSharedTrip] = useState(false);
  const [sharedTripError, setSharedTripError] = useState("");

  const loadSharedTrip = useCallback(async () => {
    if (!token || token.trim() === "") {
      setSharedTrip(null);
      setSharedTripError("Share token is required.");
      return;
    }

    try {
      setLoadingSharedTrip(true);
      setSharedTripError("");

      const result = await sharedTripService.getSharedTravelPlan(token);

      setSharedTrip(result.data || null);
    } catch (error) {
      setSharedTrip(null);
      setSharedTripError(error.message);
    } finally {
      setLoadingSharedTrip(false);
    }
  }, [token]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadSharedTrip();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadSharedTrip]);

  return {
    sharedTrip,
    loadingSharedTrip,
    sharedTripError,
    reloadSharedTrip: loadSharedTrip,
  };
}
