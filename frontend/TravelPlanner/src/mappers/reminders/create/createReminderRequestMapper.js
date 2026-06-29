import { toDateTimeRequestValue } from "../../../helpers/forms/dateTimeInputHelper";

export function toCreateReminderRequest(travelPlanId, data) {
  const description = data.description?.trim();

  return {
    travelPlanId: Number(travelPlanId),
    title: data.title.trim(),
    description: description || null,
    reminderAt: toDateTimeRequestValue(data.reminderDate, data.reminderTime),
  };
}
