import {
  toDateInputValue,
  toTimeInputValue,
} from "../../../helpers/forms/dateTimeInputHelper";

export function toUpdateReminderFormModel(reminder) {
  return {
    title: reminder?.title || "",
    description: reminder?.description || "",
    reminderDate: toDateInputValue(reminder?.reminderAt),
    reminderTime: toTimeInputValue(reminder?.reminderAt),
  };
}
