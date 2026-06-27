import { useState } from "react";
import { adminUserService } from "../../../api_service/admin/users/adminUserService";

export function useUpdateAdminUserRole() {
  const [updatingRole, setUpdatingRole] = useState(false);
  const [updateRoleError, setUpdateRoleError] = useState("");

  async function updateUserRole(userId, role) {
    if (!userId || Number(userId) <= 0) {
      setUpdateRoleError("User id is not valid.");
      return null;
    }

    try {
      setUpdatingRole(true);
      setUpdateRoleError("");

      const result = await adminUserService.updateUserRole(userId, role);

      return result.data;
    } catch (error) {
      setUpdateRoleError(error.message);
      throw error;
    } finally {
      setUpdatingRole(false);
    }
  }

  return {
    updatingRole,
    updateRoleError,
    updateUserRole,
  };
}
