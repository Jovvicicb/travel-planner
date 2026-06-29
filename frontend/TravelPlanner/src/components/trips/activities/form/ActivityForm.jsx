import { Button } from "../../../ui/Button";
import { FormField } from "../../../ui/FormField";
import { ACTIVITY_STATUS_OPTIONS } from "../../../../constants/enums/activityStatuses";

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
        <FormField
          name="title"
          label="Title"
          value={formData.title}
          placeholder="Boat tour"
          size="sm"
          surface="soft"
          error={errors.title}
          onChange={onChange}
        />

        <FormField
          name="activityDate"
          label="Activity date"
          type="date"
          value={formData.activityDate}
          min={minActivityDate}
          max={maxActivityDate}
          size="sm"
          surface="soft"
          error={errors.activityDate}
          onChange={onChange}
        />

        <FormField
          name="location"
          label="Location"
          value={formData.location}
          placeholder="Old town"
          size="sm"
          surface="soft"
          error={errors.location}
          onChange={onChange}
        />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-4">
        <FormField
          name="startTime"
          label="Start time"
          type="time"
          value={formData.startTime}
          size="sm"
          surface="soft"
          error={errors.startTime}
          onChange={onChange}
        />

        <FormField
          name="endTime"
          label="End time"
          type="time"
          value={formData.endTime}
          min={formData.startTime}
          size="sm"
          surface="soft"
          error={errors.endTime}
          onChange={onChange}
        />

        <FormField
          name="estimatedCost"
          label="Estimated cost"
          type="number"
          value={formData.estimatedCost}
          min="0"
          step="0.01"
          placeholder="0.00"
          size="sm"
          surface="soft"
          error={errors.estimatedCost}
          onChange={onChange}
        />

        <div>
          <label className="text-xs font-black text-[#2f2924]">Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          >
            {ACTIVITY_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          {errors.status && (
            <p className="mt-1 text-xs font-bold text-[#b42318]">
              {errors.status}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3">
        <FormField
          name="description"
          label="Description"
          value={formData.description}
          placeholder="Optional activity description..."
          multiline
          rows={2}
          size="sm"
          surface="soft"
          error={errors.description}
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
