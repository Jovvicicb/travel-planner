export function toCreateDestinationRequest(data) {
  return {
    name: data.name.trim(),
    location: data.location.trim(),
    startDate: `${data.startDate}T00:00:00`,
    endDate: `${data.endDate}T00:00:00`,
    notes: data.notes.trim() || null,
  };
}
