import { apiClient } from "../apiClient";
import { API_ROUTES } from "../apiRoutes";

export const authService = {
  register(data) {
    return apiClient.post(API_ROUTES.auth.register, {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  },

  login(data) {
    return apiClient.post(API_ROUTES.auth.login, {
      email: data.email,
      password: data.password,
    });
  },

  getCurrentUser() {
    return apiClient.get(API_ROUTES.auth.me);
  },
};