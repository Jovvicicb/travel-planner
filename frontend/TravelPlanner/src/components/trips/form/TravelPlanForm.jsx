import { Button } from "../../ui/Button";
import { FieldError } from "../../ui/FieldError";

export function TravelPlanForm({
  formData,
  errors,
  submitting,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}) {
  const today = new Date().toISOString().split("T")[0];
  const minimumEndDate = formData.startDate || today;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-6 shadow-sm shadow-[#2f2924]/5"
    >
      <div className="grid gap-5">
        <div>
          <label className="text-sm font-black text-[#2f2924]">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Summer trip to Greece"
            className="mt-2 w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10"
          />

          <div className="mt-2">
            <FieldError message={errors.title} />
          </div>
        </div>

        <div>
          <label className="text-sm font-black text-[#2f2924]">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            rows={4}
            placeholder="Short description of your travel plan..."
            className="mt-2 w-full resize-none rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10"
          />

          <div className="mt-2">
            <FieldError message={errors.description} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-black text-[#2f2924]">
              Start date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={onChange}
              min={today}
              className="mt-2 w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10"
            />

            <div className="mt-2">
              <FieldError message={errors.startDate} />
            </div>
          </div>

          <div>
            <label className="text-sm font-black text-[#2f2924]">
              End date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={onChange}
              min={minimumEndDate}
              className="mt-2 w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10"
            />

            <div className="mt-2">
              <FieldError message={errors.endDate} />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-black text-[#2f2924]">Budget</label>

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={onChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="mt-2 w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10"
          />

          <div className="mt-2">
            <FieldError message={errors.budget} />
          </div>
        </div>

        <div>
          <label className="text-sm font-black text-[#2f2924]">Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={onChange}
            rows={5}
            placeholder="Add useful notes, ideas or reminders..."
            className="mt-2 w-full resize-none rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10"
          />

          <div className="mt-2">
            <FieldError message={errors.notes} />
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          disabled={submitting}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
