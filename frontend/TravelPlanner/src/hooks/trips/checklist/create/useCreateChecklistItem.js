import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useCreateChecklistItem() {
  const [creatingChecklistItem, setCreatingChecklistItem] = useState(false);
  const [createChecklistItemError, setCreateChecklistItemError] = useState("");

  async function createChecklistItem(tripId, data) {
    try {
      setCreatingChecklistItem(true);
      setCreateChecklistItemError("");

      const result = await tripService.createChecklistItem(tripId, data);

      return result.data;
    } catch (error) {
      setCreateChecklistItemError(error.message);
      throw error;
    } finally {
      setCreatingChecklistItem(false);
    }
  }

  return {
    creatingChecklistItem,
    createChecklistItemError,
    createChecklistItem,
  };
}
