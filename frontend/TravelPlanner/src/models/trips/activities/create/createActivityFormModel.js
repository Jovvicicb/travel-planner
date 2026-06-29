import { ACTIVITY_STATUSES } from "../../../../constants/enums/activityStatuses";

export function createActivityFormModel() {
  return {
    title: "",
    activityDate: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    estimatedCost: "",
    status: String(ACTIVITY_STATUSES.PLANNED),
  };
}
