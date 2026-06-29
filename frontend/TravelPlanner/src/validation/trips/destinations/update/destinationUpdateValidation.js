import { validateDestinationForm } from "../common/destinationValidationRules";

export function validateUpdateDestinationForm(data, travelPlan) {
  return validateDestinationForm(data, travelPlan);
}
