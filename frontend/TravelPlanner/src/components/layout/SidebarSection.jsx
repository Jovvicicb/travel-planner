export function SidebarSection({ title, children, separated = false }) {
  return (
    <div className={separated ? "border-t border-[#867463] pt-5" : undefined}>
      <p className="mb-2 px-3 text-xs font-black uppercase tracking-[0.18em] text-[#d8cbbb]">
        {title}
      </p>

      <div className="grid gap-1">{children}</div>
    </div>
  );
}
