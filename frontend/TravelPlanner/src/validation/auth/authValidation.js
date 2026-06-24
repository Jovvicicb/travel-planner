function isEmpty(value) {
  return !value || value.trim() === "";
}

function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function hasUppercaseLetter(value) {
  return /[A-Z]/.test(value);
}

function hasLowercaseLetter(value) {
  return /[a-z]/.test(value);
}

function hasNumber(value) {
  return /\d/.test(value);
}

export function validateLoginForm(data) {
  const errors = {};

  const normalizedEmail = data.email?.trim() || "";

  if (isEmpty(normalizedEmail)) {
    errors.email = "Email is required.";
  } else if (normalizedEmail.length > 150) {
    errors.email = "Email cannot be longer than 150 characters.";
  } else if (!isValidEmail(normalizedEmail)) {
    errors.email = "Email format is not valid.";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRegisterForm(data) {
  const errors = {};

  const normalizedFullName = data.fullName?.trim() || "";
  const normalizedEmail = data.email?.trim() || "";

  if (isEmpty(normalizedFullName)) {
    errors.fullName = "Full name is required.";
  } else if (normalizedFullName.length < 2) {
    errors.fullName = "Full name must contain at least 2 characters.";
  } else if (normalizedFullName.length > 100) {
    errors.fullName = "Full name cannot be longer than 100 characters.";
  }

  if (isEmpty(normalizedEmail)) {
    errors.email = "Email is required.";
  } else if (normalizedEmail.length > 150) {
    errors.email = "Email cannot be longer than 150 characters.";
  } else if (!isValidEmail(normalizedEmail)) {
    errors.email = "Email format is not valid.";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password must contain at least 8 characters.";
  } else if (!hasUppercaseLetter(data.password)) {
    errors.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercaseLetter(data.password)) {
    errors.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber(data.password)) {
    errors.password = "Password must contain at least one number.";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
