import { sendRequest } from "@/utils/request";

export const url = {
  Base_list: "/api/Base/GetPage",
  Base_info: "/api/Base/GetDetail",
  Base_add: "/api/Base/Add",
  Base_edit: "/api/Base/Edit",
  Base_del: "/api/Base/Delete",
  App_info: "/api/App/Info",
  App_save: "/api/App/Save"
};

export default class configApi {
  static list(data) {
    return sendRequest(url.Base_list, data, "post");
  }
  static info(data) {
    return sendRequest(url.Base_info, data, "post");
  }
  static add(data) {
    return sendRequest(url.Base_add, data, "post");
  }
  static edit(data) {
    return sendRequest(url.Base_edit, data, "post");
  }
  static del(data) {
    return sendRequest(url.Base_del, data, "post");
  }
  static appInfo(data) {
    return sendRequest(url.App_info, data, "post");
  }
  static appSave(data) {
    return sendRequest(url.App_save, data, "post");
  }
}
