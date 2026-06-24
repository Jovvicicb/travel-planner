function isEmpty(value) {
  return !value || value.trim() === "";
}

function isNegativeNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return false;
  }

  return Number(value) < 0;
}

export function validateCreateTripForm(data) {
  const errors = {};

  const title = data.title?.trim() || "";
  const description = data.description?.trim() || "";
  const notes = data.notes?.trim() || "";

  if (isEmpty(title)) {
    errors.title = "Title is required.";
  } else if (title.length > 120) {
    errors.title = "Title cannot exceed 120 characters.";
  }

  if (description.length > 1000) {
    errors.description = "Description cannot exceed 1000 characters.";
  }

  if (isEmpty(data.startDate)) {
    errors.startDate = "Start date is required.";
  }

  if (isEmpty(data.endDate)) {
    errors.endDate = "End date is required.";
  }

  if (data.startDate && data.endDate) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (startDate > endDate) {
      errors.endDate = "End date cannot be before start date.";
    }
  }

  if (isNegativeNumber(data.budget)) {
    errors.budget = "Budget cannot be negative.";
  }

  if (notes.length > 2000) {
    errors.notes = "Notes cannot exceed 2000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
