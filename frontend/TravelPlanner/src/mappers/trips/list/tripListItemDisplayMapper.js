import {
  formatDisplayDate,
  formatDisplayDecimal,
} from "../../../helpers/display/displayFormatHelper";

export function toTripListItemDisplayModel(trip) {
  const startDateDisplay = formatDisplayDate(trip.startDate);
  const endDateDisplay = formatDisplayDate(trip.endDate);
  const dateRange = `${startDateDisplay} - ${endDateDisplay}`;

  return {
    id: trip.id,
    ownerUserId: trip.ownerUserId,
    title: trip.title,
    dateRange,
    budget: formatDisplayDecimal(trip.budget),
  };
}
