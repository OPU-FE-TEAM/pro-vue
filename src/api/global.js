import { sendRequest } from "@/utils/request";

export const url = {
  getSelect: "/api/Common/GetSelectItemsByCodes",
  upload: "/api/Common/FileSave",
  getTableColnums: "/api/TableConfig/GetConfiguration",
  saveTableColnums: "/api/TableConfig/UpdateConfiguration",
  getDictionaryListByDicType: "/api/Dictionaries/GetDictionaryListByDicType",
  getGoodsDicType: "/api/Dictionaries/GetGoodsDicType"
};

export default class userApi {
  static getSelect(data) {
    return sendRequest(url.getSelect, data, "post");
  }
  static getTableColnums(data) {
    return sendRequest(url.getTableColnums, data, "post");
  }
  static saveTableColnums(data) {
    return sendRequest(url.saveTableColnums, data, "post");
  }
  static upload(data) {
    return sendRequest(url.upload, data, "post");
  }
  /*
  查询字典项
  */
  static getDictionaryListByDicType(data) {
    return sendRequest(url.getDictionaryListByDicType, data, "post");
  }
  /*
  查询物品管理全部下拉数据
  */
  static getGoodsDicType(data) {
    return sendRequest(url.getGoodsDicType, data, "post");
  }
}
