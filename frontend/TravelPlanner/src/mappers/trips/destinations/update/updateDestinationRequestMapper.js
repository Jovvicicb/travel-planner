import { toStartOfDayRequestValue } from "../../../../helpers/forms/dateTimeInputHelper";

export function toUpdateDestinationRequest(data) {
  const notes = data.notes?.trim();

  return {
    name: data.name.trim(),
    location: data.location.trim(),
    startDate: toStartOfDayRequestValue(data.startDate),
    endDate: toStartOfDayRequestValue(data.endDate),
    notes: notes || null,
  };
}
