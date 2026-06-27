import { useCallback, useEffect, useState } from "react";
import { reminderService } from "../../../api_service/reminders/reminderService";

export function useTripReminders(tripId) {
  const [reminders, setReminders] = useState([]);
  const [loadingReminders, setLoadingReminders] = useState(false);
  const [remindersError, setRemindersError] = useState("");

  const loadReminders = useCallback(async () => {
    if (!tripId || Number(tripId) <= 0) {
      setReminders([]);
      setRemindersError("");
      return;
    }

    try {
      setLoadingReminders(true);
      setRemindersError("");

      const result = await reminderService.getByTrip(tripId);

      setReminders(result.data || []);
    } catch (error) {
      setReminders([]);
      setRemindersError(error.message);
    } finally {
      setLoadingReminders(false);
    }
  }, [tripId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadReminders();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadReminders]);

  return {
    reminders,
    loadingReminders,
    remindersError,
    reloadReminders: loadReminders,
  };
}
