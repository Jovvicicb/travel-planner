import { Link } from "react-router-dom";

const variants = {
  primary:
    "border-transparent bg-[#4b4036] text-[#f8f3ec] shadow-lg shadow-[#2f2924]/10 hover:bg-[#5a4d41]",
  secondary: "border-[#d6c8b8] bg-[#f8f3ec] text-[#4b4036] hover:bg-[#eee6dc]",
  danger:
    "border-transparent bg-red-600 text-white shadow-lg shadow-red-900/10 hover:bg-red-700",
  ghost: "border-transparent bg-transparent text-[#6f5f48] hover:bg-[#eee6dc]",
};

const sizes = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-3 text-sm",
};

export function ButtonLink({
  children,
  to,
  variant = "primary",
  size = "md",
  className = "",
}) {
  const linkClassName = [
    "inline-flex items-center justify-center gap-2 rounded-2xl border font-black transition",
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={to} className={linkClassName}>
      {children}
    </Link>
  );
}
