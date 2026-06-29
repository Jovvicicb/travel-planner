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

function validateEmailField(email) {
  if (isEmpty(email)) {
    return "Email is required.";
  }

  if (email.length > 150) {
    return "Email cannot be longer than 150 characters.";
  }

  if (!isValidEmail(email)) {
    return "Email format is not valid.";
  }

  return "";
}

function validatePasswordField(password) {
  if (isEmpty(password)) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  if (!hasUppercaseLetter(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!hasLowercaseLetter(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!hasNumber(password)) {
    return "Password must contain at least one number.";
  }

  return "";
}

export function validateLoginForm(data) {
  const errors = {};

  const normalizedEmail = data.email?.trim() || "";
  const emailError = validateEmailField(normalizedEmail);

  if (emailError) {
    errors.email = emailError;
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
  const emailError = validateEmailField(normalizedEmail);
  const passwordError = validatePasswordField(data.password);

  if (isEmpty(normalizedFullName)) {
    errors.fullName = "Full name is required.";
  } else if (normalizedFullName.length < 2) {
    errors.fullName = "Full name must contain at least 2 characters.";
  } else if (normalizedFullName.length > 100) {
    errors.fullName = "Full name cannot be longer than 100 characters.";
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
