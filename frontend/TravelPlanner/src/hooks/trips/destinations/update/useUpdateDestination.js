import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useUpdateDestination() {
  const [updatingDestination, setUpdatingDestination] = useState(false);
  const [updateDestinationError, setUpdateDestinationError] = useState("");

  async function updateDestination(tripId, destinationId, data) {
    try {
      setUpdatingDestination(true);
      setUpdateDestinationError("");

      const result = await tripService.updateDestination(
        tripId,
        destinationId,
        data,
      );

      return result.data;
    } catch (error) {
      setUpdateDestinationError(error.message);
      throw error;
    } finally {
      setUpdatingDestination(false);
    }
  }

  return {
    updatingDestination,
    updateDestinationError,
    updateDestination,
  };
}
