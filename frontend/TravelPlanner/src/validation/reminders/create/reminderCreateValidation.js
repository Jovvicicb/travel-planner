export function validateCreateReminderForm(data) {
  const errors = {};

  const title = data.title?.trim() || "";
  const description = data.description?.trim() || "";
  const reminderDate = data.reminderDate?.trim() || "";
  const reminderTime = data.reminderTime?.trim() || "";

  if (!title) {
    errors.title = "Reminder title is required.";
  } else if (title.length > 150) {
    errors.title = "Reminder title cannot exceed 150 characters.";
  }

  if (description.length > 1000) {
    errors.description = "Reminder description cannot exceed 1000 characters.";
  }

  if (!reminderDate) {
    errors.reminderDate = "Reminder date is required.";
  }

  if (!reminderTime) {
    errors.reminderTime = "Reminder time is required.";
  }

  if (reminderDate && reminderTime) {
    const reminderAt = new Date(`${reminderDate}T${reminderTime}:00`);
    const now = new Date();

    if (Number.isNaN(reminderAt.getTime())) {
      errors.reminderDate = "Reminder date and time are not valid.";
    } else if (reminderAt <= now) {
      errors.reminderTime = "Reminder date and time must be in the future.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
