import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useDeactivateShare() {
  const [deactivatingShare, setDeactivatingShare] = useState(false);
  const [deactivateShareError, setDeactivateShareError] = useState("");

  async function deactivateShare(tripId, shareId) {
    if (!tripId || Number(tripId) <= 0) {
      setDeactivateShareError("Travel plan id is not valid.");
      return;
    }

    if (!shareId || Number(shareId) <= 0) {
      setDeactivateShareError("Share link id is not valid.");
      return;
    }

    try {
      setDeactivatingShare(true);
      setDeactivateShareError("");

      await tripService.deactivateShare(tripId, shareId);
    } catch (error) {
      setDeactivateShareError(error.message);
      throw error;
    } finally {
      setDeactivatingShare(false);
    }
  }

  return {
    deactivatingShare,
    deactivateShareError,
    deactivateShare,
  };
}
