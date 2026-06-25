export function SuccessBox({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[#9fb89a] bg-[#eef6ea] px-4 py-3 text-sm font-bold text-[#3f6b3c]">
      {message}
    </div>
  );
}
