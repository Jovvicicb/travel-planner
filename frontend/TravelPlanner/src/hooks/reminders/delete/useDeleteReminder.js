import { useState } from "react";

import { reminderService } from "../../../api_service/reminders/reminderService";

export function useDeleteReminder() {
  const [deletingReminder, setDeletingReminder] = useState(false);
  const [deleteReminderError, setDeleteReminderError] = useState("");

  async function deleteReminder(reminderId) {
    if (!reminderId || Number(reminderId) <= 0) {
      setDeleteReminderError("Reminder id is not valid.");
      return false;
    }

    try {
      setDeletingReminder(true);
      setDeleteReminderError("");

      await reminderService.delete(reminderId);

      return true;
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
