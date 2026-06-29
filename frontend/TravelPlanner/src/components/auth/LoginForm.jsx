import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  getPendingSharedTripRedirect,
  removePendingSharedTripRedirect,
} from "../../helpers/sharedTripRedirectHelper";
import { useAuth } from "../../hooks/auth/useAuth";
import { createLoginFormModel } from "../../models/auth/loginFormModel";
import { validateLoginForm } from "../../validation/auth/authValidation";
import { Button } from "../ui/Button";
import { ErrorBox } from "../ui/ErrorBox";
import { FormField } from "../ui/FormField";

export function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, authError } = useAuth();

  const [formData, setFormData] = useState(createLoginFormModel);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function getSafeRedirectPath(currentUser) {
    const redirectFromUrl = searchParams.get("redirect");
    const redirectFromStorage = getPendingSharedTripRedirect();

    const redirectPath = redirectFromUrl || redirectFromStorage || "/trips";

    if (!redirectPath.startsWith("/")) {
      return "/trips";
    }

    if (redirectPath.startsWith("/admin") && currentUser.role !== 1) {
      return "/trips";
    }

    return redirectPath;
  }

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

      const currentUser = await login(formData);

      if (!currentUser) {
        return;
      }

      const redirectPath = getSafeRedirectPath(currentUser);

      removePendingSharedTripRedirect();

      navigate(redirectPath, { replace: true });
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
        placeholder="Enter your password"
        disabled={submitting}
        autoComplete="current-password"
        error={errors.password}
        onChange={handleChange}
      />

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm font-semibold text-[#7b6b5d]">
        Do not have an account?{" "}
        <Link
          to="/register"
          className="font-black text-[#4b4036] underline-offset-4 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
