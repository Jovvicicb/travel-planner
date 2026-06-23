import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { createRegisterFormModel } from "../../models/auth/registerFormModel";
import { validateRegisterForm } from "../../validation/auth/authValidation";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { PasswordInput } from "../ui/PasswordInput";

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, authError } = useAuth();

  const [formData, setFormData] = useState(createRegisterFormModel);
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

        const validation = validateRegisterForm(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        try {
            setSubmitting(true);
            setSubmitError("");

            await register(formData);

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

      <FormField label="Full name" htmlFor="fullName" error={errors.fullName}>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          placeholder="Enter your full name"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="name"
        />
      </FormField>

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
          placeholder="Create a password"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="new-password"
        />
      </FormField>

      <FormField
        label="Confirm password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword}
      >
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Repeat your password"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="new-password"
        />
      </FormField>

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="auth-switch-text">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
}