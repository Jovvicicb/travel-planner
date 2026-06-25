function isEmpty(value) {
  return !value || value.trim() === "";
}

function toDateOnly(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  date.setHours(0, 0, 0, 0);

  return date;
}

export function validateCreateDestinationForm(data, travelPlan) {
  const errors = {};

  const name = data.name?.trim() || "";
  const location = data.location?.trim() || "";
  const notes = data.notes?.trim() || "";

  const travelPlanStartDate = toDateOnly(travelPlan?.startDate);
  const travelPlanEndDate = toDateOnly(travelPlan?.endDate);

  if (isEmpty(name)) {
    errors.name = "Destination name is required.";
  } else if (name.length > 120) {
    errors.name = "Destination name cannot exceed 120 characters.";
  }

  if (isEmpty(location)) {
    errors.location = "Location is required.";
  } else if (location.length > 200) {
    errors.location = "Location cannot exceed 200 characters.";
  }

  if (isEmpty(data.startDate)) {
    errors.startDate = "Start date is required.";
  }

  if (isEmpty(data.endDate)) {
    errors.endDate = "End date is required.";
  }

  if (data.startDate && data.endDate) {
    const startDate = toDateOnly(data.startDate);
    const endDate = toDateOnly(data.endDate);

    if (startDate > endDate) {
      errors.endDate = "End date cannot be before start date.";
    }

    if (travelPlanStartDate && startDate < travelPlanStartDate) {
      errors.startDate =
        "Destination start date cannot be before travel plan start date.";
    }

    if (travelPlanEndDate && endDate > travelPlanEndDate) {
      errors.endDate =
        "Destination end date cannot be after travel plan end date.";
    }
  }

  if (notes.length > 2000) {
    errors.notes = "Notes cannot exceed 2000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
