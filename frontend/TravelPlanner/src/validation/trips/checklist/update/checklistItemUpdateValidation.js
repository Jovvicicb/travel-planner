import { validateChecklistItemForm } from "../common/checklistItemValidationRules";

export function validateUpdateChecklistItemForm(data) {
  return validateChecklistItemForm(data);
}
