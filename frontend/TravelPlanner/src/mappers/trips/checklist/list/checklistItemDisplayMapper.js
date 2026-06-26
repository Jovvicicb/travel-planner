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

export function toChecklistItemDisplayModel(item) {
  return {
    id: item.id,
    travelPlanId: item.travelPlanId,
    title: item.title,
    isCompleted: item.isCompleted,
    statusLabel: item.isCompleted ? "Completed" : "Pending",
    createdAt: item.createdAt,
    createdAtDisplay: formatDate(item.createdAt),
    updatedAt: item.updatedAt,
    updatedAtDisplay: formatDate(item.updatedAt),
  };
}
