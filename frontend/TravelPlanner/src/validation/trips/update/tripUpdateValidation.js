import { validateTripForm } from "../common/tripValidationRules";

export function validateUpdateTripForm(data) {
  return validateTripForm(data);
}
