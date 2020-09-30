import Mock from "mockjs2";
import { builder, getBody } from "../util";

const username = ["admin"];
const password = ["e10adc3949ba59abbe56e057f20f883e"]; // 123456

const login = options => {
  const body = getBody(options);
  console.log("mock: body", body);
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({}, "账户或密码错误", 405);
  }

  return builder({
    id: Mock.mock("@guid"),
    name: Mock.mock("@name"),
    username: "admin",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
    token: "4291d7da9005377ec9aec4a71ea837f",
    permissions: [
      "user:add",
      "user:edit",
      "user:del",
      "user:reset",
      "user:role"
    ]
  });
};

const logout = () => {
  return builder();
};

Mock.mock(/\/api\/admin\/login/, "post", login);
Mock.mock(/\/api\/auth\/logout/, "post", logout);
