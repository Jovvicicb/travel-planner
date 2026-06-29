function isEmpty(value) {
  return !value || value.trim() === "";
}

export function validateChecklistItemForm(data) {
  const errors = {};

  const title = data.title?.trim() || "";

  if (isEmpty(title)) {
    errors.title = "Checklist item title is required.";
  } else if (title.length > 150) {
    errors.title = "Checklist item title cannot exceed 150 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
