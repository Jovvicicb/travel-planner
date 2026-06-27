import { useCallback, useEffect, useState } from "react";
import { adminUserService } from "../../../api_service/admin/users/adminUserService";

export function useAdminUser(userId) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState("");

  const loadUser = useCallback(async () => {
    if (!userId || Number(userId) <= 0) {
      setUser(null);
      setUserError("User id is not valid.");
      return;
    }

    try {
      setLoadingUser(true);
      setUserError("");

      const result = await adminUserService.getUserById(userId);

      setUser(result.data || null);
    } catch (error) {
      setUser(null);
      setUserError(error.message);
    } finally {
      setLoadingUser(false);
    }
  }, [userId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadUser();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadUser]);

  return {
    user,
    loadingUser,
    userError,
    reloadUser: loadUser,
  };
}
