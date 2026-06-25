import { Button } from "../../../ui/Button";
import { FieldError } from "../../../ui/FieldError";

function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

export function DestinationForm({
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
          <h3 className="text-sm font-black text-[#2f2924]">Add destination</h3>
          <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
            Dates must stay inside the travel plan range.
          </p>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-4">
        <div>
          <label className="text-xs font-black text-[#2f2924]">Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Santorini"
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.name} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">Location</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Greece"
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.location} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">
            Start date
          </label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            min={travelPlanStartDate}
            max={travelPlanEndDate}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.startDate} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">End date</label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={onChange}
            min={minimumEndDate}
            max={travelPlanEndDate}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.endDate} />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <label className="text-xs font-black text-[#2f2924]">Notes</label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={onChange}
          rows={2}
          placeholder="Optional notes..."
          className="mt-1.5 w-full resize-none rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
        />

        <div className="mt-1">
          <FieldError message={errors.notes} />
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
