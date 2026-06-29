import { QRCodeCanvas } from "qrcode.react";

import { toShareListItemDisplayModel } from "../../../../mappers/trips/shares/list/shareListItemDisplayMapper";
import { Button } from "../../../ui/Button";

export function ShareCard({ share, deactivating, onCopy, onDeactivate }) {
  const displayShare = toShareListItemDisplayModel(share);

  return (
    <article
      className={[
        "rounded-2xl border p-4 shadow-sm transition",
        displayShare.isActive
          ? "border-[#d6c8b8] bg-[#fffaf3]"
          : "border-[#cdbca9] bg-[#f8f3ec] opacity-70",
      ].join(" ")}
    >
      <div className="grid gap-4 lg:grid-cols-[140px_1fr]">
        <div className="flex justify-center rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-3">
          <QRCodeCanvas value={displayShare.shareUrl} size={105} />
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={[
                "rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em]",
                displayShare.isActive
                  ? "border-[#746454] bg-[#6f5f48] text-[#fffaf3]"
                  : "border-[#cdbca9] bg-[#eee6dc] text-[#7b6b5d]",
              ].join(" ")}
            >
              {displayShare.statusLabel}
            </span>

            <span className="rounded-full border border-[#cdbca9] bg-[#f8f3ec] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]">
              {displayShare.accessLevelLabel}
            </span>

            <span className="text-xs font-semibold text-[#7b6b5d]">
              Expires: {displayShare.expiresAtDisplay}
            </span>
          </div>

          <p className="break-all rounded-xl border border-[#d6c8b8] bg-[#f8f3ec] px-3 py-2 text-sm font-semibold text-[#4b4036]">
            {displayShare.shareUrl}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onCopy(displayShare.shareUrl)}
            >
              Copy link
            </Button>

            {displayShare.isActive && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                disabled={deactivating}
                onClick={() => onDeactivate(share)}
              >
                Deactivate
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
