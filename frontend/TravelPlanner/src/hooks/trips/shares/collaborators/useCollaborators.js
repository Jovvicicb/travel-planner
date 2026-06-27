import { useCallback, useEffect, useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useCollaborators(tripId) {
  const [collaborators, setCollaborators] = useState([]);
  const [loadingCollaborators, setLoadingCollaborators] = useState(false);
  const [collaboratorsError, setCollaboratorsError] = useState("");

  const loadCollaborators = useCallback(async () => {
    if (!tripId || Number(tripId) <= 0) {
      setCollaborators([]);
      setCollaboratorsError("");
      return;
    }

    try {
      setLoadingCollaborators(true);
      setCollaboratorsError("");

      const result = await tripService.getCollaborators(tripId);

      setCollaborators(result.data || []);
    } catch (error) {
      setCollaborators([]);
      setCollaboratorsError(error.message);
    } finally {
      setLoadingCollaborators(false);
    }
  }, [tripId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadCollaborators();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadCollaborators]);

  return {
    collaborators,
    loadingCollaborators,
    collaboratorsError,
    reloadCollaborators: loadCollaborators,
  };
}
