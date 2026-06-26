import { EXPENSE_CATEGORY_OPTIONS } from "../../../../constants/enums/expenseCategories";
import { Button } from "../../../ui/Button";
import { FieldError } from "../../../ui/FieldError";

export function ExpenseForm({
  formData,
  errors,
  submitting,
  submitLabel,
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
        <h3 className="text-sm font-black text-[#2f2924]">Expense details</h3>
        <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
          Add a travel expense and assign it to a budget category.
        </p>
      </div>

      <div className="grid gap-3 xl:grid-cols-4">
        <div>
          <label className="text-xs font-black text-[#2f2924]">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Hotel reservation"
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.title} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          >
            {EXPENSE_CATEGORY_OPTIONS.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <div className="mt-1">
            <FieldError message={errors.category} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">Amount</label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={onChange}
            min="0.01"
            step="0.01"
            placeholder="0.00"
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.amount} />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-[#2f2924]">
            Expense date
          </label>

          <input
            type="date"
            name="expenseDate"
            value={formData.expenseDate}
            onChange={onChange}
            className="mt-1.5 w-full rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#2f2924] outline-none transition focus:border-[#746454] focus:ring-2 focus:ring-[#746454]/10"
          />

          <div className="mt-1">
            <FieldError message={errors.expenseDate} />
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
          placeholder="Optional expense description..."
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
