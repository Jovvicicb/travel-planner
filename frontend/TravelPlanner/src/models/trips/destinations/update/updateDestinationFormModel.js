import { toDateInputValue } from "../../../../helpers/forms/dateTimeInputHelper";

export function createUpdateDestinationFormModel(destination) {
  return {
    name: destination.name || "",
    location: destination.location || "",
    startDate: toDateInputValue(destination.startDate),
    endDate: toDateInputValue(destination.endDate),
    notes: destination.notes || "",
  };
}
