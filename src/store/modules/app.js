import Vue from "vue";
import { asyncRoutes } from "@/router/router.config";

function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false;
    const routePermission = route.meta.permission;
    for (let i = 0, len = routePermission.length; i < len; i++) {
      const item = routePermission[i];
      flag = permission.includes(item);
      if (flag) {
        break;
      }
    }
    return flag;
  }

  return true;
}

function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    const res = hasPermission(roles, route);
    if (res === true) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      } else if (route.meta && route.meta.component) {
        // 保留的页面，将页面注册成全局组件
        Vue.component(route.name, route.meta.component);
      }
      return true;
    } else if (res !== false) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
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
    keepAliveTabs: [],
    keepPages: [] // 保留的页面
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },
    SET_THEME: (state, data) => {
      state.theme = data;
    },
    SET_ADDROUTERS: (state, addRouters) => {
      state.addRouters = addRouters;
    },
    SET_ROUTERS: (state, routers) => {
      state.routers = routers;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_KEEPALIVETABS: (state, tabs) => {
      state.keepAliveTabs = tabs;
    },
    ADD_KEEPALIVETABS: (state, tab) => {
      state.keepAliveTabs = [...state.keepAliveTabs, tab];
    },
    SET_KEEPPAGES: (state, pages) => {
      state.keepPages = pages;
    },
    ADD_KEEPPAGES: (state, page) => {
      const find = state.keepPages.find(p => p.fullPath === page.fullPath);
      if (!(find && find.fullPath)) {
        state.keepPages = [...state.keepPages, page];
      }
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRoutes, data);
        commit("SET_ADDROUTERS", accessedRouters);
        resolve();
      });
    },
    setAddRouters({ commit }, data) {
      commit("SET_ADDROUTERS", data);
    },
    setMenus({ commit }, data) {
      commit("SET_MENUS", data);
    },
    setRoutes({ commit }, data) {
      commit("SET_ROUTERS", data);
    },

    setTheme({ commit }, data) {
      commit("SET_THEME", data);
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    setKeepAliveTabs({ commit }, tabs) {
      commit("SET_KEEPALIVETABS", tabs);
    },
    addKeepAliveTab({ commit }, route) {
      if (route.name && route.meta && route.meta.keepAlive !== false) {
        const name =
          route.meta && route.meta.keepAliveName
            ? route.meta.keepAliveName
            : route.name;
        commit("ADD_KEEPALIVETABS", name);
      }
    },
    setKeepPages({ commit }, pages) {
      commit("SET_KEEPPAGES", pages);
    },
    addKeepPages({ commit }, page) {
      commit("ADD_KEEPPAGES", page);
    }
  }
};

export default app;
