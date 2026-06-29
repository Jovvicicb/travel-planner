import { validateActivityForm } from "../common/activityValidationRules";

export function validateCreateActivityForm(data, destination) {
  return validateActivityForm(data, destination);
}
