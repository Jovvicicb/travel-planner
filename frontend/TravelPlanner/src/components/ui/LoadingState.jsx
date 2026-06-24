export function LoadingState({ message = "Loading..." }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-3xl border border-dashed border-[#cdbca9] bg-[#f8f3ec] p-8 text-sm font-black text-[#7b6b5d] shadow-sm shadow-[#2f2924]/5">
      {message}
    </div>
  );
}
