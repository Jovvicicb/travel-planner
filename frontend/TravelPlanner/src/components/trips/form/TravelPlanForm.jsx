import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { FormField } from "../../ui/FormField";

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
            <FormField
              name="title"
              label="Title"
              value={formData.title}
              placeholder="Summer trip to Greece"
              helperText="Enter a clear name for this travel plan."
              error={errors.title}
              onChange={onChange}
            />
          </section>

          <section className="border-b-2 border-[#b8a692] pb-6">
            <FormField
              name="description"
              label="Description"
              value={formData.description}
              placeholder="Short description of your travel plan..."
              helperText="Write a short summary of what this trip is about."
              multiline
              rows={3}
              error={errors.description}
              onChange={onChange}
            />
          </section>

          <section className="border-b-2 border-[#b8a692] pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                name="startDate"
                label="Start date"
                type="date"
                value={formData.startDate}
                helperText="Choose when the travel plan starts."
                min={today}
                error={errors.startDate}
                onChange={onChange}
              />

              <FormField
                name="endDate"
                label="End date"
                type="date"
                value={formData.endDate}
                helperText="Choose when the travel plan ends."
                min={minimumEndDate}
                error={errors.endDate}
                onChange={onChange}
              />
            </div>
          </section>

          <section className="border-b-2 border-[#b8a692] pb-6">
            <FormField
              name="budget"
              label="Budget"
              type="number"
              value={formData.budget}
              placeholder="0.00"
              helperText="Add the planned budget for this trip."
              min="0"
              step="0.01"
              error={errors.budget}
              onChange={onChange}
            />
          </section>

          <section className="border-b-2 border-[#b8a692] pb-6">
            <FormField
              name="notes"
              label="Notes"
              value={formData.notes}
              placeholder="Add useful notes, ideas or reminders..."
              helperText="Add optional notes, ideas or reminders for this travel plan."
              multiline
              rows={4}
              error={errors.notes}
              onChange={onChange}
            />
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
