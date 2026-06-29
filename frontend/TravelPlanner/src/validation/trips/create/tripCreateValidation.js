import { validateTripForm } from "../common/tripValidationRules";

export function validateCreateTripForm(data) {
  return validateTripForm(data);
}
