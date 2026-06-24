import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { createRegisterFormModel } from "../../models/auth/registerFormModel";
import { validateRegisterForm } from "../../validation/auth/authValidation";
import { Button } from "../ui/Button";
import { FieldError } from "../ui/FieldError";
import { ErrorBox } from "../ui/ErrorBox";

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
    <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
      <ErrorBox message={submitError || authError} />

      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-black text-[#2f2924]">
          Full name
        </label>

        <input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          placeholder="Enter your full name"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="name"
          className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
        />

        <FieldError message={errors.fullName} />
      </div>

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
          placeholder="Create a password"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
        />

        <FieldError message={errors.password} />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-black text-[#2f2924]"
        >
          Confirm password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          placeholder="Repeat your password"
          disabled={submitting}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
        />

        <FieldError message={errors.confirmPassword} />
      </div>

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
