import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
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
    <Card>
      <form noValidate onSubmit={onSubmit}>
        <div className="space-y-6">
          <section className="border-b-2 border-[#b8a692] pb-6">
            <label className="text-sm font-black text-[#2f2924]">Title</label>

            <p className="mt-1 text-sm font-semibold text-[#7b6b5d]">
              Enter a clear name for this travel plan.
            </p>

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
          </section>

          <section className="border-b-2 border-[#b8a692] pb-6">
            <label className="text-sm font-black text-[#2f2924]">
              Description
            </label>

            <p className="mt-1 text-sm font-semibold text-[#7b6b5d]">
              Write a short summary of what this trip is about.
            </p>

            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows={3}
              placeholder="Short description of your travel plan..."
              className="mt-2 w-full resize-none rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10"
            />

            <div className="mt-2">
              <FieldError message={errors.description} />
            </div>
          </section>

          <section className="border-b-2 border-[#b8a692] pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#2f2924]">
                  Start date
                </label>

                <p className="mt-1 text-sm font-semibold text-[#7b6b5d]">
                  Choose when the travel plan starts.
                </p>

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

                <p className="mt-1 text-sm font-semibold text-[#7b6b5d]">
                  Choose when the travel plan ends.
                </p>

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
          </section>

          <section className="border-b-2 border-[#b8a692] pb-6">
            <label className="text-sm font-black text-[#2f2924]">Budget</label>

            <p className="mt-1 text-sm font-semibold text-[#7b6b5d]">
              Add the planned budget for this trip.
            </p>

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
          </section>

          <section className="border-b-2 border-[#b8a692] pb-6">
            <label className="text-sm font-black text-[#2f2924]">Notes</label>

            <p className="mt-1 text-sm font-semibold text-[#7b6b5d]">
              Add optional notes, ideas or reminders for this travel plan.
            </p>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={onChange}
              rows={4}
              placeholder="Add useful notes, ideas or reminders..."
              className="mt-2 w-full resize-none rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10"
            />

            <div className="mt-2">
              <FieldError message={errors.notes} />
            </div>
          </section>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
    </Card>
  );
}
