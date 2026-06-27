import { useCallback, useEffect, useState } from "react";
import { adminUserService } from "../../../api_service/admin/users/adminUserService";

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      setUsersError("");

      const result = await adminUserService.getUsers();

      setUsers(result.data || []);
    } catch (error) {
      setUsers([]);
      setUsersError(error.message);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadUsers();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadUsers]);

  return {
    users,
    loadingUsers,
    usersError,
    reloadUsers: loadUsers,
  };
}
