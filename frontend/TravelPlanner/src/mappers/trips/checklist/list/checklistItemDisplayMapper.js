import { formatDisplayDate } from "../../../../helpers/display/displayFormatHelper";

export function toChecklistItemDisplayModel(item) {
  return {
    id: item.id,
    travelPlanId: item.travelPlanId,
    title: item.title,
    isCompleted: item.isCompleted,
    statusLabel: item.isCompleted ? "Completed" : "Pending",
    createdAt: item.createdAt,
    createdAtDisplay: formatDisplayDate(item.createdAt),
    updatedAt: item.updatedAt,
    updatedAtDisplay: formatDisplayDate(item.updatedAt),
  };
}
