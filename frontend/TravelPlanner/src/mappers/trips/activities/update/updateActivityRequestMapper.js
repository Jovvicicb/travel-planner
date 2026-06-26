export function toUpdateActivityRequest(data) {
  return {
    title: data.title.trim(),
    activityDate: `${data.activityDate}T00:00:00`,
    startTime: `${data.startTime}:00`,
    endTime: `${data.endTime}:00`,
    location: data.location.trim(),
    description: data.description.trim() || null,
    estimatedCost: data.estimatedCost === "" ? 0 : Number(data.estimatedCost),
    status: Number(data.status),
  };
}
