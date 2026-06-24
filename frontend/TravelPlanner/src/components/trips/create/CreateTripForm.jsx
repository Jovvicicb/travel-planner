import { Button } from "../../ui/Button";
import { FieldError } from "../../ui/FieldError";

export function CreateTripForm({
  formData,
  errors,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-2 lg:col-span-2">
          <label htmlFor="title" className="text-sm font-black text-[#2f2924]">
            Title
          </label>

          <input
            id="title"
            name="title"
            value={formData.title}
            placeholder="Example: Greece summer trip"
            disabled={submitting}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
          />

          <FieldError message={errors.title} />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="startDate"
            className="text-sm font-black text-[#2f2924]"
          >
            Start date
          </label>

          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            disabled={submitting}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
          />

          <FieldError message={errors.startDate} />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endDate"
            className="text-sm font-black text-[#2f2924]"
          >
            End date
          </label>

          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            disabled={submitting}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
          />

          <FieldError message={errors.endDate} />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label htmlFor="budget" className="text-sm font-black text-[#2f2924]">
            Budget
          </label>

          <input
            id="budget"
            name="budget"
            type="number"
            value={formData.budget}
            placeholder="Example: 1200"
            disabled={submitting}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
          />

          <FieldError message={errors.budget} />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label
            htmlFor="description"
            className="text-sm font-black text-[#2f2924]"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            placeholder="Short description of your travel plan"
            disabled={submitting}
            onChange={onChange}
            className="w-full resize-none rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
          />

          <FieldError message={errors.description} />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label htmlFor="notes" className="text-sm font-black text-[#2f2924]">
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={formData.notes}
            placeholder="Private notes, ideas or important details"
            disabled={submitting}
            onChange={onChange}
            className="w-full resize-none rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]"
          />

          <FieldError message={errors.notes} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          disabled={submitting}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Create travel plan"}
        </Button>
      </div>
    </form>
  );
}
