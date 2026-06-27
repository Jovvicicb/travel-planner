import { useState } from "react";
import { tripService } from "../../../../api_service/trips/tripService";

export function useRemoveCollaborator() {
  const [removingCollaborator, setRemovingCollaborator] = useState(false);
  const [removeCollaboratorError, setRemoveCollaboratorError] = useState("");

  async function removeCollaborator(tripId, userId) {
    if (!tripId || Number(tripId) <= 0) {
      setRemoveCollaboratorError("Travel plan id is not valid.");
      return;
    }

    if (!userId || Number(userId) <= 0) {
      setRemoveCollaboratorError("Collaborator user id is not valid.");
      return;
    }

    try {
      setRemovingCollaborator(true);
      setRemoveCollaboratorError("");

      await tripService.removeCollaborator(tripId, userId);
    } catch (error) {
      setRemoveCollaboratorError(error.message);
      throw error;
    } finally {
      setRemovingCollaborator(false);
    }
  }

  return {
    removingCollaborator,
    removeCollaboratorError,
    removeCollaborator,
  };
}
