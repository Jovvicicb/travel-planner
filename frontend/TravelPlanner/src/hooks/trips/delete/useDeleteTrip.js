import { useState } from "react";
import { tripService } from "../../../api_service/trips/tripService";

export function useDeleteTrip() {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function deleteTrip(id) {
    if (!id || Number(id) <= 0) {
      setDeleteError("Travel plan id is not valid.");
      return;
    }

    try {
      setDeleting(true);
      setDeleteError("");

      await tripService.deleteTravelPlan(id);
    } catch (error) {
      setDeleteError(error.message);
      throw error;
    } finally {
      setDeleting(false);
    }
  }

  return {
    deleting,
    deleteError,
    deleteTrip,
  };
}
