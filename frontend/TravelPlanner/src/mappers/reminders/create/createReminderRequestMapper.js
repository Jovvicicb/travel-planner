export function toCreateReminderRequest(travelPlanId, data) {
  return {
    travelPlanId: Number(travelPlanId),
    title: data.title.trim(),
    description: data.description?.trim() || null,
    reminderAt: `${data.reminderDate}T${data.reminderTime}:00`,
  };
}
