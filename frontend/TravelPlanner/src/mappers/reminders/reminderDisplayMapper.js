import {
  REMINDER_STATUS_LABELS,
  REMINDER_STATUSES,
} from "../../constants/enums/reminderStatuses";

function formatDateTime(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getStatusTone(status) {
  if (status === REMINDER_STATUSES.TRIGGERED) {
    return "triggered";
  }

  if (status === REMINDER_STATUSES.COMPLETED) {
    return "completed";
  }

  return "upcoming";
}

export function toReminderDisplayModel(reminder) {
  return {
    id: reminder.id,
    travelPlanId: reminder.travelPlanId,
    userId: reminder.userId,
    title: reminder.title || "Untitled reminder",
    description: reminder.description || "",
    reminderAt: reminder.reminderAt,
    reminderAtDisplay: formatDateTime(reminder.reminderAt),
    status: reminder.status,
    statusLabel: REMINDER_STATUS_LABELS[reminder.status] || "Unknown",
    statusTone: getStatusTone(reminder.status),
    createdAt: reminder.createdAt,
    createdAtDisplay: formatDateTime(reminder.createdAt),
    completedAt: reminder.completedAt,
    completedAtDisplay: formatDateTime(reminder.completedAt),
  };
}

export function filterRemindersByStatus(reminders, status) {
  return reminders.filter((reminder) => reminder.status === status);
}
