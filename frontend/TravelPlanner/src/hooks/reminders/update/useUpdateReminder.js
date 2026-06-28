import { useState } from "react";
import { reminderService } from "../../../api_service/reminders/reminderService";

export function useUpdateReminder() {
  const [updatingReminder, setUpdatingReminder] = useState(false);
  const [updateReminderError, setUpdateReminderError] = useState("");

  async function updateReminder(reminderId, data) {
    if (!reminderId) {
      setUpdateReminderError("Reminder id is not valid.");
      return null;
    }

    try {
      setUpdatingReminder(true);
      setUpdateReminderError("");

      const result = await reminderService.update(reminderId, data);

      return result.data;
    } catch (error) {
      setUpdateReminderError(error.message);
      throw error;
    } finally {
      setUpdatingReminder(false);
    }
  }

  return {
    updatingReminder,
    updateReminderError,
    updateReminder,
  };
}
