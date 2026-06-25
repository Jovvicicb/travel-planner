import { Button } from "../../../ui/Button";
import { FieldError } from "../../../ui/FieldError";

function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

export function ActivityForm({
  formData,
  errors,
  destination,
  submitting,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}) {
  const minActivityDate = destination
    ? toDateInputValue(destination.startDate)
    : "";

  const maxActivityDate = destination
    ? toDateInputValue(destination.endDate)
    : "";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5"
    >
      <div className="mb-4 border-b border-[#d6c8b8] pb-3">
        <h3 className="text-sm font-black text-[#2f2924]">Activity details</h3>
        <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
          Add activity information inside the selected destination date range.
        </p>
      </div>

      <div className="grid gap-3 xl:grid-cols-3">
        <div>
          <label className="text-xs font-black text-[#2f2924]">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Boat tour"
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.title} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">
            Activity date
          </label>

          <input
            type="date"
            name="activityDate"
            value={formData.activityDate}
            onChange={onChange}
            min={minActivityDate}
            max={maxActivityDate}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.activityDate} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">Location</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Old town"
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.location} />
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-4">
        <div>
          <label className="text-xs font-black text-[#2f2924]">
            Start time
          </label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.startTime} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">End time</label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={onChange}
            min={formData.startTime}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.endTime} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">
            Estimated cost
          </label>

          <input
            type="number"
            name="estimatedCost"
            value={formData.estimatedCost}
            onChange={onChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.estimatedCost} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          >
            <option value="0">Planned</option>
            <option value="1">Reserved</option>
            <option value="2">Completed</option>
            <option value="3">Cancelled</option>
          </select>

          <div className="mt-1">
            <FieldError message={errors.status} />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <label className="text-xs font-black text-[#2f2924]">Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={2}
          placeholder="Optional activity description..."
          className="mt-1.5 w-full resize-none rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
        />

        <div className="mt-1">
          <FieldError message={errors.description} />
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
