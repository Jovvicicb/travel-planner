import { Button } from "./Button";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirming = false,
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f2924]/45 px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#cdbca9] bg-[#f8f3ec] p-6 shadow-2xl shadow-[#2f2924]/30">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7f2f2f]">
            Confirmation required
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#2f2924]">
            {title}
          </h2>

          {description && (
            <p className="mt-2 text-sm font-semibold leading-6 text-[#7b6b5d]">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            disabled={confirming}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant="danger"
            disabled={confirming}
            onClick={onConfirm}
          >
            {confirming ? "Deleting..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
