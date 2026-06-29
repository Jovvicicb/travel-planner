function pad(value) {
  return String(value).padStart(2, "0");
}

export function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join("-");
}

export function toTimeInputValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function toDateTimeRequestValue(date, time) {
  if (!date || !time) {
    return "";
  }

  return `${date}T${time}:00`;
}

export function toStartOfDayRequestValue(date) {
  if (!date) {
    return "";
  }

  return `${date}T00:00:00`;
}

export function toEndOfDayRequestValue(date) {
  if (!date) {
    return null;
  }

  return `${date}T23:59:59`;
}

export function toTimeRequestValue(time) {
  if (!time) {
    return "";
  }

  return `${time}:00`;
}
