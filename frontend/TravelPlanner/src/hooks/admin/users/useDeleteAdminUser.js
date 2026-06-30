import { useState } from "react";

import { adminUserService } from "../../../api_service/admin/users/adminUserService";

export function useDeleteAdminUser() {
  const [deletingUser, setDeletingUser] = useState(false);
  const [deleteUserError, setDeleteUserError] = useState("");

  async function deleteUser(userId) {
    if (!userId || Number(userId) <= 0) {
      setDeleteUserError("User id is not valid.");
      return false;
    }

    try {
      setDeletingUser(true);
      setDeleteUserError("");

      await adminUserService.deleteUser(userId);

      return true;
    } catch (error) {
      setDeleteUserError(error.message);
      throw error;
    } finally {
      setDeletingUser(false);
    }
  }

  return {
    deletingUser,
    deleteUserError,
    deleteUser,
  };
}
