import { validateActivityForm } from "../common/activityValidationRules";

export function validateUpdateActivityForm(data, destination) {
  return validateActivityForm(data, destination);
}
