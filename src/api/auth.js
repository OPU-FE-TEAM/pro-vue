import { sendRequest } from "@/utils/request";

export const url = {
  login: "/admin/login",
  logout: "/admin/logout"
};

export default class authApi {
  /**
   * 登录
   * @description: 账号密码登录
   * @param {Object} data
   * @return:
   */
  static login(data) {
    return sendRequest(url.login, data, "post");
  }

  static logout(data) {
    return sendRequest(url.logout, data, "post");
  }
}
