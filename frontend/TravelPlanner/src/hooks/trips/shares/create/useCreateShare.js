import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useCreateShare() {
  const [creatingShare, setCreatingShare] = useState(false);
  const [createShareError, setCreateShareError] = useState("");

  async function createShare(tripId, data) {
    try {
      setCreatingShare(true);
      setCreateShareError("");

      const result = await tripService.createShare(tripId, data);

      return result.data;
    } catch (error) {
      setCreateShareError(error.message);
      throw error;
    } finally {
      setCreatingShare(false);
    }
  }

  return {
    creatingShare,
    createShareError,
    createShare,
  };
}
