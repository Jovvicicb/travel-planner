function formatDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function toDestinationListItemDisplayModel(destination) {
  return {
    id: destination.id,
    travelPlanId: destination.travelPlanId,
    name: destination.name,
    location: destination.location,
    notes: destination.notes || "No notes added.",
    dateRange: `${formatDate(destination.startDate)} - ${formatDate(
      destination.endDate,
    )}`,
    selectLabel: `${destination.name} #${destination.id} · ${formatDate(
      destination.startDate,
    )} - ${formatDate(destination.endDate)}`,
  };
}
