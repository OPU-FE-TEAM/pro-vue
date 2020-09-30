import Mock from "mockjs2";
import { builder, getBody } from "../util";

const obj = {
  "id|+1": 1,
  "code|100-100000": 100,
  name: "@name",
  "sort|100-100000": 100,
  status: "1",
  remark: "@name"
};

const List = options => {
  const params = getBody(options);
  console.log(options.type + " " + options.url + ":", params);
  const listKey = "datas|" + params.pageSize;
  let arr = {
    total: 50
  };
  arr[listKey] = [obj];
  return builder(Mock.mock(arr), "", 200);
};

const Info = options => {
  const params = getBody(options);
  console.log(options.type + " " + options.url + ":", params);
  return builder(Mock.mock(obj), "", 200);
};

const Submit = options => {
  const params = getBody(options);
  console.log(options.type + " " + options.url + ":", params);
  return builder("", "", 200);
};

const AppInfo = options => {
  const params = getBody(options);
  console.log(options.type + " " + options.url + ":", params);
  return builder(
    Mock.mock({
      "id|+1": 1,
      appId: "@name",
      appsecret: "@name",
      "mchid|100000-10000000": 120000,
      apikey: "@name",
      status: "1"
    }),
    "",
    200
  );
};

Mock.mock(/\/api\/Base\/GetPage/, "post", List);
Mock.mock(/\/api\/Base\/GetDetail/, "post", Info);
Mock.mock(/\/api\/Base\/Add/, "post", Submit);
Mock.mock(/\/api\/Base\/Edit/, "post", Submit);
Mock.mock(/\/api\/Base\/Delete/, "post", Submit);

Mock.mock(/\/api\/App\/Info/, "post", AppInfo);
Mock.mock(/\/api\/App\/Save/, "post", Submit);
