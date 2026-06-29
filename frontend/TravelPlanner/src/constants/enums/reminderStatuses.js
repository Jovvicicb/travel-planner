export const REMINDER_STATUSES = {
  PENDING: 0,
  TRIGGERED: 1,
  COMPLETED: 2,
};

export const REMINDER_STATUS_TABS = [
  {
    id: "upcoming",
    label: "Upcoming",
    status: REMINDER_STATUSES.PENDING,
  },
  {
    id: "triggered",
    label: "Triggered",
    status: REMINDER_STATUSES.TRIGGERED,
  },
  {
    id: "completed",
    label: "Completed",
    status: REMINDER_STATUSES.COMPLETED,
  },
];

export const REMINDER_STATUS_LABELS = {
  [REMINDER_STATUSES.PENDING]: "Upcoming",
  [REMINDER_STATUSES.TRIGGERED]: "Triggered",
  [REMINDER_STATUSES.COMPLETED]: "Completed",
};

export const REMINDER_STATUS_TONES = {
  [REMINDER_STATUSES.PENDING]: "upcoming",
  [REMINDER_STATUSES.TRIGGERED]: "triggered",
  [REMINDER_STATUSES.COMPLETED]: "completed",
};

export function getReminderStatusLabel(status) {
  return REMINDER_STATUS_LABELS[status] || "Unknown";
}

export function getReminderStatusTone(status) {
  return REMINDER_STATUS_TONES[status] || "upcoming";
}
