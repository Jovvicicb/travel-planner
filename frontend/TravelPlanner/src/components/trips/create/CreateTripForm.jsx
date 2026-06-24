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
          <label
            htmlFor="title"
            className="text-sm font-black text-[#2f2924]"
          >
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

          {errors.title && (
            <p className="text-sm font-semibold text-red-600">
              {errors.title}
            </p>
          )}
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

          {errors.startDate && (
            <p className="text-sm font-semibold text-red-600">
              {errors.startDate}
            </p>
          )}
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

          {errors.endDate && (
            <p className="text-sm font-semibold text-red-600">
              {errors.endDate}
            </p>
          )}
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label
            htmlFor="budget"
            className="text-sm font-black text-[#2f2924]"
          >
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

          {errors.budget && (
            <p className="text-sm font-semibold text-red-600">
              {errors.budget}
            </p>
          )}
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

          {errors.description && (
            <p className="text-sm font-semibold text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label
            htmlFor="notes"
            className="text-sm font-black text-[#2f2924]"
          >
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

          {errors.notes && (
            <p className="text-sm font-semibold text-red-600">
              {errors.notes}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={submitting}
          onClick={onCancel}
          className="rounded-2xl border border-[#d6c8b8] bg-[#f8f3ec] px-5 py-3 text-sm font-black text-[#4b4036] transition hover:bg-[#eee6dc] disabled:cursor-not-allowed disabled:opacity-70"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-2xl bg-[#4b4036] px-5 py-3 text-sm font-black text-[#f8f3ec] shadow-lg shadow-[#2f2924]/10 transition hover:bg-[#5a4d41] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Saving..." : "Create travel plan"}
        </button>
      </div>
    </form>
  );
}