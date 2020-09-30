import { sendRequest } from "@/utils/request";

export const url = {
  user_list: "/api/user/list",
  user: "/api/user",
  user_resetPassword: "/api/user/resetPassword"
};

export default class userApi {
  static list(data) {
    return sendRequest(url.user_list, data, "get");
  }
  static info(data) {
    return sendRequest(url.user, data, "get");
  }
  static submit(data) {
    return sendRequest(url.user, data, "post");
  }
  static del(data) {
    return sendRequest(url.user, data, "delete");
  }
  static resetPassword(data) {
    return sendRequest(url.user_resetPassword, data, "post");
  }
}
