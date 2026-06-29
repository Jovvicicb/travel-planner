import {
  toStartOfDayRequestValue,
  toTimeRequestValue,
} from "../../../../helpers/forms/dateTimeInputHelper";

export function toCreateActivityRequest(data) {
  const description = data.description?.trim();

  return {
    title: data.title.trim(),
    activityDate: toStartOfDayRequestValue(data.activityDate),
    startTime: toTimeRequestValue(data.startTime),
    endTime: toTimeRequestValue(data.endTime),
    location: data.location.trim(),
    description: description || null,
    estimatedCost: data.estimatedCost === "" ? 0 : Number(data.estimatedCost),
    status: Number(data.status),
  };
}
