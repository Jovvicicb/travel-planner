function toDateEndOfDay(value) {
  if (!value) {
    return null;
  }

  return new Date(`${value}T23:59:59`);
}

export function validateCreateShareForm(data) {
  const errors = {};

  const accessLevel = Number(data.accessLevel);

  if (
    data.accessLevel === "" ||
    Number.isNaN(accessLevel) ||
    ![0, 1].includes(accessLevel)
  ) {
    errors.accessLevel = "Share access level is not valid.";
  }

  if (data.expiresAt) {
    const expiresAt = toDateEndOfDay(data.expiresAt);
    const now = new Date();

    if (expiresAt <= now) {
      errors.expiresAt = "Share expiration date must be in the future.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
