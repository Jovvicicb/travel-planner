import { toStartOfDayRequestValue } from "../../../helpers/forms/dateTimeInputHelper";

export function toUpdateTravelPlanRequest(data) {
  const description = data.description?.trim();
  const notes = data.notes?.trim();

  return {
    title: data.title.trim(),
    description: description || null,
    startDate: toStartOfDayRequestValue(data.startDate),
    endDate: toStartOfDayRequestValue(data.endDate),
    budget: data.budget === "" ? 0 : Number(data.budget),
    notes: notes || null,
  };
}
