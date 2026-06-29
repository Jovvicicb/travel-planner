import { FieldError } from "./FieldError";

const labelClassNames = {
  sm: "text-xs font-black text-[#2f2924]",
  md: "text-sm font-black text-[#2f2924]",
};

const helperTextClassNames = {
  sm: "mt-1 text-xs font-semibold text-[#7b6b5d]",
  md: "mt-1 text-sm font-semibold text-[#7b6b5d]",
};

const inputSizeClassNames = {
  sm: "mt-1.5 rounded-xl px-3 py-2 text-sm focus:ring-2",
  md: "mt-2 rounded-2xl px-4 py-3 text-sm focus:ring-4",
};

const inputSurfaceClassNames = {
  soft: "bg-[#f8f3ec]",
  light: "bg-[#fffaf3]",
};

const baseInputClassName =
  "w-full border border-[#d6c8b8] font-semibold text-[#2f2924] outline-none transition placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-[#746454]/10 disabled:cursor-not-allowed disabled:bg-[#eee6dc]";

export function FormField({
  id,
  name,
  label,
  helperText,
  type = "text",
  value,
  error,
  size = "md",
  surface = "light",
  multiline = false,
  rows = 3,
  onChange,
  ...fieldProps
}) {
  const fieldId = id || name;

  const fieldClassName = [
    baseInputClassName,
    inputSizeClassNames[size],
    inputSurfaceClassNames[surface],
    multiline ? "resize-none" : "",
  ].join(" ");

  return (
    <div className="space-y-2">
      <div>
        <label htmlFor={fieldId} className={labelClassNames[size]}>
          {label}
        </label>

        {helperText && (
          <p className={helperTextClassNames[size]}>{helperText}</p>
        )}
      </div>

      {multiline ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          rows={rows}
          onChange={onChange}
          className={fieldClassName}
          {...fieldProps}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={fieldClassName}
          {...fieldProps}
        />
      )}

      <FieldError message={error} />
    </div>
  );
}
