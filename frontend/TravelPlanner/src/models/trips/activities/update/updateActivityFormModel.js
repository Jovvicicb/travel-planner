function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

function toTimeInputValue(value) {
  if (!value) {
    return "";
  }

  return value.toString().slice(0, 5);
}

export function createUpdateActivityFormModel(activity) {
  return {
    title: activity.title || "",
    activityDate: toDateInputValue(activity.activityDate),
    startTime: toTimeInputValue(activity.startTime),
    endTime: toTimeInputValue(activity.endTime),
    location: activity.location || "",
    description: activity.description || "",
    estimatedCost:
      activity.estimatedCost === null || activity.estimatedCost === undefined
        ? ""
        : String(activity.estimatedCost),
    status:
      activity.status === null || activity.status === undefined
        ? "0"
        : String(activity.status),
  };
}
