import { validateChecklistItemForm } from "../common/checklistItemValidationRules";

export function validateCreateChecklistItemForm(data) {
  return validateChecklistItemForm(data);
}
