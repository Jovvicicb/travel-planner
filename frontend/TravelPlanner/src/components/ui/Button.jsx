export function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  onClick,
}) {
  const className = [
    "btn",
    `btn-${variant}`,
    fullWidth ? "btn-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}