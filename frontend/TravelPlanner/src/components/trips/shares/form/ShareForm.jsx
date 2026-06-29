import { SHARE_ACCESS_LEVEL_OPTIONS } from "../../../../constants/enums/shareAccessLevels";
import { Button } from "../../../ui/Button";
import { FieldError } from "../../../ui/FieldError";
import { FormField } from "../../../ui/FormField";

export function ShareForm({
  formData,
  errors,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5"
    >
      <div className="mb-4 border-b border-[#d6c8b8] pb-3">
        <h3 className="text-sm font-black text-[#2f2924]">Create share link</h3>

        <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
          Generate a link and QR code that another user can use to open this
          travel plan.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-xs font-black text-[#2f2924]">
            Access level
          </label>

          <select
            name="accessLevel"
            value={formData.accessLevel}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          >
            {SHARE_ACCESS_LEVEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="mt-1">
            <FieldError message={errors.accessLevel} />
          </div>
        </div>

        <FormField
          name="expiresAt"
          label="Expiration date"
          type="date"
          value={formData.expiresAt}
          helperText="Leave empty if the link should not expire."
          size="sm"
          surface="soft"
          error={errors.expiresAt}
          onChange={onChange}
        />
      </div>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={submitting}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? "Creating..." : "Create share link"}
        </Button>
      </div>
    </form>
  );
}
