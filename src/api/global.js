import sendRequest from "@/utils/request";

export const url = {
  upload: "/common/upload"
};

export const upload = param => {
  return sendRequest(url.upload, param, "post");
};
