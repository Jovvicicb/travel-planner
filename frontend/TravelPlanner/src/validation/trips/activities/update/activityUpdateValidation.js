import { validateCreateActivityForm } from "../create/activityCreateValidation";

export function validateUpdateActivityForm(data, destination) {
  return validateCreateActivityForm(data, destination);
}
