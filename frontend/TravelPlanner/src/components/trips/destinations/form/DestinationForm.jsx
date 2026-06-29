import { Button } from "../../../ui/Button";
import { FormField } from "../../../ui/FormField";

function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

export function DestinationForm({
  formTitle,
  formDescription,
  formData,
  errors,
  travelPlan,
  submitting,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}) {
  const travelPlanStartDate = toDateInputValue(travelPlan.startDate);
  const travelPlanEndDate = toDateInputValue(travelPlan.endDate);
  const minimumEndDate = formData.startDate || travelPlanStartDate;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5"
    >
      <div className="mb-3 flex flex-col justify-between gap-2 border-b border-[#d6c8b8] pb-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-sm font-black text-[#2f2924]">{formTitle}</h3>

          {formDescription && (
            <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
              {formDescription}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-4">
        <FormField
          name="name"
          label="Name"
          value={formData.name}
          placeholder="Santorini"
          size="sm"
          surface="soft"
          error={errors.name}
          onChange={onChange}
        />

        <FormField
          name="location"
          label="Location"
          value={formData.location}
          placeholder="Greece"
          size="sm"
          surface="soft"
          error={errors.location}
          onChange={onChange}
        />

        <FormField
          name="startDate"
          label="Start date"
          type="date"
          value={formData.startDate}
          min={travelPlanStartDate}
          max={travelPlanEndDate}
          size="sm"
          surface="soft"
          error={errors.startDate}
          onChange={onChange}
        />

        <FormField
          name="endDate"
          label="End date"
          type="date"
          value={formData.endDate}
          min={minimumEndDate}
          max={travelPlanEndDate}
          size="sm"
          surface="soft"
          error={errors.endDate}
          onChange={onChange}
        />
      </div>

      <div className="mt-3">
        <FormField
          name="notes"
          label="Notes"
          value={formData.notes}
          placeholder="Optional notes..."
          multiline
          rows={2}
          size="sm"
          surface="soft"
          error={errors.notes}
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
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
