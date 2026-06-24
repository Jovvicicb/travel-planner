const variants = {
  earth: "bg-[#e3d6c8] text-[#4b4036] ring-[#cdbca9]",
  earthDark: "bg-[#6f5f48] text-[#fffaf3] ring-[#8a7968]",
  light: "bg-[#f8f3ec] text-[#4b4036] ring-[#d8cbbb]",
  dark: "bg-[#4b4036] text-[#f8f3ec] ring-[#746454]",

  secondary: "bg-[#e3d6c8] text-[#4b4036] ring-[#cdbca9]",
  success: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  warning: "bg-amber-100 text-amber-800 ring-amber-200",
  danger: "bg-rose-100 text-rose-800 ring-rose-200",
};

export function Badge({ children, variant = "secondary" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black ring-1 ring-inset",
        variants[variant] || variants.secondary,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
