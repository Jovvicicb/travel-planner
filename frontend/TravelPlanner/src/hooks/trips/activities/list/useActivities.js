import { useCallback, useEffect, useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useActivities(tripId, destinationId) {
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [activitiesError, setActivitiesError] = useState("");

  const loadActivities = useCallback(async () => {
    if (!tripId || Number(tripId) <= 0) {
      setActivities([]);
      setActivitiesError("");
      return;
    }

    if (!destinationId || Number(destinationId) <= 0) {
      setActivities([]);
      setActivitiesError("");
      return;
    }

    try {
      setLoadingActivities(true);
      setActivitiesError("");

      const result = await tripService.getActivities(tripId, destinationId);

      setActivities(result.data || []);
    } catch (error) {
      setActivities([]);
      setActivitiesError(error.message);
    } finally {
      setLoadingActivities(false);
    }
  }, [tripId, destinationId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadActivities();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadActivities]);

  return {
    activities,
    loadingActivities,
    activitiesError,
    reloadActivities: loadActivities,
  };
}
