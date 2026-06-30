export function formatDisplayDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function formatDisplayWeekdayDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function formatDisplayDateTime(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(normalizeUtcDateTime(value)));
}

export function formatDisplayTime(value) {
  if (!value) {
    return "";
  }

  return value.toString().slice(0, 5);
}

export function formatDisplayMoney(value) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDisplayLongDate(value, fallback = "") {
  if (!value) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(value));
}

export function formatDisplayLongDateTime(value, fallback = "") {
  if (!value) return fallback;

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(normalizeUtcDateTime(value)));
}

export function formatDisplayDecimal(value) {
  return new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

function normalizeUtcDateTime(value) {
  if (!value || typeof value !== "string") {
    return value;
  }

  const hasTimezone = value.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(value);

  if (hasTimezone) {
    return value;
  }

  return `${value}Z`;
}
