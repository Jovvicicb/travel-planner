import { Html5Qrcode } from "html5-qrcode";
import { useId, useRef, useState } from "react";
import { Button } from "../../ui/Button";
import { ErrorBox } from "../../ui/ErrorBox";

export function SharedAccessQrScanner({ onScan }) {
  const readerId = useId().replaceAll(":", "");
  const scannerRef = useRef(null);
  const startedRef = useRef(false);

  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannerError, setScannerError] = useState("");

  async function stopScanner() {
    if (!scannerRef.current || !startedRef.current) {
      return;
    }

    try {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
    } catch {
      // Scanner can already be stopped by the browser or the library.
    } finally {
      scannerRef.current = null;
      startedRef.current = false;
    }
  }

  async function startScanner() {
    try {
      setScannerError("");

      if (scannerRef.current || startedRef.current) {
        return;
      }

      const scanner = new Html5Qrcode(readerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 260,
            height: 260,
          },
        },
        async (decodedText) => {
          await stopScanner();

          setScanning(false);
          setScannerOpen(false);
          onScan(decodedText);
        },
        () => {},
      );

      startedRef.current = true;
      setScanning(true);
    } catch (error) {
      console.error("QR scanner start failed:", error);

      scannerRef.current = null;
      startedRef.current = false;
      setScanning(false);
      setScannerError(
        "Camera could not be started. Please allow camera access and try again.",
      );
    }
  }

  async function handleOpenScanner() {
    setScannerError("");
    setScannerOpen(true);

    setTimeout(() => {
      startScanner();
    }, 0);
  }

  async function handleCancelScanning() {
    await stopScanner();

    setScanning(false);
    setScannerOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] p-4 shadow-sm shadow-[#2f2924]/5">
        <div>
          <p className="text-sm font-black text-[#2f2924]">Scan QR code</p>

          <p className="mt-1 text-sm font-semibold leading-6 text-[#7b6b5d]">
            Use your camera to open a shared travel plan.
          </p>
        </div>

        <Button type="button" size="sm" onClick={handleOpenScanner}>
          Start scanner
        </Button>
      </div>

      {scannerError && (
        <div className="mt-3">
          <ErrorBox message={scannerError} />
        </div>
      )}

      {scannerOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#2f2924]/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-[#d6c8b8] bg-[#f8f3ec] p-5 shadow-2xl shadow-[#2f2924]/25">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7b6b5d]">
                  QR scanner
                </p>

                <h2 className="mt-1 text-xl font-black text-[#2f2924]">
                  Scan shared trip QR code
                </h2>

                <p className="mt-1 text-sm font-semibold leading-6 text-[#7b6b5d]">
                  Point your camera at the QR code and keep it inside the frame.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancelScanning}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[#d6c8b8] bg-[#fffaf3] text-lg font-black text-[#4b4036] transition hover:bg-[#eee6dc]"
                aria-label="Close QR scanner"
              >
                ×
              </button>
            </div>

            <style>
              {`
                    #${readerId} video {
                    transform: scaleX(-1);
                    }
                `}
            </style>
            <div className="overflow-hidden rounded-3xl border border-[#d6c8b8] bg-[#2f2924] p-2">
              <div id={readerId} className="overflow-hidden rounded-2xl" />
            </div>

            {!scanning && !scannerError && (
              <p className="mt-3 text-center text-sm font-semibold text-[#7b6b5d]">
                Starting camera...
              </p>
            )}

            {scannerError && (
              <div className="mt-4">
                <ErrorBox message={scannerError} />
              </div>
            )}

            <div className="mt-5">
              <Button
                type="button"
                fullWidth
                variant="secondary"
                onClick={handleCancelScanning}
              >
                Cancel scanning
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
