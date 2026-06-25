import { useEffect, useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useDestinations(tripId) {
  const [destinations, setDestinations] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [destinationsError, setDestinationsError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadInitialDestinations() {
      if (!tripId || Number(tripId) <= 0) {
        setDestinationsError("Travel plan id is not valid.");
        setLoadingDestinations(false);
        return;
      }

      try {
        const result = await tripService.getDestinations(tripId);

        if (!isActive) {
          return;
        }

        setDestinations(result.data || []);
        setDestinationsError("");
      } catch (error) {
        if (isActive) {
          setDestinationsError(error.message);
        }
      } finally {
        if (isActive) {
          setLoadingDestinations(false);
        }
      }
    }

    loadInitialDestinations();

    return () => {
      isActive = false;
    };
  }, [tripId]);

  async function reloadDestinations() {
    try {
      setLoadingDestinations(true);
      setDestinationsError("");

      const result = await tripService.getDestinations(tripId);

      setDestinations(result.data || []);
    } catch (error) {
      setDestinationsError(error.message);
    } finally {
      setLoadingDestinations(false);
    }
  }

  return {
    destinations,
    loadingDestinations,
    destinationsError,
    reloadDestinations,
  };
}
