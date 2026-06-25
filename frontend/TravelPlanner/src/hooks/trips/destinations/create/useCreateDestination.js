import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useCreateDestination() {
  const [creatingDestination, setCreatingDestination] = useState(false);
  const [createDestinationError, setCreateDestinationError] = useState("");

  async function createDestination(tripId, data) {
    try {
      setCreatingDestination(true);
      setCreateDestinationError("");

      const result = await tripService.createDestination(tripId, data);

      return result.data;
    } catch (error) {
      setCreateDestinationError(error.message);
      throw error;
    } finally {
      setCreatingDestination(false);
    }
  }

  return {
    creatingDestination,
    createDestinationError,
    createDestination,
  };
}
