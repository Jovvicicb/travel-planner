function pad(value) {
  return String(value).padStart(2, "0");
}

function toDateInputValue(value) {
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

function toTimeInputValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function toUpdateReminderFormModel(reminder) {
  return {
    title: reminder?.title || "",
    description: reminder?.description || "",
    reminderDate: toDateInputValue(reminder?.reminderAt),
    reminderTime: toTimeInputValue(reminder?.reminderAt),
  };
}
