import Mock from "mockjs2";
import { builder, getBody } from "../util";

const selectData = options => {
  const params = getBody(options);
  console.log(options.type + " " + options.url + ":", params);
  let res = {};
  if (params.code.indexOf("StatusType") > -1) {
    res.StatusType = [
      {
        id: "0",
        text: "停用"
      },
      {
        id: "1",
        text: "启用"
      },
      {
        id: "2",
        text: "禁用"
      }
    ];
  }
  return builder(res, "", 200);
};

Mock.mock(/\/api\/Common\/GetSelectItemsByCodes/, "post", selectData);
