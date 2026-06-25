const ACTIVITY_STATUS_LABELS = {
  0: "Planned",
  1: "Reserved",
  2: "Completed",
  3: "Cancelled",
};

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

function formatTime(value) {
  if (!value) {
    return "";
  }

  return value.toString().slice(0, 5);
}

function formatMoney(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function toActivityListItemDisplayModel(activity) {
  return {
    id: activity.id,
    destinationId: activity.destinationId,
    title: activity.title,
    location: activity.location,
    description: activity.description || "No description added.",
    status: activity.status,
    statusLabel: ACTIVITY_STATUS_LABELS[activity.status] || "Unknown",
    estimatedCost: activity.estimatedCost,
    cost: formatMoney(activity.estimatedCost),
    activityDate: activity.activityDate,
    date: formatDate(activity.activityDate),
    startTime: activity.startTime,
    endTime: activity.endTime,
    timeRange: `${formatTime(activity.startTime)} - ${formatTime(
      activity.endTime,
    )}`,
  };
}
