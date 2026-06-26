export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function toDateKey(value) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

export function formatMonthTitle(date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function getMondayBasedStartIndex(date) {
  const day = date.getDay();

  return day === 0 ? 6 : day - 1;
}

export function getInitialCalendarMonth(trip, calendarDays) {
  if (trip?.startDate) {
    return new Date(trip.startDate);
  }

  if (calendarDays.length > 0) {
    return new Date(calendarDays[0].date);
  }

  return new Date();
}

export function buildActivitiesByDate(calendarDays) {
  return calendarDays.reduce((result, calendarDay) => {
    result[toDateKey(calendarDay.date)] = calendarDay.activities || [];

    return result;
  }, {});
}

export function isDateKeyInRange(dateKey, startDate, endDate) {
  if (!dateKey || !startDate || !endDate) {
    return false;
  }

  const currentDate = new Date(`${dateKey}T00:00:00`);
  const start = new Date(toDateKey(startDate));
  const end = new Date(toDateKey(endDate));

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return currentDate >= start && currentDate <= end;
}

export function getDestinationsForDate(dateKey, destinations) {
  return destinations.filter((destination) =>
    isDateKeyInRange(dateKey, destination.startDate, destination.endDate),
  );
}

export function buildCalendarCells({
  currentMonth,
  activitiesByDate,
  trip,
  destinations,
}) {
  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();

  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const startIndex = getMondayBasedStartIndex(firstDay);

  const cells = [];

  for (let i = 0; i < startIndex; i += 1) {
    cells.push({
      key: `empty-${i}`,
      dayNumber: "",
      dateKey: "",
      activities: [],
      destinations: [],
      isTripDay: false,
      empty: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;

    const cellDestinations = getDestinationsForDate(dateKey, destinations);

    cells.push({
      key: dateKey,
      dayNumber: day,
      dateKey,
      activities: activitiesByDate[dateKey] || [],
      destinations: cellDestinations,
      isTripDay: isDateKeyInRange(dateKey, trip?.startDate, trip?.endDate),
      empty: false,
    });
  }

  return cells;
}
