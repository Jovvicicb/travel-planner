export function toUpdateReminderRequest(data) {
  return {
    title: data.title.trim(),
    description: data.description?.trim() || null,
    reminderAt: `${data.reminderDate}T${data.reminderTime}:00`,
  };
}
