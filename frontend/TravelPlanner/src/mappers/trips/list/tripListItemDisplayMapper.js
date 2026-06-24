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

function formatMoney(value) {
  return new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

export function toTripListItemDisplayModel(trip) {
  return {
    id: trip.id,
    ownerUserId: trip.ownerUserId,
    title: trip.title,
    dateRange: `${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`,
    budget: formatMoney(trip.budget),
  };
}
