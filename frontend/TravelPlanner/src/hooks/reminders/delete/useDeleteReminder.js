import { useState } from "react";
import { reminderService } from "../../../api_service/reminders/reminderService";

export function useDeleteReminder() {
  const [deletingReminder, setDeletingReminder] = useState(false);
  const [deleteReminderError, setDeleteReminderError] = useState("");

  async function deleteReminder(reminderId) {
    if (!reminderId) {
      setDeleteReminderError("Reminder id is not valid.");
      return;
    }

    try {
      setDeletingReminder(true);
      setDeleteReminderError("");

      await reminderService.delete(reminderId);
    } catch (error) {
      setDeleteReminderError(error.message);
      throw error;
    } finally {
      setDeletingReminder(false);
    }
  }

  return {
    deletingReminder,
    deleteReminderError,
    deleteReminder,
  };
}
