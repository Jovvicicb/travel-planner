export function SectionHeader({ title, description, action }) {
  return (
    <div className="mb-6 border-b-[3px] border-[#b8a692] pb-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-xl font-black tracking-tight text-[#2f2924]">
            {title}
          </h2>

          {description && (
            <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-[#7b6b5d]">
              {description}
            </p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
