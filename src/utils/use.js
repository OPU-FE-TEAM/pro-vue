import Vue from "vue";
import Storage from "vue-ls";

import "@/permission";
import action from "@/utils/permission/index";
import "@/utils/permission/action";

import OpuComponents from "opu-components-vue";
import "opu-components-vue/lib/opu.css";

// base library
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import "../styles/antd.less";
import "../styles/global.less";
import "../styles/transition.less";

Vue.use(OpuComponents);
Vue.use(Antd);
// eslint-disable-next-line no-undef
Vue.use(Storage, env.STORAGEOPTIONS);
Vue.use(action);
