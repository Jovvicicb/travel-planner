export function Card({ children, className = "" }) {
  return (
    <section
      className={[
        "rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-sm shadow-[#2f2924]/5",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}