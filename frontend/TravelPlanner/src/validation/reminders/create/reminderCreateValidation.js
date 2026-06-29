import { validateReminderForm } from "../common/reminderValidationRules";

export function validateCreateReminderForm(data) {
  return validateReminderForm(data);
}
