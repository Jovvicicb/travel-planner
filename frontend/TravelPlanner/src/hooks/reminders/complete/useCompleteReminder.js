import { useState } from "react";
import { reminderService } from "../../../api_service/reminders/reminderService";

export function useCompleteReminder() {
  const [completingReminder, setCompletingReminder] = useState(false);
  const [completeReminderError, setCompleteReminderError] = useState("");

  async function completeReminder(reminderId) {
    if (!reminderId) {
      setCompleteReminderError("Reminder id is not valid.");
      return null;
    }

    try {
      setCompletingReminder(true);
      setCompleteReminderError("");

      const result = await reminderService.complete(reminderId);

      return result.data;
    } catch (error) {
      setCompleteReminderError(error.message);
      throw error;
    } finally {
      setCompletingReminder(false);
    }
  }

  return {
    completingReminder,
    completeReminderError,
    completeReminder,
  };
}
