import { ACTIVITY_STATUSES } from "../../../../constants/enums/activityStatuses";
import {
  toDateInputValue,
  toTimeInputValue,
} from "../../../../helpers/forms/dateTimeInputHelper";

export function createUpdateActivityFormModel(activity) {
  return {
    title: activity.title || "",
    activityDate: toDateInputValue(activity.activityDate),
    startTime: toTimeInputValue(activity.startTime),
    endTime: toTimeInputValue(activity.endTime),
    location: activity.location || "",
    description: activity.description || "",
    estimatedCost:
      activity.estimatedCost === null || activity.estimatedCost === undefined
        ? ""
        : String(activity.estimatedCost),
    status:
      activity.status === null || activity.status === undefined
        ? String(ACTIVITY_STATUSES.PLANNED)
        : String(activity.status),
  };
}
