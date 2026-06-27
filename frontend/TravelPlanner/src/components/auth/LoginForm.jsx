import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { createLoginFormModel } from "../../models/auth/loginFormModel";
import { validateLoginForm } from "../../validation/auth/authValidation";
import {
  getPendingSharedTripRedirect,
  removePendingSharedTripRedirect,
} from "../../helpers/sharedTripRedirectHelper";
import { Button } from "../ui/Button";
import { FieldError } from "../ui/FieldError";
import { ErrorBox } from "../ui/ErrorBox";

export function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, authError } = useAuth();

  const [formData, setFormData] = useState(createLoginFormModel);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function getSafeRedirectPath() {
    const redirectFromUrl = searchParams.get("redirect");
    const redirectFromStorage = getPendingSharedTripRedirect();

    const redirectPath = redirectFromUrl || redirectFromStorage || "/trips";

    if (!redirectPath.startsWith("/")) {
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

      await login(formData);

      const redirectPath = getSafeRedirectPath();

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

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-black text-[#2f2924]">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="email"
          className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
        />

        <FieldError message={errors.email} />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-black text-[#2f2924]">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          placeholder="Enter your password"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="current-password"
          className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
        />

        <FieldError message={errors.password} />
      </div>

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
