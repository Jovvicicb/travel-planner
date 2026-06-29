import {
  formatDisplayDecimal,
  formatDisplayLongDate,
  formatDisplayLongDateTime,
} from "../../../helpers/display/displayFormatHelper";

export function toTripDetailsDisplayModel(trip) {
  const startDateDisplay = formatDisplayLongDate(trip.startDate, "Not set");
  const endDateDisplay = formatDisplayLongDate(trip.endDate, "Not set");
  const dateRange = `${startDateDisplay} - ${endDateDisplay}`;

  return {
    id: trip.id,
    ownerUserId: trip.ownerUserId,
    title: trip.title,
    description: trip.description || "No description provided.",
    startDate: startDateDisplay,
    endDate: endDateDisplay,
    dateRange,
    budget: formatDisplayDecimal(trip.budget),
    notes: trip.notes || "No notes added.",
    createdAt: formatDisplayLongDateTime(trip.createdAt, "Not created yet"),
    updatedAt: formatDisplayLongDateTime(trip.updatedAt, "Not updated yet"),
  };
}
