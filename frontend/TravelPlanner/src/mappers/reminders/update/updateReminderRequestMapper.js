import { toDateTimeRequestValue } from "../../../helpers/forms/dateTimeInputHelper";

export function toUpdateReminderRequest(data) {
  const description = data.description?.trim();

  return {
    title: data.title.trim(),
    description: description || null,
    reminderAt: toDateTimeRequestValue(data.reminderDate, data.reminderTime),
  };
}
