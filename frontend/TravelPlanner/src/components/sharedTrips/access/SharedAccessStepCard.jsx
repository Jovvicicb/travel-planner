export function SharedAccessStepCard({ number, title, description }) {
  return (
    <article className="rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
      <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-[#6f5f48] text-sm font-black text-[#fffaf3]">
        {number}
      </div>

      <h3 className="text-sm font-black text-[#2f2924]">{title}</h3>

      <p className="mt-2 text-sm font-semibold leading-6 text-[#7b6b5d]">
        {description}
      </p>
    </article>
  );
}
