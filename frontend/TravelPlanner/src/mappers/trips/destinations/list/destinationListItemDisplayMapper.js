import { formatDisplayDate } from "../../../../helpers/display/displayFormatHelper";

export function toDestinationListItemDisplayModel(destination) {
  const startDateDisplay = formatDisplayDate(destination.startDate);
  const endDateDisplay = formatDisplayDate(destination.endDate);
  const dateRange = `${startDateDisplay} - ${endDateDisplay}`;

  return {
    id: destination.id,
    travelPlanId: destination.travelPlanId,
    name: destination.name,
    location: destination.location,
    notes: destination.notes || "No notes added.",
    dateRange,
    selectLabel: `${destination.name} #${destination.id} · ${dateRange}`,
  };
}
