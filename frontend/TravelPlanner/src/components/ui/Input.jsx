export function Input({
  id,
  name,
  type = "text",
  value,
  placeholder,
  disabled = false,
  onChange,
  autoComplete,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      autoComplete={autoComplete}
      className="form-input"
    />
  );
}