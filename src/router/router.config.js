import config from "./modules/config";

const Maps = [
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/home/Index.vue"),
    // hidden: true,
    meta: {
      title: "首页",
      icon: "pie-chart"
    }
  }
];
const modulesMap = Maps.concat(config);
// const modulesMap = Maps;

export const asyncRoutes = [
  {
    path: "/",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/layout/BasicLayout.vue"),
    meta: {
      title: "首页"
    },
    redirect: "/home",
    children: modulesMap
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/user/Login"),
    meta: {
      title: "登录",
      tabsPage: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/exception/404.vue")
  }
];
