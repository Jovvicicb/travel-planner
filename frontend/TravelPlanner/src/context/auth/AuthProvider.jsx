import { useEffect, useMemo, useState } from "react";
import { authService } from "../../api_service/auth/authService";
import {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
} from "../../helpers/tokenHelper";
import { USER_ROLES } from "../../constants/enums/userRoles";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAccessToken());
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(() => Boolean(getAccessToken()));
  const [authError, setAuthError] = useState("");

  const isAuthenticated = Boolean(user && token);
  const isAdmin = user?.role === USER_ROLES.ADMIN;

  useEffect(() => {
    if (!token) {
      return;
    }

    let isActive = true;

    async function loadCurrentUser() {
      try {
        const result = await authService.getCurrentUser();

        if (isActive) {
          setUser(result.data);
        }
      } catch {
        removeAccessToken();

        if (isActive) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (isActive) {
          setInitializing(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      isActive = false;
    };
  }, [token]);

  async function login(credentials) {
    setAuthError("");

    try {
      const result = await authService.login(credentials);

      const receivedToken = result.data?.token;
      const currentUser = result.data?.user;

      if (!receivedToken || !currentUser) {
        throw new Error("Login response does not contain token or user data.");
      }

      saveAccessToken(receivedToken);
      setToken(receivedToken);
      setUser(currentUser);

      return currentUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  async function register(data) {
    setAuthError("");

    try {
      const result = await authService.register(data);

      const receivedToken = result.data?.token;
      const currentUser = result.data?.user;

      if (!receivedToken || !currentUser) {
        throw new Error("Registration response does not contain token or user data.");
      }

      saveAccessToken(receivedToken);
      setToken(receivedToken);
      setUser(currentUser);

      return currentUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  function logout() {
    removeAccessToken();
    setToken(null);
    setUser(null);
    setAuthError("");
  }

  const value = useMemo(
    () => ({
      user,
      token,
      initializing,
      authError,
      isAuthenticated,
      isAdmin,
      login,
      register,
      logout,
    }),
    [user, token, initializing, authError, isAuthenticated, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}