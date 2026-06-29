import { Button } from "../../../ui/Button";
import { FormField } from "../../../ui/FormField";

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
        <h3 className="text-sm font-black text-[#2f2924]">Reminder details</h3>

        <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
          Set a future local date and time for this travel plan reminder.
        </p>
      </div>

      <div className="grid gap-3">
        <FormField
          name="title"
          label="Title"
          value={formData.title}
          placeholder="Check flight documents"
          size="sm"
          surface="soft"
          error={errors.title}
          onChange={onChange}
        />

        <FormField
          name="description"
          label="Description"
          value={formData.description}
          placeholder="Optional reminder details"
          multiline
          rows={2}
          size="sm"
          surface="soft"
          error={errors.description}
          onChange={onChange}
        />

        <div className="grid gap-3 md:grid-cols-2">
          <FormField
            name="reminderDate"
            label="Date"
            type="date"
            value={formData.reminderDate}
            size="sm"
            surface="soft"
            error={errors.reminderDate}
            onChange={onChange}
          />

          <FormField
            name="reminderTime"
            label="Time"
            type="time"
            value={formData.reminderTime}
            size="sm"
            surface="soft"
            error={errors.reminderTime}
            onChange={onChange}
          />
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
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
