import { QRCodeCanvas } from "qrcode.react";

import { toShareListItemDisplayModel } from "../../../../mappers/trips/shares/list/shareListItemDisplayMapper";
import { Button } from "../../../ui/Button";

export function CreatedShareCard({ share, onCopy }) {
  const displayShare = toShareListItemDisplayModel(share);

  return (
    <section className="rounded-2xl border border-[#746454] bg-[#f8f3ec] p-4 shadow-sm shadow-[#2f2924]/10">
      <div className="mb-4 border-b border-[#d6c8b8] pb-3">
        <h3 className="text-sm font-black text-[#2f2924]">
          Share link created
        </h3>

        <p className="mt-0.5 text-xs font-semibold text-[#7b6b5d]">
          Send this link or let another user scan the QR code.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
        <div className="flex justify-center rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4">
          <QRCodeCanvas value={displayShare.shareUrl} size={140} />
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#746454] bg-[#6f5f48] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#fffaf3]">
              {displayShare.accessLevelLabel}
            </span>

            <span className="rounded-full border border-[#cdbca9] bg-[#fffaf3] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#4b4036]">
              Expires: {displayShare.expiresAtDisplay}
            </span>
          </div>

          <p className="break-all rounded-xl border border-[#d6c8b8] bg-[#fffaf3] px-3 py-2 text-sm font-semibold text-[#4b4036]">
            {displayShare.shareUrl}
          </p>

          <div className="mt-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onCopy(displayShare.shareUrl)}
            >
              Copy link
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
