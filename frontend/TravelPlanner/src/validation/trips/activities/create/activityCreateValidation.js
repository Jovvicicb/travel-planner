function isEmpty(value) {
  return !value || value.trim() === "";
}

function isNegativeNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return false;
  }

  return Number(value) < 0;
}

function toDateOnly(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  date.setHours(0, 0, 0, 0);

  return date;
}

export function validateCreateActivityForm(data, destination) {
  const errors = {};

  const title = data.title?.trim() || "";
  const location = data.location?.trim() || "";
  const description = data.description?.trim() || "";
  const status = Number(data.status);

  if (!destination) {
    errors.destination = "Destination is required.";
  }

  if (isEmpty(title)) {
    errors.title = "Activity title is required.";
  } else if (title.length > 120) {
    errors.title = "Activity title cannot exceed 120 characters.";
  }

  if (isEmpty(data.activityDate)) {
    errors.activityDate = "Activity date is required.";
  } else if (destination) {
    const activityDate = toDateOnly(data.activityDate);
    const destinationStartDate = toDateOnly(destination.startDate);
    const destinationEndDate = toDateOnly(destination.endDate);

    if (destinationStartDate && activityDate < destinationStartDate) {
      errors.activityDate =
        "Activity date cannot be before destination start date.";
    }

    if (destinationEndDate && activityDate > destinationEndDate) {
      errors.activityDate =
        "Activity date cannot be after destination end date.";
    }
  }

  if (isEmpty(data.startTime)) {
    errors.startTime = "Start time is required.";
  }

  if (isEmpty(data.endTime)) {
    errors.endTime = "End time is required.";
  }

  if (data.startTime && data.endTime && data.startTime >= data.endTime) {
    errors.endTime = "End time must be after start time.";
  }

  if (isEmpty(location)) {
    errors.location = "Activity location is required.";
  } else if (location.length > 200) {
    errors.location = "Activity location cannot exceed 200 characters.";
  }

  if (description.length > 1000) {
    errors.description = "Activity description cannot exceed 1000 characters.";
  }

  if (isNegativeNumber(data.estimatedCost)) {
    errors.estimatedCost = "Estimated cost cannot be negative.";
  }

  if (
    data.status === "" ||
    Number.isNaN(status) ||
    ![0, 1, 2, 3].includes(status)
  ) {
    errors.status = "Activity status is not valid.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
