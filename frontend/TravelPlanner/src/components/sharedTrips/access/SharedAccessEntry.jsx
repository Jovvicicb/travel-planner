import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createSharedTripPath,
  extractSharedTripToken,
} from "../../../helpers/sharedTripLinkHelper";
import { Button } from "../../ui/Button";
import { FieldError } from "../../ui/FieldError";
import { SharedAccessQrScanner } from "./SharedAccessQrScanner";

export function SharedAccessEntry({ dark = false, showQrScanner = false }) {
  const navigate = useNavigate();

  const [sharedLink, setSharedLink] = useState("");
  const [error, setError] = useState("");

  function openSharedLink(value) {
    const token = extractSharedTripToken(value);

    if (!token) {
      setError("Shared travel plan link or token is required.");
      return;
    }

    navigate(createSharedTripPath(token));
  }

  function handleChange(event) {
    setSharedLink(event.target.value);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    openSharedLink(sharedLink);
  }

  function handleQrScan(value) {
    setSharedLink(value);
    setError("");

    openSharedLink(value);
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <div>
          <label
            htmlFor="sharedLink"
            className={[
              "text-xs font-black uppercase tracking-[0.16em]",
              dark ? "text-[#d8cbbb]" : "text-[#7b6b5d]",
            ].join(" ")}
          >
            Shared link
          </label>

          <input
            id="sharedLink"
            name="sharedLink"
            type="text"
            value={sharedLink}
            placeholder="Paste shared travel plan link"
            onChange={handleChange}
            className={[
              "mt-2 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none transition",
              dark
                ? "border-[#867463] bg-[#fffaf3] text-[#2f2924] placeholder:text-[#9a8b7b] focus:border-[#f8f3ec] focus:ring-4 focus:ring-[#f8f3ec]/10"
                : "border-[#d6c8b8] bg-[#fffaf3] text-[#2f2924] placeholder:text-[#9a8b7b] focus:border-[#746454] focus:ring-4 focus:ring-[#746454]/10",
            ].join(" ")}
          />

          <div className="mt-1">
            <FieldError message={error} />
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          variant={dark ? "secondary" : "primary"}
        >
          Open shared travel plan
        </Button>
      </form>

      {showQrScanner && <SharedAccessQrScanner onScan={handleQrScan} />}
    </div>
  );
}
