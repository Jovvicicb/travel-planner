import {
  getReminderStatusLabel,
  getReminderStatusTone,
} from "../../constants/enums/reminderStatuses";
import { formatDisplayDateTime } from "../../helpers/display/displayFormatHelper";

export function toReminderDisplayModel(reminder) {
  return {
    id: reminder.id,
    travelPlanId: reminder.travelPlanId,
    userId: reminder.userId,
    title: reminder.title || "Untitled reminder",
    description: reminder.description || "",
    reminderAt: reminder.reminderAt,
    reminderAtDisplay: formatDisplayDateTime(reminder.reminderAt),
    status: reminder.status,
    statusLabel: getReminderStatusLabel(reminder.status),
    statusTone: getReminderStatusTone(reminder.status),
    createdAt: reminder.createdAt,
    createdAtDisplay: formatDisplayDateTime(reminder.createdAt),
    completedAt: reminder.completedAt,
    completedAtDisplay: formatDisplayDateTime(reminder.completedAt),
  };
}

export function filterRemindersByStatus(reminders, status) {
  return reminders.filter((reminder) => reminder.status === status);
}
