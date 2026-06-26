import { validateCreateChecklistItemForm } from "../create/checklistItemCreateValidation";

export function validateUpdateChecklistItemForm(data) {
  return validateCreateChecklistItemForm(data);
}
