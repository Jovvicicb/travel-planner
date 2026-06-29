import { getActivityStatusLabel } from "../../../../constants/enums/activityStatuses";
import {
  formatDisplayMoney,
  formatDisplayTime,
  formatDisplayWeekdayDate,
} from "../../../../helpers/display/displayFormatHelper";

function toCalendarActivityDisplayModel(activity) {
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
    cost: formatDisplayMoney(activity.estimatedCost),
    startTime: startTimeDisplay,
    endTime: endTimeDisplay,
    timeRange: `${startTimeDisplay} - ${endTimeDisplay}`,
  };
}

export function toActivityCalendarDayDisplayModel(calendarDay) {
  return {
    date: calendarDay.date,
    displayDate: formatDisplayWeekdayDate(calendarDay.date),
    activities: (calendarDay.activities || []).map(
      toCalendarActivityDisplayModel,
    ),
  };
}
