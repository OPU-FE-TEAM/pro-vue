import router from "./router";
import store from "./store/";
import { ls } from "@/utils//cache";
import { treeTransArray } from "@/utils//common";
import { TOKEN, USERINFO } from "@/store/mutation-types";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

const whiteList = ["login"]; //路由白名单

function renderMenuData(addRouters) {
  return addRouters.find(item => item.path === "/").children;
}

router.beforeEach((to, from, next) => {
  //路由发生变化修改页面title
  NProgress.start();
  const token = ls.get(TOKEN);
  if (!token && !whiteList.includes(to.name)) {
    // 未登录并 不在路由白名单 跳转至登录页
    store.dispatch("logout");
    NProgress.done();
  } else if (
    store.getters.menus.length === 0 &&
    !whiteList.includes(to.name) &&
    env.PERMISSION.router
  ) {
    const user = ls.get(USERINFO);
    if (!user) {
      store.dispatch("logout");
      NProgress.done();
    } else {
      const roles = user.permissions;
      store.dispatch("generateRoutes", roles).then(() => {
        // 根据roles权限生成可访问的路由表
        let menus = [];
        if (user.menus) {
          // 后端控制菜单
          menus = user.menus;
        } else {
          menus = renderMenuData(store.getters.addRouters);
        }
        const addRoutes = store.getters.addRouters;
        const renderAddRouters = treeTransArray(
          addRoutes[0].children,
          "children"
        );
        store.dispatch("setRoutes", renderAddRouters);
        addRoutes[0].children = renderAddRouters;
        router.addRoutes(addRoutes);
        store.dispatch("setMenus", menus);
        const redirect = decodeURIComponent(from.query.redirect || to.path);
        if (to.path === redirect) {
          store.dispatch("addKeepAliveTab", to);
          next({ ...to, replace: true });
        } else {
          store.dispatch("addKeepAliveTab", to);
          next({ path: redirect });
        }
      });
    }
  } else {
    store.dispatch("addKeepAliveTab", to);
    if (to.meta && to.meta.component) {
      // 保留的页面
      store.dispatch("addKeepPages", to);
      // store.dispatch("setCurrentKeepPage", to);
    }
    next();
    // NProgress.done();
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

router.afterEach(() => {
  NProgress.done();
});
