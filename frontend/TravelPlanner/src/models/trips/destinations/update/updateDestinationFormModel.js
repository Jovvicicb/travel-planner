function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

export function createUpdateDestinationFormModel(destination) {
  return {
    name: destination.name || "",
    location: destination.location || "",
    startDate: toDateInputValue(destination.startDate),
    endDate: toDateInputValue(destination.endDate),
    notes: destination.notes || "",
  };
}
