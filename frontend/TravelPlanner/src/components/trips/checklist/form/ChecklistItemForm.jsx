import { Button } from "../../../ui/Button";
import { FormField } from "../../../ui/FormField";

export function ChecklistItemForm({
  formData,
  errors,
  submitting,
  submitLabel,
  showCompletedField = false,
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
        <h3 className="text-sm font-black text-[#2f2924]">Checklist item</h3>

        <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
          Add a task that should be completed before or during the trip.
        </p>
      </div>

      <FormField
        name="title"
        label="Title"
        value={formData.title}
        placeholder="Pack passport"
        size="sm"
        surface="soft"
        error={errors.title}
        onChange={onChange}
      />

      {showCompletedField && (
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-[#d6c8b8] bg-[#f8f3ec] p-3">
          <input
            type="checkbox"
            name="isCompleted"
            checked={formData.isCompleted}
            onChange={onChange}
            className="h-4 w-4 accent-[#6f5f48]"
          />

          <span className="text-sm font-black text-[#2f2924]">
            Mark item as completed
          </span>
        </label>
      )}

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
