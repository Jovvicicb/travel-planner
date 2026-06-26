import { useCallback, useEffect, useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useActivityCalendar(tripId) {
  const [calendarDays, setCalendarDays] = useState([]);
  const [loadingActivityCalendar, setLoadingActivityCalendar] = useState(false);
  const [activityCalendarError, setActivityCalendarError] = useState("");

  const loadActivityCalendar = useCallback(async () => {
    if (!tripId || Number(tripId) <= 0) {
      setCalendarDays([]);
      setActivityCalendarError("");
      return;
    }

    try {
      setLoadingActivityCalendar(true);
      setActivityCalendarError("");

      const result = await tripService.getActivityCalendar(tripId);

      setCalendarDays(result.data || []);
    } catch (error) {
      setCalendarDays([]);
      setActivityCalendarError(error.message);
    } finally {
      setLoadingActivityCalendar(false);
    }
  }, [tripId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadActivityCalendar();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadActivityCalendar]);

  return {
    calendarDays,
    loadingActivityCalendar,
    activityCalendarError,
    reloadActivityCalendar: loadActivityCalendar,
  };
}
