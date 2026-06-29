import { validateDestinationForm } from "../common/destinationValidationRules";

export function validateCreateDestinationForm(data, travelPlan) {
  return validateDestinationForm(data, travelPlan);
}
