import axios from "axios";
import store from "@/store/";
import notification from "ant-design-vue/es/notification";
import "ant-design-vue/lib/notification/style/css";
import Modal from "ant-design-vue/es/modal";
import "ant-design-vue/lib/modal/style/css";
//默认配置
const config = {
  // eslint-disable-next-line no-undef
  serverUrl: env.API_HOST, //请求地址
  //http请求响应体
  responseBody: {
    code: "code",
    data: "data",
    message: "message"
  },
  successCode: 0 // 响应体中 成功状态的 code
};

let modalOpen = false;
//请求状态错误处理
const err = error => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    let msg =
      data && data[config.responseBody.message]
        ? data[config.responseBody.message]
        : "";
    if (status === 401) {
      if (!modalOpen) {
        modalOpen = true;
        Modal.confirm({
          title: "身份令牌已失效",
          content: "您可以取消以停留在此页，或重新登录",
          okText: "重新登录",
          onOk() {
            // 退出登录
            modalOpen = false;
            store.dispatch("logout");
          },
          onCancel() {
            modalOpen = false;
          }
        });
      }
      return false;
    } else if (status === 403) {
      msg = "您没有权限";
    } else if (status === 404) {
      msg = "api请求接口不存在";
    }
    const message =
      data && data[config.responseBody.message]
        ? data[config.responseBody.message]
        : msg;
    notification.error({
      message: status,
      description: message
    });
  }
};

//响应体Code异常处理
const abnormal = response => {
  const res = response.data;
  // 当设置 handleError 为 false 则不做异常处理
  if (
    response.config.headers &&
    response.config.headers.handleError === false
  ) {
    return false;
  }

  const resultCode = res[config.responseBody.code];
  const description =
    res && res[config.responseBody.message]
      ? res[config.responseBody.message]
      : "请求失败";
  let message = "abnormalCode：" + resultCode;
  if (resultCode === 99) {
    message = "请求参数错误";
  }
  notification.error({
    message: message,
    description: description
  });
};

// 创建实例
const service = axios.create({
  baseURL: config.serverUrl,
  // headers: { "Content-Type": "application/json" },
  timeout: 50000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Authorization"] = store.getters.token;
    }
    // config.method = config.method ? config.method : "post";
    return config;
  },
  error => {
    err(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    const resultCode = res[config.responseBody.code];
    if (resultCode === config.successCode) {
      return res; // 成功回调
    } else {
      abnormal(response);
      return Promise.reject(new Error(res.message || "Error"));
    }
  },
  error => {
    err(error);
    return Promise.reject(error);
  }
);

export const sendRequest = (apiUrl, params, type) => {
  const arr = {
    url: apiUrl,
    method: type
  };
  if (type === "get") {
    arr.params = params;
  } else {
    arr.data = params;
  }
  return service(arr);
};

export default sendRequest;
