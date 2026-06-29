import { getActivityStatusLabel } from "../../../../constants/enums/activityStatuses";
import {
  formatDisplayDate,
  formatDisplayMoney,
  formatDisplayTime,
} from "../../../../helpers/display/displayFormatHelper";

export function toActivityListItemDisplayModel(activity) {
  const startTimeDisplay = formatDisplayTime(activity.startTime);
  const endTimeDisplay = formatDisplayTime(activity.endTime);

  return {
    id: activity.id,
    destinationId: activity.destinationId,
    title: activity.title,
    location: activity.location,
    description: activity.description || "No description added.",
    status: activity.status,
    statusLabel: getActivityStatusLabel(activity.status),
    estimatedCost: activity.estimatedCost,
    cost: formatDisplayMoney(activity.estimatedCost),
    activityDate: activity.activityDate,
    date: formatDisplayDate(activity.activityDate),
    startTime: activity.startTime,
    endTime: activity.endTime,
    timeRange: `${startTimeDisplay} - ${endTimeDisplay}`,
  };
}
