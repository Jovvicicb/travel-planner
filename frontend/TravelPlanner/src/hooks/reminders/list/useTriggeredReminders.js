import { useCallback, useEffect, useState } from "react";
import { reminderService } from "../../../api_service/reminders/reminderService";

export function useTriggeredReminders() {
  const [reminders, setReminders] = useState([]);
  const [loadingReminders, setLoadingReminders] = useState(false);
  const [remindersError, setRemindersError] = useState("");

  const loadReminders = useCallback(async () => {
    try {
      setLoadingReminders(true);
      setRemindersError("");

      const result = await reminderService.getTriggered();

      setReminders(result.data || []);
    } catch (error) {
      setReminders([]);
      setRemindersError(error.message);
    } finally {
      setLoadingReminders(false);
    }
  }, []);

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
