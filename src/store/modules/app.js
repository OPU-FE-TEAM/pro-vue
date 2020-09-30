import Vue from "vue";
import { asyncRoutes, constantRoutes } from "@/router/router.config";
import { setCurrentUrl } from "@/utils/common";

function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false;
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i].code);
      if (flag) {
        return permission[i];
      }
    }
    return false;
  }
  return true;
}

function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    let res = true;
    if (roles !== false) {
      res = hasPermission(roles, route);
    }
    // const res = hasPermission(roles, route);
    if (res === true) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      } else {
        // console.log(route.name);

        Vue.component(route.name, route.component);
        // 如果没有下级路由，则注册 tabs页面组件
      }
      return true;
    } else if (res !== false) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, res.children);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const app = {
  state: {
    menus: [],
    routers: [],
    theme: {},
    addRouters: [],
    device: "desktop",
    keepAliveComponents: [],
    tabPageDatas: {},
    isRegTabsPage: false,
    currentTab: {},
    tabsPages: [
      {
        fullPath: "/home",
        name: "home",
        title: "首页",
        params: {},
        query: {}
      }
    ]
  },
  mutations: {
    SET_MENUS: (state, routers) => {
      state.menus = routers;
      state.routers = constantRoutes.concat(routers);
    },
    SET_THEME: (state, data) => {
      state.theme = data;
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    KEEPALIVE(state, component) {
      // 注：防止重复添加（当然也可以使用Set）
      !state.keepAliveComponents.includes(component) &&
        state.keepAliveComponents.push(component);
    },
    NOKEEPALIVE: (state, component) => {
      const index = state.keepAliveComponents.indexOf(component);
      index !== -1 && state.keepAliveComponents.splice(index, 1);
    },
    SETTABPAGEDATAS: (state, data) => {
      state.tabPageDatas = data;
    },
    SET_CURRENTTAB: (state, data) => {
      state.currentTab = data;
    },
    SET_TABSPAGES: (state, pages) => {
      state.tabsPages = pages;
    },
    SET_ISREGTABSPAGE: (state, is) => {
      state.isRegTabsPage = is;
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data;
        const accessedRouters = filterAsyncRouter(asyncRoutes, data);
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    },
    setAddRouters({ commit }, data) {
      commit("SET_ROUTERS", data);
    },
    setMenus({ commit }, data) {
      commit("SET_MENUS", data);
    },

    setTheme({ commit }, data) {
      commit("SET_THEME", data);
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    keepAlive({ commit }, component) {
      commit("KEEPALIVE", component);
    },
    noKeepAlive({ commit }, component) {
      commit("NOKEEPALIVE", component);
    },
    setTabPageDatas({ commit }, data) {
      commit("SETTABPAGEDATAS", data);
    },
    setTabsPages({ commit }, pages) {
      commit("SET_TABSPAGES", pages);
    },
    setCurrentTab({ commit }, data) {
      // 设置当前url
      const url =
        window.location.protocol + "//" + window.location.host + data.fullPath;
      setCurrentUrl(url);
      commit("SET_CURRENTTAB", data);
    },
    setIsRegTabsPage({ commit }, is) {
      commit("SET_ISREGTABSPAGE", is);
    }
  }
};

export default app;
