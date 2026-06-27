import { apiClient } from "../../apiClient";
import { API_ROUTES } from "../../apiRoutes";

export const adminUserService = {
  getUsers() {
    return apiClient.get(API_ROUTES.admin.users.list);
  },
};
