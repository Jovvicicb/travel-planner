import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";
import { createRegisterFormModel } from "../../models/auth/registerFormModel";
import { validateRegisterForm } from "../../validation/auth/authValidation";
import { Button } from "../ui/Button";
import { ErrorBox } from "../ui/ErrorBox";
import { FormField } from "../ui/FormField";

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

      const currentUser = await register(formData);

      if (!currentUser) {
        return;
      }

      navigate("/trips", { replace: true });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
      <ErrorBox message={submitError || authError} />

      <FormField
        name="fullName"
        label="Full name"
        value={formData.fullName}
        placeholder="Enter your full name"
        disabled={submitting}
        autoComplete="name"
        error={errors.fullName}
        onChange={handleChange}
      />

      <FormField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        placeholder="Enter your email"
        disabled={submitting}
        autoComplete="email"
        error={errors.email}
        onChange={handleChange}
      />

      <FormField
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        placeholder="Create a password"
        disabled={submitting}
        autoComplete="new-password"
        error={errors.password}
        onChange={handleChange}
      />

      <FormField
        name="confirmPassword"
        label="Confirm password"
        type="password"
        value={formData.confirmPassword}
        placeholder="Repeat your password"
        disabled={submitting}
        autoComplete="new-password"
        error={errors.confirmPassword}
        onChange={handleChange}
      />

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm font-semibold text-[#7b6b5d]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-black text-[#4b4036] underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
