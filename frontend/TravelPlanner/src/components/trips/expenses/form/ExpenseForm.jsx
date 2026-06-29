import { EXPENSE_CATEGORY_OPTIONS } from "../../../../constants/enums/expenseCategories";
import { Button } from "../../../ui/Button";
import { FieldError } from "../../../ui/FieldError";
import { FormField } from "../../../ui/FormField";

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
        <FormField
          name="title"
          label="Title"
          value={formData.title}
          placeholder="Hotel reservation"
          size="sm"
          surface="soft"
          error={errors.title}
          onChange={onChange}
        />

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

        <FormField
          name="amount"
          label="Amount"
          type="number"
          value={formData.amount}
          min="0.01"
          step="0.01"
          placeholder="0.00"
          size="sm"
          surface="soft"
          error={errors.amount}
          onChange={onChange}
        />

        <FormField
          name="expenseDate"
          label="Expense date"
          type="date"
          value={formData.expenseDate}
          size="sm"
          surface="soft"
          error={errors.expenseDate}
          onChange={onChange}
        />
      </div>

      <div className="mt-3">
        <FormField
          name="description"
          label="Description"
          value={formData.description}
          placeholder="Optional expense description..."
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
