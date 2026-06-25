function formatDate(value) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) {
    return "Not updated yet";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value) {
  return new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

export function toTripDetailsDisplayModel(trip) {
  return {
    id: trip.id,
    ownerUserId: trip.ownerUserId,
    title: trip.title,
    description: trip.description || "No description provided.",
    startDate: formatDate(trip.startDate),
    endDate: formatDate(trip.endDate),
    dateRange: `${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`,
    budget: formatMoney(trip.budget),
    notes: trip.notes || "No notes added.",
    createdAt: formatDateTime(trip.createdAt),
    updatedAt: formatDateTime(trip.updatedAt),
  };
}
