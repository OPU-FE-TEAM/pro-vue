import Vue from "vue";
import Storage from "vue-ls";

import "@/permission";
import action from "@/utils/permission/index";
import "@/utils/permission/action";
import "../mock";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import MultiTabApi from "@/layout/MultiTab/api";
import page from "@/layout/Page";

import { message } from "ant-design-vue";
Vue.prototype.$message = message;
Vue.use(Antd);
// Vue.prototype.$url = api;

import "../styles/antd.less";
import "../styles/global.less";

// eslint-disable-next-line no-undef
Vue.use(Storage, env.STORAGEOPTIONS);
Vue.use(page);
Vue.use(action);
Vue.use(MultiTabApi);
