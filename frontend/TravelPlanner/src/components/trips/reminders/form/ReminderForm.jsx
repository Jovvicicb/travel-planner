import { Button } from "../../../ui/Button";
import { FieldError } from "../../../ui/FieldError";

export function ReminderForm({
  formData,
  errors,
  submitting,
  submitLabel,
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
        <h3 className="text-sm font-black text-[#2f2924]">Create reminder</h3>

        <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
          Set a future local date and time for this travel plan reminder.
        </p>
      </div>

      <div className="grid gap-3">
        <div>
          <label className="text-xs font-black text-[#2f2924]">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Check flight documents"
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.title} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            placeholder="Optional reminder details"
            rows={2}
            onChange={onChange}
            className="mt-1.5 w-full resize-none rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.description} />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs font-black text-[#2f2924]">Date</label>

            <input
              type="date"
              name="reminderDate"
              value={formData.reminderDate}
              onChange={onChange}
              className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
            />

            <div className="mt-1">
              <FieldError message={errors.reminderDate} />
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-[#2f2924]">Time</label>

            <input
              type="time"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={onChange}
              className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
            />

            <div className="mt-1">
              <FieldError message={errors.reminderTime} />
            </div>
          </div>
        </div>
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
          {submitting ? "Creating..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
