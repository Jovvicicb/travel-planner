import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useToggleChecklistItem() {
  const [togglingChecklistItem, setTogglingChecklistItem] = useState(false);
  const [toggleChecklistItemError, setToggleChecklistItemError] = useState("");

  async function toggleChecklistItem(tripId, itemId) {
    if (!tripId || Number(tripId) <= 0) {
      setToggleChecklistItemError("Travel plan id is not valid.");
      return;
    }

    if (!itemId || Number(itemId) <= 0) {
      setToggleChecklistItemError("Checklist item id is not valid.");
      return;
    }

    try {
      setTogglingChecklistItem(true);
      setToggleChecklistItemError("");

      const result = await tripService.toggleChecklistItem(tripId, itemId);

      return result.data;
    } catch (error) {
      setToggleChecklistItemError(error.message);
      throw error;
    } finally {
      setTogglingChecklistItem(false);
    }
  }

  return {
    togglingChecklistItem,
    toggleChecklistItemError,
    toggleChecklistItem,
  };
}
