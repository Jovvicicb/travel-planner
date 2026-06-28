import { useCallback, useEffect, useState } from "react";
import { reminderService } from "../../../api_service/reminders/reminderService";
import { TRIGGERED_REMINDER_COUNT_CHANGED_EVENT } from "../../../events/reminders/triggeredReminderCountEvents";

export function useTriggeredReminderCount() {
  const [triggeredReminderCount, setTriggeredReminderCount] = useState(0);

  const loadTriggeredReminderCount = useCallback(async () => {
    try {
      const result = await reminderService.getTriggeredCount();

      setTriggeredReminderCount(result.data || 0);
    } catch {
      setTriggeredReminderCount(0);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTriggeredReminderCount();
    }, 0);

    const intervalId = setInterval(() => {
      loadTriggeredReminderCount();
    }, 30000);

    function handleTriggeredReminderCountChanged(event) {
      const delta = Number(event.detail?.delta || 0);

      if (delta !== 0) {
        setTriggeredReminderCount((current) => Math.max(0, current + delta));
      }

      loadTriggeredReminderCount();
    }

    window.addEventListener(
      TRIGGERED_REMINDER_COUNT_CHANGED_EVENT,
      handleTriggeredReminderCountChanged,
    );

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);

      window.removeEventListener(
        TRIGGERED_REMINDER_COUNT_CHANGED_EVENT,
        handleTriggeredReminderCountChanged,
      );
    };
  }, [loadTriggeredReminderCount]);

  return {
    triggeredReminderCount,
    reloadTriggeredReminderCount: loadTriggeredReminderCount,
  };
}
