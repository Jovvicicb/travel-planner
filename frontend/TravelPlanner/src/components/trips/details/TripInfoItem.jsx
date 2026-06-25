export function TripInfoItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] px-4 py-3">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a8b7b]">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-[#4b4036]">{value}</p>
    </div>
  );
}
