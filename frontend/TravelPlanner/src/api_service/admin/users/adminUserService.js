import { apiClient } from "../../apiClient";
import { API_ROUTES } from "../../apiRoutes";

export const adminUserService = {
  getUsers() {
    return apiClient.get(API_ROUTES.admin.users.list);
  },

  getUserById(userId) {
    return apiClient.get(API_ROUTES.admin.users.details(userId));
  },

  updateUserRole(userId, role) {
    return apiClient.put(API_ROUTES.admin.users.updateRole(userId), {
      role,
    });
  },

  deleteUser(userId) {
    return apiClient.delete(API_ROUTES.admin.users.delete(userId));
  },
};
