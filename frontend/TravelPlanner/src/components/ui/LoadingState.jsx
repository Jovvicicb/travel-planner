export function LoadingState({ message = "Loading..." }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm font-semibold text-slate-500">
      {message}
    </div>
  );
}
