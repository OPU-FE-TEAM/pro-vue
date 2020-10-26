import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
import store from "./store/";
import bootstrap from "./utils/bootstrap";
import Antd from "ant-design-vue";
import OpuComponents from "opu-components-vue";
import "ant-design-vue/dist/antd.css";
import "opu-components-vue/lib/opu.css";
Vue.use(Antd);
Vue.use(OpuComponents);
import "./utils/use";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    bootstrap();
  },
  render: h => h(App)
}).$mount("#app");
