export function toCreateTravelPlanRequest(data) {
  return {
    title: data.title.trim(),
    description: data.description.trim() || null,
    startDate: `${data.startDate}T00:00:00`,
    endDate: `${data.endDate}T00:00:00`,
    budget: data.budget === "" ? 0 : Number(data.budget),
    notes: data.notes.trim() || null,
  };
}