function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

export function createUpdateTripFormModel(trip) {
  return {
    title: trip.title || "",
    description: trip.description || "",
    startDate: toDateInputValue(trip.startDate),
    endDate: toDateInputValue(trip.endDate),
    budget: trip.budget?.toString() || "",
    notes: trip.notes || "",
  };
}
