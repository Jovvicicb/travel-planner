const variants = {
  primary:
    "border-transparent bg-[#4b4036] text-[#f8f3ec] shadow-lg shadow-[#2f2924]/10 hover:bg-[#5a4d41]",
  secondary: "border-[#d6c8b8] bg-[#f8f3ec] text-[#4b4036] hover:bg-[#eee6dc]",
  danger:
    "bg-[#7f2f2f] text-[#fffaf3] shadow-sm shadow-[#2f2924]/10 hover:bg-[#6f2929] focus:ring-[#7f2f2f]/20",
  ghost: "border-transparent bg-transparent text-[#6f5f48] hover:bg-[#eee6dc]",
};

const sizes = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-3 text-sm",
};

export function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
}) {
  const buttonClassName = [
    "inline-flex items-center justify-center gap-2 rounded-2xl border font-black transition disabled:cursor-not-allowed disabled:opacity-70",
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
