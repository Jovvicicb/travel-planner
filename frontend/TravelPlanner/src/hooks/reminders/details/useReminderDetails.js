import { useCallback, useEffect, useState } from "react";
import { reminderService } from "../../../api_service/reminders/reminderService";

export function useReminderDetails(reminderId) {
  const [reminder, setReminder] = useState(null);
  const [loadingReminder, setLoadingReminder] = useState(false);
  const [reminderError, setReminderError] = useState("");

  const loadReminder = useCallback(async () => {
    if (!reminderId) {
      setReminder(null);
      setReminderError("Reminder id is not valid.");
      return;
    }

    try {
      setLoadingReminder(true);
      setReminderError("");

      const result = await reminderService.getById(reminderId);

      setReminder(result.data || null);
    } catch (error) {
      setReminder(null);
      setReminderError(error.message);
    } finally {
      setLoadingReminder(false);
    }
  }, [reminderId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadReminder();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadReminder]);

  return {
    reminder,
    loadingReminder,
    reminderError,
    reloadReminder: loadReminder,
  };
}
