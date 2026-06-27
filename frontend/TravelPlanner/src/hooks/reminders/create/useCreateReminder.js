import { useState } from "react";
import { reminderService } from "../../../api_service/reminders/reminderService";

export function useCreateReminder() {
  const [creatingReminder, setCreatingReminder] = useState(false);
  const [createReminderError, setCreateReminderError] = useState("");

  async function createReminder(travelPlanId, data) {
    if (!travelPlanId || Number(travelPlanId) <= 0) {
      setCreateReminderError("Travel plan id is not valid.");
      return null;
    }

    try {
      setCreatingReminder(true);
      setCreateReminderError("");

      const result = await reminderService.create(travelPlanId, data);

      return result.data;
    } catch (error) {
      setCreateReminderError(error.message);
      throw error;
    } finally {
      setCreatingReminder(false);
    }
  }

  return {
    creatingReminder,
    createReminderError,
    createReminder,
  };
}
