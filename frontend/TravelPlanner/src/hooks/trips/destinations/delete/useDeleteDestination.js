import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useDeleteDestination() {
  const [deletingDestination, setDeletingDestination] = useState(false);
  const [deleteDestinationError, setDeleteDestinationError] = useState("");

  async function deleteDestination(tripId, destinationId) {
    if (!tripId || Number(tripId) <= 0) {
      setDeleteDestinationError("Travel plan id is not valid.");
      return;
    }

    if (!destinationId || Number(destinationId) <= 0) {
      setDeleteDestinationError("Destination id is not valid.");
      return;
    }

    try {
      setDeletingDestination(true);
      setDeleteDestinationError("");

      await tripService.deleteDestination(tripId, destinationId);
    } catch (error) {
      setDeleteDestinationError(error.message);
      throw error;
    } finally {
      setDeletingDestination(false);
    }
  }

  return {
    deletingDestination,
    deleteDestinationError,
    deleteDestination,
  };
}
