import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useDeleteChecklistItem() {
  const [deletingChecklistItem, setDeletingChecklistItem] = useState(false);
  const [deleteChecklistItemError, setDeleteChecklistItemError] = useState("");

  async function deleteChecklistItem(tripId, itemId) {
    if (!tripId || Number(tripId) <= 0) {
      setDeleteChecklistItemError("Travel plan id is not valid.");
      return;
    }

    if (!itemId || Number(itemId) <= 0) {
      setDeleteChecklistItemError("Checklist item id is not valid.");
      return;
    }

    try {
      setDeletingChecklistItem(true);
      setDeleteChecklistItemError("");

      await tripService.deleteChecklistItem(tripId, itemId);
    } catch (error) {
      setDeleteChecklistItemError(error.message);
      throw error;
    } finally {
      setDeletingChecklistItem(false);
    }
  }

  return {
    deletingChecklistItem,
    deleteChecklistItemError,
    deleteChecklistItem,
  };
}
