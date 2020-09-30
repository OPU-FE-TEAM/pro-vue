import sendRequest from "@/utils/request";

export const url = {
  login: "/admin/login",
  logout: "/admin/logout"
};

export const login = param => {
  return sendRequest(url.login, param, "post");
};

export const logout = () => {
  return sendRequest(url.logout, {}, "post");
};
