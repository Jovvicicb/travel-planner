import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { createLoginFormModel } from "../../models/auth/loginFormModel";
import { validateLoginForm } from "../../validation/auth/authValidation";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { PasswordInput } from "../ui/PasswordInput";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, authError } = useAuth();

  const [formData, setFormData] = useState(createLoginFormModel);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateLoginForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");

      await login(formData);

      navigate("/trips", { replace: true });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <Alert type="error" message={submitError || authError} />

      <FormField label="Email" htmlFor="email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="email"
        />
      </FormField>

      <FormField label="Password" htmlFor="password" error={errors.password}>
        <PasswordInput
          id="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </FormField>

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? "Signing in..." : "Sign in"}
      </Button>

      <p className="auth-switch-text">
        Do not have an account? <Link to="/register">Create one</Link>
      </p>
    </form>
  );
}