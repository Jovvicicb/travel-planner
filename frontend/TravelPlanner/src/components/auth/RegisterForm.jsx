import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { createRegisterFormModel } from "../../models/auth/registerFormModel";
import { validateRegisterForm } from "../../validation/auth/authValidation";

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, authError } = useAuth();

  const [formData, setFormData] = useState(createRegisterFormModel);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
    <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
      {(submitError || authError) && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {submitError || authError}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="text-sm font-black text-[#2f2924]"
        >
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

        {errors.fullName && (
          <p className="text-sm font-semibold text-red-600">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-black text-[#2f2924]"
        >
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

        {errors.email && (
          <p className="text-sm font-semibold text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-black text-[#2f2924]"
        >
          Password
        </label>

        <div className="flex rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] transition focus-within:border-[#746454] focus-within:ring-4 focus-within:ring-[#746454]/10">
          <input
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            placeholder="Create a password"
            disabled={submitting}
            onChange={handleChange}
            autoComplete="new-password"
            className="min-w-0 flex-1 rounded-l-2xl bg-transparent px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none placeholder:text-[#9a8b7b] disabled:cursor-not-allowed"
          />

          <button
            type="button"
            disabled={submitting}
            onClick={() => setPasswordVisible((current) => !current)}
            className="rounded-r-2xl px-4 text-sm font-black text-[#6f5f48] transition hover:bg-[#eee6dc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm font-semibold text-red-600">
            {errors.password}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-black text-[#2f2924]"
        >
          Confirm password
        </label>

        <div className="flex rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] transition focus-within:border-[#746454] focus-within:ring-4 focus-within:ring-[#746454]/10">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            value={formData.confirmPassword}
            placeholder="Repeat your password"
            disabled={submitting}
            onChange={handleChange}
            autoComplete="new-password"
            className="min-w-0 flex-1 rounded-l-2xl bg-transparent px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none placeholder:text-[#9a8b7b] disabled:cursor-not-allowed"
          />

          <button
            type="button"
            disabled={submitting}
            onClick={() => setConfirmPasswordVisible((current) => !current)}
            className="rounded-r-2xl px-4 text-sm font-black text-[#6f5f48] transition hover:bg-[#eee6dc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {confirmPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-sm font-semibold text-red-600">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl bg-[#4b4036] px-4 py-3 text-sm font-black text-[#f8f3ec] shadow-lg shadow-[#2f2924]/10 transition hover:bg-[#5a4d41] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Creating account..." : "Create account"}
      </button>

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