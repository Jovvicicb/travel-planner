export function EmptyState({
  title = "No data found",
  description = "There is nothing to show yet.",
  action,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[#cdbca9] bg-[#f8f3ec] p-8 text-center shadow-sm shadow-[#2f2924]/5">
      <h3 className="text-lg font-black text-[#2f2924]">{title}</h3>

      <p className="mt-2 text-sm font-semibold text-[#7b6b5d]">{description}</p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
