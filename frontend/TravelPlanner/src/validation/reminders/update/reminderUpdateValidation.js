import { validateReminderForm } from "../common/reminderValidationRules";

export function validateUpdateReminderForm(data) {
  return validateReminderForm(data);
}
