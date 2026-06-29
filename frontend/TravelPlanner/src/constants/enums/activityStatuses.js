export const ACTIVITY_STATUSES = {
  PLANNED: 0,
  RESERVED: 1,
  COMPLETED: 2,
  CANCELLED: 3,
};

export const ACTIVITY_STATUS_OPTIONS = [
  {
    value: ACTIVITY_STATUSES.PLANNED,
    label: "Planned",
  },
  {
    value: ACTIVITY_STATUSES.RESERVED,
    label: "Reserved",
  },
  {
    value: ACTIVITY_STATUSES.COMPLETED,
    label: "Completed",
  },
  {
    value: ACTIVITY_STATUSES.CANCELLED,
    label: "Cancelled",
  },
];

export const ACTIVITY_STATUS_LABELS = {
  [ACTIVITY_STATUSES.PLANNED]: "Planned",
  [ACTIVITY_STATUSES.RESERVED]: "Reserved",
  [ACTIVITY_STATUSES.COMPLETED]: "Completed",
  [ACTIVITY_STATUSES.CANCELLED]: "Cancelled",
};

export function getActivityStatusLabel(status) {
  return ACTIVITY_STATUS_LABELS[status] || "Unknown";
}
