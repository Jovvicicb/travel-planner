import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useClaimShare() {
  const [claimingShare, setClaimingShare] = useState(false);
  const [claimShareError, setClaimShareError] = useState("");

  async function claimShare(token) {
    if (!token || token.trim() === "") {
      setClaimShareError("Share token is required.");
      return null;
    }

    try {
      setClaimingShare(true);
      setClaimShareError("");

      const result = await tripService.claimShare(token);

      return result.data;
    } catch (error) {
      setClaimShareError(error.message);
      throw error;
    } finally {
      setClaimingShare(false);
    }
  }

  return {
    claimingShare,
    claimShareError,
    claimShare,
  };
}
