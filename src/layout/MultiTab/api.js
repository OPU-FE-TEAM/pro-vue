import events from "./events";
// import MultiTab from "./MultiTab";
import router from "@/router";
import store from "@/store/";

const api = {
  /**
   * open new tab on route fullPath
   * @param config
   */
  open: function(config) {
    events.$emit("open", config);
  },
  rename: function(key, name) {
    events.$emit("rename", { key: key, name: name });
  },
  /**
   * close current page
   */
  closeAll: function() {
    events.$emit("closeAll");
  },
  closeCurrentPageToNewPage: function(config) {
    this.close();
    // setTimeout(() => {
    const configParams = config.params ? config.params : {};
    configParams.updateCurrentPage = true;
    config.params = configParams;
    router.push(config);
    // }, 100);
  },
  /**
   * close route fullPath tab
   * @param config
   */
  close: function(config) {
    events.$emit("close", config);
  },
  route: function() {
    return store.getters.currentTab || {};
  }
};

// MultiTab.install = function(Vue) {
//   if (Vue.prototype.$multiTab) {
//     return;
//   }
//   api.instance = events;
//   Vue.prototype.$multiTab = api;
//   Vue.component("multi-tab", MultiTab);
// };

const MultiTabApi = {
  install: function(Vue) {
    if (Vue.prototype.$multiTab) {
      return;
    }
    api.instance = events;
    Vue.prototype.$multiTab = api;
  }
};

export default MultiTabApi;
