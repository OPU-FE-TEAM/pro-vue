import router from "./router";
import store from "./store/";
import { cookie, ls } from "@/utils/cache";
import { setCurrentUrl } from "@/utils/common";
import { TOKEN, USERINFO } from "@/store/mutation-types";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

const whiteList = ["login", "404"]; //路由白名单

router.beforeEach((to, from, next) => {
  //路由发生变化修改页面title
  NProgress.start();

  const token = cookie.get(TOKEN);
  const userInfo = ls.get(USERINFO);

  if (whiteList.includes(to.name)) {
    next();
    return false;
  } else if ((!token || !userInfo) && !whiteList.includes(to.name)) {
    // 未登录并 不在路由白名单 跳转至登录页
    store.dispatch("logout");
    NProgress.done();
    return;
  } else if (
    userInfo &&
    // userInfo.permissions.length === 0 &&
    !whiteList.includes(to.name)
  ) {
    // eslint-disable-next-line no-undef
    if (
      env.PERMISSION &&
      env.PERMISSION.router &&
      !store.getters.isRegTabsPage
    ) {
      // 根据权限 动态注册路由
      const roles = userInfo.permissions;
      store.dispatch("generateRoutes", roles);
      store.dispatch("setIsRegTabsPage", true);
    } else if (!store.getters.isRegTabsPage) {
      // 无需权限验证，直接动态注册路由（组件）
      store.dispatch("generateRoutes", false).then(() => {});
      store.dispatch("setIsRegTabsPage", true);
    }
  }
  if (to.meta.tabsPage === false) {
    next();
    return false;
  } else if (to.name === "home") {
    next();
    return false;
  }

  const tabsPage = {
    title: to.meta.title,
    name: to.name,
    fullPath: to.fullPath,
    params: to.params,
    query: to.query
  };

  // 验证是否存在
  const tabsPages = store.getters.tabsPages;
  const currentTab = tabsPages.find(p => p.fullPath === tabsPage.fullPath);
  if (currentTab && currentTab.name) {
    // 存在需跳转的页面
  } else {
    let pages = [];
    // 不存在
    if (to.params && to.params.updateCurrentPage) {
      // 替换当前页签页面
      pages = tabsPages.map(item => {
        if (item.fullPath === store.getters.currentTab.fullPath) {
          // 替换
          return tabsPage;
        }
        return item;
      });
    } else {
      pages = [...tabsPages, tabsPage];
    }
    store.dispatch("setTabsPages", pages);
  }
  store.dispatch("setCurrentTab", tabsPage);

  //向当前url添加参数，没有历史记录
  const url =
    window.location.protocol + "//" + window.location.host + to.fullPath;
  next({ name: "home" });
  setCurrentUrl(url);

  NProgress.done();
  return;
});

router.afterEach(() => {
  NProgress.done();
});
