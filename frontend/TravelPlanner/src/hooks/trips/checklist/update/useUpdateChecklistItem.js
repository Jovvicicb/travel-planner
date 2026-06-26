import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useUpdateChecklistItem() {
  const [updatingChecklistItem, setUpdatingChecklistItem] = useState(false);
  const [updateChecklistItemError, setUpdateChecklistItemError] = useState("");

  async function updateChecklistItem(tripId, itemId, data) {
    try {
      setUpdatingChecklistItem(true);
      setUpdateChecklistItemError("");

      const result = await tripService.updateChecklistItem(
        tripId,
        itemId,
        data,
      );

      return result.data;
    } catch (error) {
      setUpdateChecklistItemError(error.message);
      throw error;
    } finally {
      setUpdatingChecklistItem(false);
    }
  }

  return {
    updatingChecklistItem,
    updateChecklistItemError,
    updateChecklistItem,
  };
}
